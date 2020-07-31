using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using covid.Models;

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

    public class LocationPolicyFormatted
    {
        public string Date { get; set; }
        public string PolicyCode { get; set; }
    }

    public class LocationPolicyDetail
    {
        public int LocationPolicyId { get; set; }
        public string Date { get; set; }
        public string PolicyStatus { get; set; }
        public string PolicyName { get; set; }
        public string PolicyNotes { get; set; }
    }

    public class DataModel
    {
        public string Date { get; set; }
        public int PositiveIncrease { get; set; }
        public string? Policy { get; set; }
    }
}
