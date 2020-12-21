using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CovidTracker.Model
{
    public interface IManager
    {
        // list of top 3 months and percent of growth
        KeyValuePair<string, float> TopMonthsGrowthForState(string state_str_id);

        // list of city and month with the most significant growth  
        KeyValuePair<string, string> TopMonthGrowthForCounty(string state_str_id);

        // graph of number of infected per month (one graph)
        KeyValuePair<DateTime, long> InfectedGraphPerState(string state_str_id);

        string GetAvgOfAfectedAllUSA();

        // Get Updated Percent Of Affected Per State (for map coloring)
        KeyValuePair<string, float> UpdatedPercentPerState();
    }
}
