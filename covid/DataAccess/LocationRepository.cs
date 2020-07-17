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
    public class LocationRepository
    {
        string ConnectionString;
        public LocationRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("CovidTracking");
        }

        public List<LocationName> GetListOfLocations()
        {
            var sql = "select LocationCode from Location";
            using (var db = new SqlConnection(ConnectionString))
            {
                var locations = db.Query<LocationName>(sql).ToList();
                return locations;
            }
        }
    }
}
