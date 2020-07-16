using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using covid.DataAccess;
using covid.Models;

namespace covid.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {

        UserRepository _userRepo;
        UserTypeRespository _userTypeRepo;
        public UserController(UserRepository userRepo, UserTypeRespository userTypeRepo)
        {
            _userRepo = userRepo;
            _userTypeRepo = userTypeRepo;
        }
        
        [HttpPost("/adduser")]
        public IActionResult AddUser(AddUser newUser)
        {
            var createdUser = _userRepo.AddUser(newUser);
            return Ok(createdUser);
        }
    }
}