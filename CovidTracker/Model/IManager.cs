using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CovidTracker.Model
{
    public interface IManager
    {
        // list of top 3 months and percent of growth - 1
        List<Dictionary<string, string>> TopMonthsGrowthForState(string state_str_id);

        // list of city and month with the most significant growth - 2
        List<Dictionary<string, string>> TopMonthGrowthForCounty(string state_str_id);

        // graph of number of infected per month (one graph) - 3
        List<Dictionary<string, string>> InfectedGraphPerState(string state_str_id);

        // 4
        List<Dictionary<string, string>> GetAvgOfAfectedAllUSA();

        // Get Updated Percent Of Affected Per State (for map coloring) - 5
        List<Dictionary<string, string>> UpdatedPercentPerState();
    }
}
