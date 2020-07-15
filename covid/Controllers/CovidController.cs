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

        [HttpGet]
        public IActionResult CurrentValuesAllStates()
        {
            var restRequest = new RestRequest("v1/states/current.json", Method.GET);
            var response = _restClient.Execute<List<StateData>>(restRequest);

            if (response.IsSuccessful)
                return Ok(response.Data);
            else return NotFound(response.ErrorMessage);
        }

        [HttpGet]
        public IActionResult HistoricaValuesByState(string StateCode)
        {
            var restRequest = new RestRequest("v1/states/{StateCode}/daily.json", Method.GET);
            var response = _restClient.Execute<List<StateData>>(restRequest);

            if (response.IsSuccessful)
                return Ok(response.Data);
            else return NotFound(response.ErrorMessage);
        }
    }
}