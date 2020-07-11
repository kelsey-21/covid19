using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace covid.Models
{
    public class LocationPolicy
    {
        public int LocationPolicyId { get; set; }
        public int PolicyId { get; set; }
        public int LocationId { get; set; }
        public DateTime DateIssued { get; set; }
        public bool StateWide { get; set; }
        public DateTime DateExpires { get; set; }
        public DateTime DateEased { get; set; } 
        public string LocPolicyNotes { get; set; }
    }
}
