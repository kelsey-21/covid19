using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using covid.DataAccess;

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

    }
}