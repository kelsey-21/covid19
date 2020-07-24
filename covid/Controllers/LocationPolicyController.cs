using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using covid.DataAccess;

namespace covid.Controllers
{
    [Route("api/locationpolicy")]
    [ApiController]
    public class LocationPolicyController : ControllerBase
    {

        LocationPolicyRepository _locationPolicyRepo;
        LocationRepository _locationRepo;
        public LocationPolicyController(LocationPolicyRepository locationPolicyRepo, LocationRepository locationRepo)
        {
            _locationPolicyRepo = locationPolicyRepo;
            _locationRepo = locationRepo;
        }

        [HttpGet("list")]
        public IActionResult GetLocationPoliciesByState(string locationCode)
        {
            var policies = _locationPolicyRepo.GetLocationPoliciesByState(locationCode);
            return Ok(policies);
        }
    }
}