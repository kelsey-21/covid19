using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace covid.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int UserTypeId { get; set; }
    }
}
