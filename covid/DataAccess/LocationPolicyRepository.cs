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
            var sql = @"with policyinformation as (select CONVERT(varchar, lp.DateIssued, 23) as Date, 'PolicyIssued' as PolicyCode
                        from LocationPolicy as lp
                        join location as l on lp.LocationId = l.LocationId
                        join policy as p on lp.PolicyId = p.PolicyId
                        where l.LocationCode = @LocationCode and lp.DateIssued is not null
						union
						select CONVERT(varchar, lp.DateEased, 23) as Date, 'PolicyEased ' as PolicyCode
                        from LocationPolicy as lp
                        join location as l on lp.LocationId = l.LocationId
                        join policy as p on lp.PolicyId = p.PolicyId
                        where l.LocationCode = @LocationCode and lp.DateEased is not null
						union
						select CONVERT(varchar, lp.DateExpires, 23) as Date, 'PolicyExpired ' as PolicyCode
                        from LocationPolicy as lp
                        join location as l on lp.LocationId = l.LocationId
                        join policy as p on lp.PolicyId = p.PolicyId
                        where l.LocationCode = @LocationCode and lp.DateExpires is not null
						)
						select Date, PolicyCode --substring(string_agg(PolicyCode, ' '), 1, 20) as PolicyCode 
						from policyinformation
						group by Date, PolicyCode";

            var parameters = new { LocationCode = locationCode };

            using (var db = new SqlConnection(ConnectionString))
            {
                var policies = db.Query<LocationPolicyFormatted>(sql, parameters).ToList();
                return policies;
            }
        }

        public List<LocationPolicyDetail> GetLocationPoliciesDetailByState(string locationCode)
        {
            var sql = @"select 
LocationPolicyId, 'PolicyIssued' PolicyStatus, CONVERT(varchar, lp.DateIssued, 23) Date, p.PolicyName, lp.LocPolicyNotes PolicyNotes
                        from LocationPolicy as lp
                        join location as l on lp.LocationId = l.LocationId
                        join policy as p on lp.PolicyId = p.PolicyId
                        where l.LocationCode = @LocationCode and lp.DateIssued is not null
						union
						select  
						LocationPolicyId, 'PolicyEased' PolicyStatus, CONVERT(varchar, lp.DateEased, 23) Date, p.PolicyName, lp.LocPolicyNotes PolicyNotes
                        from LocationPolicy as lp
                        join location as l on lp.LocationId = l.LocationId
                        join policy as p on lp.PolicyId = p.PolicyId
                        where l.LocationCode = @LocationCode and lp.DateEased is not null
						union
						select  
						LocationPolicyId, 'PolicyExpired' PolicyStatus, CONVERT(varchar, lp.DateExpires, 23) Date, p.PolicyName, lp.LocPolicyNotes PolicyNotes
                        from LocationPolicy as lp
                        join location as l on lp.LocationId = l.LocationId
                        join policy as p on lp.PolicyId = p.PolicyId
                        where l.LocationCode = @LocationCode and lp.DateExpires is not null
						order by date";

            var parameters = new { LocationCode = locationCode };

            using (var db = new SqlConnection(ConnectionString))
            {
                var policies = db.Query<LocationPolicyDetail>(sql, parameters).ToList();
                return policies;
            }
        }
    }
}
