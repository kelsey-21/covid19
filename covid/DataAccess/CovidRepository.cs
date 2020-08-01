using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using covid.Models;

namespace covid.DataAccess
{
    public class CovidRepository
    {

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
            var sql = @"insert into Pickle(NumberInStock,Price,Size,Type)
                        output inserted.*
                        values(@NumberInStock,@Price,@Size,@Type)";

            using (var db = new SqlConnection(ConnectionString))
            {
                var result = db.QueryFirstOrDefault<ScheduleLocationStatus>(sql, newMapItem);
                return result;
            }
        }
    }
}
