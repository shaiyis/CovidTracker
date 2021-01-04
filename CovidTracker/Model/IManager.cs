using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CovidTracker.Model
{
    public interface IManager
    {
        // list of top 3 months and percent of growth
        List<KeyValuePair<string, int>> TopMonthsGrowthForState(string state_str_id);

        // list of city and month with the most significant growth  
        List<KeyValuePair<string, string>> TopMonthGrowthForCounty(string state_str_id);

        // graph of number of infected per month (one graph)
        List<KeyValuePair<int, int>> InfectedGraphPerState(string state_str_id);

        string GetAvgOfAfectedAllUSA();

        // Get Updated Percent Of Affected Per State (for map coloring)
        List<KeyValuePair<string, int>> UpdatedPercentPerState();
    }
}
