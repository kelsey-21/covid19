using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace covid.Models
{
    public class LocationColor
    {
        public int LocationColorId { get; set; }
        public int LocationId { get; set; }
        public int ColorId { get; set; }
        public DateTime Date { get; set; }
        public varchar Status { get; set; }
    }
}
