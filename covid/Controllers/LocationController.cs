using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using covid.DataAccess;

namespace covid.Controllers
{
    [Route("api/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {

        LocationRepository _locationRepo;
        public LocationController(LocationRepository locationRepo)
        {
            _locationRepo = locationRepo;
        }

    }
}