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

        public CovidController(LocationRepository locationRepo)
        {
            _restClient = new RestClient("https://covidtracking.com/api/");
            _locationRepo = locationRepo;
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

        [HttpGet("historical/{StateCode}")]
        public IActionResult HistoricaValuesByState(string StateCode)
        {
            var sc = StateCode.ToLower();
            var restRequest = new RestRequest($"v1/states/{sc}/daily.json", Method.GET);
            var response = _restClient.Execute<List<StateData>>(restRequest);

            if (response.IsSuccessful)
                return Ok(response.Data);
            else return NotFound(response.ErrorMessage);
        }

        //[HttpGet("status/{StateCode}")]
        public LocationStatus StatusByState(string StateCode)
        {
            var sc = StateCode.ToLower();
            var restRequest = new RestRequest($"v1/states/{sc}/daily.json", Method.GET);
            var response = _restClient.Execute<List<StateData>>(restRequest);

            //var percentChangeStates = new List<LocationStatus>();
            
            var last14Records = response.Data.Take(14).ToList();

            //foreach (var stateData in last14Records)
            var latestRecord = last14Records[13];
            var firstRecord = last14Records[0];
            var percentChange = ((firstRecord.Positive - latestRecord.Positive) * 100) / firstRecord.Positive;
            string status;

            if (percentChange >= 25)
                    status = "greatly increasing";
                else if (percentChange < 25 && percentChange >= 5)
                    status = "increasing";
                else if (percentChange < 5 && percentChange >= 0)
                    status = "flat";
                else
                    status = "decreasing";

                var locationColor = new LocationStatus
                {
                    Id = StateCode,
                    Name = latestRecord.State,
                    Value = new Value {
                        Status = status,
                        PercentChange = percentChange,
                    }
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
                var mapData = StatusByState(location.LocationCode);
                allMapData.Add(mapData);
            }

            if (allMapData.Count > 0)
                return Ok(allMapData);
            else return NotFound("Issue with map data");
        }
    }
}