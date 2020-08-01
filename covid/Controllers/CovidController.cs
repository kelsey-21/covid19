using System;
using System.IO;
using System.Globalization;
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
        LocationPolicyRepository _locationPolicyRepository;
        LocationRepository _locationRepo;
        CovidRepository _covidRepository;

        public CovidController(LocationPolicyRepository locationPolicyRepo, LocationRepository locationRepo, CovidRepository covidRepo)
        {
            _restClient = new RestClient("https://covidtracking.com/api/");
            _locationPolicyRepository = locationPolicyRepo;
            _locationRepo = locationRepo;
            _covidRepository = covidRepo;
        }

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

            var covidData = new List<StateDataPositive>();
            var historicalData = new List<DataModel>();

            foreach (var covid in covidResponse.Data)
            {
                var Year = covid.Date.Substring(0, 4);
                var Month = covid.Date.Substring(4, 2);
                var Day = covid.Date.Substring(6, 2);
                var myDate = String.Format("{0}-{1}-{2}", Year, Month, Day);
                covidData.Add(new StateDataPositive() { Date = myDate, PositiveIncrease = covid.PositiveIncrease });
            }


            foreach (var covid in covidData)
            {
                var policyCode = locationPolicy.FirstOrDefault(item => item.Date == covid.Date);
                var finalData = new DataModel
                {
                    Date = covid.Date,
                    PositiveIncrease = covid.PositiveIncrease,
                };
                if (policyCode != null)
                {
                    finalData.Policy = policyCode.PolicyCode;
                } else
                {
                    finalData.Policy = null;
                }
                historicalData.Add(finalData);
            }

            return Ok(historicalData);
        }
  
        public LocationStatus StatusByState(string StateCode, string StateName)
        {
            var sc = StateCode.ToLower();
            var restRequest = new RestRequest($"v1/states/{sc}/daily.json", Method.GET);
            var response = _restClient.Execute<List<StateData>>(restRequest);
            
            var last14Records = response.Data.Take(14).ToList();

            var oldestRecord = last14Records[13];
            var newestRecord = last14Records[0];
            var percentChange = ((newestRecord.Positive - oldestRecord.Positive) * 100) / oldestRecord.Positive;
            string status;
            string fill;

            if (percentChange >= 25)
            {
                status = "greatly increasing";
                fill = "#8a2c2d";
            }
                else if (percentChange < 25 && percentChange >= 5)
            {
                status = "increasing";
                fill = "#BF671E"; 
            }
                else if (percentChange < 5 && percentChange >= 0)
            {
                status = "flat";
                fill = "#D5A021";

            }
                else
            {
                status = "decreasing";
                fill = "#004f2d";
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


        [HttpGet("schedule")]
        public IActionResult ScheduleMapData()
        {
            var locations = _locationRepo.GetListOfLocations();

            var allMapData = new List<ScheduleLocationStatus>();

            foreach (var location in locations)
            {
                var mapData = ScheduleStatusByState(location.LocationCode, location.LocationName);
                allMapData.Add(mapData);
            }

            foreach (var mapItem in allMapData)
            {
                var newMapItem = _covidRepository.ScheduleItem(mapItem);
                return Created("", newMapItem);
            }

            if (allMapData.Count > 0)
                return Ok(allMapData);
            else return NotFound("Issue with map data");
        }

        public ScheduleLocationStatus ScheduleStatusByState(string StateCode, string StateName)
        {
            var sc = StateCode.ToLower();
            var restRequest = new RestRequest($"v1/states/{sc}/daily.json", Method.GET);
            var response = _restClient.Execute<List<StateData>>(restRequest);

            var locationColor = _covidRepository.ScheduleStatusByState(StateCode, StateName, response.Data);
            return locationColor;
        }
}