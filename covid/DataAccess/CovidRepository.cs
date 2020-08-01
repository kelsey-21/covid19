using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using covid.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace covid.DataAccess
{
    public class CovidRepository
    {
        string ConnectionString;
        public CovidRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("CovidTracking");
        }

        public ScheduleLocationStatus ScheduleStatusByState(string StateCode, string StateName, List<StateData> response)
        {

            var last14Records = response.Take(14).ToList();

            var oldestRecord = last14Records[13];
            var newestRecord = last14Records[0];
            var percentChange = ((newestRecord.Positive - oldestRecord.Positive) * 100) / oldestRecord.Positive;
            string status;
            string fill;

            if (percentChange >= 25)
            {
                status = "greatly increasing";
                fill = "#8a2c2d";
            }
            else if (percentChange < 25 && percentChange >= 5)
            {
                status = "increasing";
                fill = "#BF671E";
            }
            else if (percentChange < 5 && percentChange >= 0)
            {
                status = "flat";
                fill = "#D5A021";

            }
            else
            {
                status = "decreasing";
                fill = "#004f2d";
            }

            var locationColor = new ScheduleLocationStatus
            {
                LocationId = StateCode,
                LocationName = StateName,
                Status = status,
                PercentChange = percentChange,
                Color = fill,
            };

            return locationColor;
        }

        public ScheduleLocationStatus ScheduleAdd(ScheduleLocationStatus newMapItem)
        {
            var sql = @"insert into LocationColor
                        output inserted.*
                        values(@LocationId, @LocationName, @Color, @Status, @PercentChange, getdate())";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<ScheduleLocationStatus>(sql, newMapItem);
                return result;
            }
        }

        public List<LocationStatus> GetMapData()
        {
            var sql = @"select top(52)* from LocationColor
                        order by Date desc, LocationName";

            using (var db = new SqlConnection(ConnectionString))
            {
                var initialData = db.Query<ScheduleLocationStatus>(sql).ToList();
                var mapData = new List<LocationStatus>();
                
                foreach (var state in initialData)
                {
                    var locationStatus = new LocationStatus
                    {
                        Id = "US-" + state.LocationId,
                        Name = state.LocationName,
                        Value = new Value
                        {
                            Status = state.Status,
                            PercentChange = state.PercentChange,
                        },
                        Fill = state.Color,
                    };
                    mapData.Add(locationStatus);
                }
                return mapData;
            }
        }
    }
}
