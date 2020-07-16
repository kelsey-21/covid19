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
    public class UserRepository
    {
        string ConnectionString;

        public UserRepository(IConfiguration config)
        {
            ConnectionString = config.GetConnectionString("CovidTracking");
        }

        public User AddUser(AddUser newUser)
        {
            var sql = @"INSERT INTO [User](FirstName, LastName, Email, UserTypeId)
                       output inserted.*
                        VALUES (@FirstName, @LastName, @Email, (select UserTypeId from UserType where UserTypeName=@UserTypeName));";

            var parameters = new
            {
                FirstName = newUser.FirstName,
                LastName = newUser.LastName,
                Email = newUser.Email,
                UserTypeName = newUser.UserTypeName
            };

            using (var db = new SqlConnection(ConnectionString))
            {
                var createdUser = db.QueryFirstOrDefault<User>(sql, parameters);
                return createdUser;
            }
        }
    }
}
