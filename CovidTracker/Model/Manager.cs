using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CovidTracker.Model
{
    public class Manager : IManager
    {
        // TODO  change when submitting
        private readonly string connStr = "server=localhost;user=root;database=covid_us;port=3306;password=Mcgilad1l@";

        private static string getStateIdQuery(string state_str_id)
        {
            return "Select state_id from states_ids_and_population where state_str_id = '" + state_str_id + "'";
        }

        //1
        public List<Dictionary<string, string>> TopMonthsGrowthForState(string state_str_id)
        {
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = $"SELECT MONTHNAME(t2.the_date) as max_diff_month, inner_table.growth FROM covid_us.us_states AS t1 " +
                    $"JOIN covid_us.us_states AS t2 USING(state_id) JOIN (SELECT t1.*, round(t1.cases/t2.cases * 100 - 100, 2) AS growth" +
                    $" FROM covid_us.us_states AS t1 JOIN covid_us.us_states AS t2 USING(state_id) WHERE " +
                    $"t1.state_id = (" + getStateIdQuery(state_str_id) + " group by state_id) " +
                    $"AND t1.the_date = LAST_DAY(t1.the_date) AND t2.the_date = LAST_DAY(t2.the_date) AND MONTH(t2.the_date) = MONTH(t1.the_date) - 1) " +
                    $"as inner_table USING(state_id) where t1.the_date = LAST_DAY(t1.the_date) AND t2.the_date = LAST_DAY(t2.the_date) " +
                    $"AND MONTH(t2.the_date) = MONTH(t1.the_date) - 1 AND round(t1.cases/t2.cases * 100 - 100, 2) = inner_table.growth order by inner_table.growth desc limit 3; ";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                List<Dictionary<string, string>> ret = new List<Dictionary<string, string>>();

                while (rdr.Read())
                {
                    string max_diff_month = rdr["max_diff_month"].ToString();
                    string growth = rdr["growth"].ToString();
                    ret.Add(new Dictionary<string, string>()
                    {
                        { "max_diff_month", max_diff_month },
                        { "growth" , growth }
                    });
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

        // 2
        public List<Dictionary<string, string>> TopMonthGrowthForCounty(string state_str_id)
        {
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = $"SELECT t1.county, MONTHNAME(t2.the_date) as max_diff_month " +
                    $"FROM covid_us.us_counties AS t1 JOIN covid_us.us_counties AS t2 USING (county_id) JOIN " +
                    $"(SELECT t1.*,MAX(t2.cases-t1.cases) AS max_diff_cases " +
                    $"FROM covid_us.us_counties AS t1 JOIN covid_us.us_counties AS t2 USING(county_id) " +
                    $"WHERE t1.state_id= (" + getStateIdQuery(state_str_id) + " group by state_id) " +
                    $"AND t1.the_date = LAST_DAY(t1.the_date) AND t2.the_date = LAST_DAY(t2.the_date) " +
                    $"AND MONTH(t2.the_date) = MONTH(t1.the_date) + 1 group by t1.county) as inner_table USING(county_id) " +
                    $"where t1.state_id= (" + getStateIdQuery(state_str_id) + " group by state_id)" +
                    $"AND t1.the_date = LAST_DAY(t1.the_date) AND t2.the_date = LAST_DAY(t2.the_date) " +
                    $"AND MONTH(t2.the_date) = MONTH(t1.the_date) + 1 " +
                    $"AND inner_table.max_diff_cases = t2.cases - t1.cases order by t1.county; ";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                List<Dictionary<string, string>> ret = new List<Dictionary<string, string>>();

                while (rdr.Read())
                {
                    string county = rdr["county"].ToString();
                    string max_diff_month = rdr["max_diff_month"].ToString();
                    ret.Add(new Dictionary<string, string>()
                    {
                        { "county", county },
                        { "max_diff_month" , max_diff_month }
                    });
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



        // 3 
        public List<Dictionary<string, string>> InfectedGraphPerState(string state_str_id)
        {
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = $"SELECT Month(the_date) as the_month, cases FROM covid_us.us_states " +
                    $"WHERE the_date = LAST_DAY(the_date) " +
                    $"AND state_id= (" + getStateIdQuery(state_str_id) + " group by state_id) ORDER BY the_month;";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                List<Dictionary<string, string>> ret = new List<Dictionary<string, string>>();

                while (rdr.Read())
                {
                    string month_as_number = rdr["the_month"].ToString();
                    string cases = rdr["cases"].ToString();
                    ret.Add(new Dictionary<string, string>()
                    {
                        { "month_as_number", month_as_number },
                        { "cases" , cases }
                    });
                    // todo delete
                    /*List<int> date_list = convertDate(date);
                    TimeSpan epochTicks = new TimeSpan(new DateTime(1970, 1, 1).Ticks);
                    TimeSpan unixTicks = new TimeSpan(new DateTime(date_list[0], date_list[1], date_list[2]).Ticks) - epochTicks;
                    Int32 unixTimestamp = (Int32)unixTicks.TotalSeconds;
                    // add to res the unix time and cases
                    ret.Add(new KeyValuePair<int, int>(unixTimestamp, cases));*/
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

        // 4 
        public List<Dictionary<string, string>> GetAvgOfAfectedAllUSA()
        {
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = "SELECT ROUND(AVG(distribution_data.percent), 2) as average " +
                    "FROM (" +
                    "SELECT percents_states.percent, percents_states.state_str_id, " +
                    "NTILE(10) OVER (ORDER BY percents_states.percent) as the_partition " +
                    "FROM (SELECT t2.state_str_id, ROUND(t1.cases/t2.population * 100, 2) as percent FROM  " +
                    "covid_us.us_states as t1 join covid_us.states_ids_and_population as t2 USING(state_id) " +
                    "WHERE t1.the_date = (SELECT max(the_date) FROM covid_us.us_states WHERE state_id = t1.state_id) " +
                    "AND t2.state_str_id = (SELECT state_str_id FROM covid_us.states_ids_and_population WHERE state_id = t1.state_id) " +
                    "order by t1.state_id) as percents_states) as distribution_data " +
                    "WHERE the_partition IN (2,3,4,5,6,7,8,9);";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                List<Dictionary<string, string>> ret = new List<Dictionary<string, string>>();

                while (rdr.Read())
                {
                    string average = rdr["average"].ToString();
                    ret.Add(new Dictionary<string, string>()
                    {
                        { "average", average }
                    });
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

        /*private static List<int> convertDate(string date)
        {
            List<int> ret = new List<int>();
            string[] list = date.Split("-");
            for (int i = 0; i < 3; i++)
            {
                int val = Int32.Parse(list[i]);
                ret.Add(val);
            }
            return ret;
        }*/


        // 5
        public List<Dictionary<string, string>> UpdatedPercentPerState()
        {
            MySqlConnection conn = new MySqlConnection(connStr);
            try
            {
                conn.Open();
                string sql = $"SELECT t2.state_str_id, round(t1.cases/t2.population * 100, 2) as percent FROM " +
                    $"covid_us.us_states as t1 join covid_us.states_ids_and_population as t2 USING(state_id) " +
                    $"WHERE t1.the_date = (select max(the_date) from covid_us.us_states where state_id = t1.state_id) " +
                    $"and t2.state_str_id = (select state_str_id from covid_us.states_ids_and_population where state_id = t1.state_id) " +
                    $"order by t1.state_id; ";
                MySqlCommand cmd = new MySqlCommand(sql, conn);
                MySqlDataReader rdr = cmd.ExecuteReader();
                List<Dictionary<string, string>> ret = new List<Dictionary<string, string>>();

                while (rdr.Read())
                {
                    string state_str_id = rdr["state_str_id"].ToString();
                    string percent = rdr["percent"].ToString();
                    ret.Add(new Dictionary<string, string>()
                    {
                        { "state_str_id", state_str_id },
                        { "percent" , percent }
                    });
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
