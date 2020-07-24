using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using covid.Models;

namespace covid.DataAccess
{
    public class LocationPolicyRepository
    {
        string ConnectionString;
        public LocationPolicyRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("CovidTracking");
        }
        public List<LocationPolicyFormatted> GetLocationPoliciesByState(string locationCode)
        {
            var sql = @"select lp.DateIssued as Date, p.PolicyCode
                        from LocationPolicy as lp
                        join location as l on lp.LocationId = l.LocationId
                        join policy as p on lp.PolicyId = p.PolicyId
                        where l.LocationCode = @LocationCode";

            var parameters = new { LocationCode = locationCode };

            using (var db = new SqlConnection(ConnectionString))
            {
                var policies = db.Query<LocationPolicyFormatted>(sql, parameters).ToList();
                return policies;
            }
        }
    }
}
