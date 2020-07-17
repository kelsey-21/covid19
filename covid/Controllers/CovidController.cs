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

        public CovidController()
        {
            _restClient = new RestClient("https://covidtracking.com/api/");
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
            var restRequest = new RestRequest("v1/states/{StateCode}/daily.json", Method.GET);
            var response = _restClient.Execute<List<StateData>>(restRequest);

            if (response.IsSuccessful)
                return Ok(response.Data);
            else return NotFound(response.ErrorMessage);
        }

        [HttpGet("status/{StateCode}")]
        public IActionResult StatusByState(string StateCode)
        {
            var sc = StateCode.ToLower();
            var restRequest = new RestRequest($"v1/states/{sc}/daily.json", Method.GET);
            var response = _restClient.Execute<List<StateData>>(restRequest);

            //var percentChangeStates = new List<LocationStatus>();
            
            var last14Records = response.Data.Take(14).ToList();

            //foreach (var stateData in last14Records)
                var latestRecord = last14Records[13];
                var firstRecord = last14Records[0];
                var percentChange = ((latestRecord.Positive - firstRecord.Positive) * 100) / firstRecord.Positive;
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
                    Location = latestRecord.State,
                    Status = status,
                    PercentChange = percentChange,
                };

            if (response.IsSuccessful)
                return Ok(locationColor);
            else return NotFound(response.ErrorMessage);

        }
    }
}