using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace covid.Models
{
    public class StateData
    {
        public int Date { get; set; }
        public string State { get; set; }
        public int Positive { get; set; }
        public int Negative { get; set; }
        public int? Pending { get; set; }
        public int? HospitalizedCurrently { get; set; }
        public int? HospitalizedCumulative { get; set; }
        public int? InIcuCurrently { get; set; }
        public int? InIcuCumulative { get; set; }
        public int? OnVentilatorCurrently { get; set; }
        public int? OnVentilatorCumulative { get; set; }
        public int? Recovered { get; set; }
        public string DataQualityGrade { get; set; }
        public string LastUpdateEt { get; set; }
        public DateTime DateModified { get; set; }
        public string CheckTimeEt { get; set; }
        public int Death { get; set; }
        public int? Hospitalized { get; set; }
        public DateTime DateChecked { get; set; }
        public int? TotalTestsViral { get; set; }
        public int? PositiveTestsViral { get; set; }
        public int? NegativeTestsViral { get; set; }
        public int? PositiveCasesViral { get; set; }
        public int? DeathConfirmed { get; set; }
        public int? DeathProbable { get; set; }
        public string Fips { get; set; }
        public int PositiveIncrease { get; set; }
        public int NegativeIncrease { get; set; }
        public int Total { get; set; }
        public int TotalTestResults { get; set; }
        public int TotalTestResultsIncrease { get; set; }
        public int PosNeg { get; set; }
        public int DeathIncrease { get; set; }
        public int HospitalizedIncrease { get; set; }
        public string Hash { get; set; }
        public int CommercialScore { get; set; }
        public int NegativeRegularScore { get; set; }
        public int NegativeScore { get; set; }
        public int PositiveScore { get; set; }
        public int Score { get; set; }
        public string Grade { get; set; }
    }

    public class StateDataPositive
    {
        public string Date { get; set; }
        public int PositiveIncrease { get; set; }
    }
}
