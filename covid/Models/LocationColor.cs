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
        public string Status { get; set; }
    }

    public class LocationStatus
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public Value Value { get; set; }
    }

    public class Value
    {
        public string Status { get; set; }
        public decimal PercentChange { get; set; }
    }
}
