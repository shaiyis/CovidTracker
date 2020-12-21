using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CovidTracker.Model
{
    public class Manager : IManager
    {
        // TODO cange
        private readonly string connStr = "server=localhost;user=root;database=covid_us;port=3306;password=mypassword";
        public string GetAvgOfAfectedAllUSA()
        {
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = $"";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                string avg = "";

                while (rdr.Read())
                {
                    avg = rdr["percent"].ToString();
                }
                rdr.Close();
                return avg;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                if (conn != null)
                    conn.Close();
            }
        }

        public KeyValuePair<DateTime, long> InfectedGraphPerState(string state_str_id)
        {
            throw new NotImplementedException();
        }

        public KeyValuePair<string, string> TopMonthGrowthForCounty(string state_str_id)
        {
            throw new NotImplementedException();
        }

        public KeyValuePair<string, float> TopMonthsGrowthForState(string state_str_id)
        {
            throw new NotImplementedException();
        }

        public KeyValuePair<string, float> UpdatedPercentPerState()
        {
            throw new NotImplementedException();
        }
    }
}
