using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using covid.DataAccess;
using covid.Models;

namespace covid.Controllers
{
    [Route("api/policy")]
    [ApiController]
    public class PolicyController : ControllerBase
    {

        PolicyRepository _policyRepo;
        public PolicyController(PolicyRepository policyRepo)
        {
            _policyRepo = policyRepo;
        }


        [HttpPost]
        [Authorize]
        public IActionResult AddLocationPolicy(LocationPolicy policy)
        {
            return Ok("");
        }
    }
}