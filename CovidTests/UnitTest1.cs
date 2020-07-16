using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using covid.DataAccess;
using RestSharp;

namespace CovidTests
{
    public class UnitTest1
    {
        private string getUrl = "covidtracking.com/data/api/v1/states/info.json";

        [Fact]
        public void GetAllCovidData()
        {
            IRestClient restClient = new RestClient();
            IRestRequest restRequest = new RestRequest(getUrl);
            IRestResponse restResponse = restClient.Get(restRequest);
            Assert.Equal(HttpStatusCode.OK, restResponse.StatusCode);
        }
    }
}
