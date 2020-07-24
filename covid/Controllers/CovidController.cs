using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using covid.DataAccess;
using covid.Models;

namespace covid.Controllers
{

    [Route("api/covid")]
    [ApiController]
    public class CovidController : ControllerBase
    {
        RestClient _restClient;
        LocationRepository _locationRepo;
        LocationPolicyRepository _locationPolicyRepository;

        public CovidController(LocationRepository locationRepo, LocationPolicyRepository locationPolicyRepo)
        {
            _restClient = new RestClient("https://covidtracking.com/api/");
            _locationRepo = locationRepo;
            _locationPolicyRepository = locationPolicyRepo;
        }


        //[HttpGet]
        //public IActionResult TestRestSharp()
        //{            
        //    var restRequest = new RestRequest("v1/states/info.json", Method.GET);
        //    var response = _restClient.Execute<List<TestData>>(restRequest);

        //    if (response.IsSuccessful)
        //        return Ok(response.Data);
        //    else return NotFound(response.ErrorMessage);
        //}

        [HttpGet("/all")]
        public IActionResult CurrentValuesAllStates()
        {
            var restRequest = new RestRequest("v1/states/current.json", Method.GET);
            var response = _restClient.Execute<List<StateData>>(restRequest);

            if (response.IsSuccessful)
                return Ok(response.Data);
            else return NotFound(response.ErrorMessage);
        }

        [HttpGet("historicalpositive/{StateCode}")]
        public IActionResult HistoricalPositiveValuesByState(string StateCode)
        {
            var sc = StateCode.ToLower();
            var restRequest = new RestRequest($"v1/states/{sc}/daily.json", Method.GET);
            var covidResponse = _restClient.Execute<List<StateDataPositive>>(restRequest);
            var locationPolicy = _locationPolicyRepository.GetLocationPoliciesByState(StateCode);
            
            //covidResponse.Data.ForEach(x)
            //    return new RestructuredCovidResponse
            //    {
            //        state = x.state,
            //        "x.date" = x.positive                }


            //public Test 


            var historicaldata = new HistoricalData
            {
                Covid = covidResponse.Data,
                Policy = locationPolicy,
            };

            return Ok(historicaldata);

            //if (response.IsSuccessful)
            //    return Ok(response.Data);
            //else return NotFound(response.ErrorMessage);
        }

        //[HttpGet("status/{StateCode}")]
        public LocationStatus StatusByState(string StateCode, string StateName)
        {
            var sc = StateCode.ToLower();
            var restRequest = new RestRequest($"v1/states/{sc}/daily.json", Method.GET);
            var response = _restClient.Execute<List<StateData>>(restRequest);

            //var percentChangeStates = new List<LocationStatus>();
            
            var last14Records = response.Data.Take(14).ToList();

            //foreach (var stateData in last14Records)
            var oldestRecord = last14Records[13];
            var newestRecord = last14Records[0];
            var percentChange = ((newestRecord.Positive - oldestRecord.Positive) * 100) / oldestRecord.Positive;
            string status;
            string fill;

            if (percentChange >= 25)
            {
                status = "greatly increasing";
                fill = "#8B0000";
            }
                else if (percentChange < 25 && percentChange >= 5)
            {
                status = "increasing";
                fill = "#DC143C";
            }
                else if (percentChange < 5 && percentChange >= 0)
            {
                status = "flat";
                fill = "#FFD700";

            }
                else
            {
                status = "decreasing";
                fill = "#008000";
            }

            var locationColor = new LocationStatus
            {
                Id = "US-" + StateCode,
                Name = StateName,
                Value = new Value {
                    Status = status,
                    PercentChange = percentChange,
                },
                Fill = fill,
                };

            return locationColor;

            //if (response.IsSuccessful)
            //    return Ok(locationColor);
            //else return NotFound(response.ErrorMessage);
        }

        [HttpGet("map")]
        public IActionResult GetAllMapData()
        {
            var locations = _locationRepo.GetListOfLocations();

            var allMapData = new List<LocationStatus>();

            foreach (var location in locations)
            {
                var mapData = StatusByState(location.LocationCode, location.LocationName);
                allMapData.Add(mapData);
            }

            if (allMapData.Count > 0)
                return Ok(allMapData);
            else return NotFound("Issue with map data");
        }
    }
}