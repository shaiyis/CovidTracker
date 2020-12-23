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

        public List<KeyValuePair<int, int>> InfectedGraphPerState(string state_str_id)
        {
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = $"";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                List<KeyValuePair<int, int>> ret = new List<KeyValuePair<int, int>>();

                while (rdr.Read())
                {
                    string date = rdr["date"].ToString();
                    int cases = Int32.Parse(rdr["cases"].ToString());
                    List<int> date_list = convertDate(date);
                    TimeSpan epochTicks = new TimeSpan(new DateTime(1970, 1, 1).Ticks);
                    TimeSpan unixTicks = new TimeSpan(new DateTime(date_list[0], date_list[1], date_list[2]).Ticks) - epochTicks;
                    Int32 unixTimestamp = (Int32)unixTicks.TotalSeconds;
                    // add to res the unix time and cases
                    ret.Add(new KeyValuePair<int, int>(unixTimestamp, cases));
                }
                rdr.Close();
                return ret;
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

        private static List<int> convertDate(string date)
        {
            List<int> ret = new List<int>();
            string[] list = date.Split("-");
            for (int i = 0; i < 3; i++)
            {
                int val = Int32.Parse(list[i]);
                ret.Add(val);
            }
            return ret;
        }


        public List<KeyValuePair<string, string>> TopMonthGrowthForCounty(string state_str_id)
        {
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = $"";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                List<KeyValuePair<string, string>> ret = new List<KeyValuePair<string, string>>();

                while (rdr.Read())
                {
                    string county = rdr["county"].ToString();
                    string month = rdr["month"].ToString();
                    ret.Add(new KeyValuePair<string, string>(county, month));
                }
                rdr.Close();
                return ret;
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

        public List<KeyValuePair<string, int>> TopMonthsGrowthForState(string state_str_id)
        {
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = $"";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                List<KeyValuePair<string, int>> ret = new List<KeyValuePair<string, int>>();

                while (rdr.Read())
                {
                    string month = rdr["month"].ToString();
                    int percent = Int32.Parse(rdr["percent"].ToString());
                    ret.Add(new KeyValuePair<string, int>(month, percent));
                }
                rdr.Close();
                return ret;
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

        public List<KeyValuePair<string, int>> UpdatedPercentPerState()
        {
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = $"";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                List<KeyValuePair<string, int>> ret = new List<KeyValuePair<string, int>>();

                while (rdr.Read())
                {
                    string state = rdr["state"].ToString();
                    int percent = Int32.Parse(rdr["percent"].ToString());
                    ret.Add(new KeyValuePair<string, int>(state, percent));
                }
                rdr.Close();
                return ret;
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
    }
}
