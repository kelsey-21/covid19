using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace covid.Models
{
    public class Location
    {
        public int LocationId { get; set; }

        public string LocationCode { get; set; }
        public string LocationName { get; set; }
    }

    public class LocationNameandCode
    {
        public string LocationCode { get; set; }
        public string LocationName { get; set; }
    }

}
