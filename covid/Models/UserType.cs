using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace covid.Models
{
    public class UserType
    {
        public int UserTypeId { get; set; }
        public string UserTypeName { get; set; }
        public bool IsAdmin { get; set; }
    }
}
