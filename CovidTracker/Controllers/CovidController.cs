using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using CovidTracker.Model;


namespace CovidTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CovidController : Controller
    {
        private readonly IManager manager;

        public CovidController(IManager manager)
        {
            this.manager = manager;
        }

        // GET: AppController
        [HttpGet]
        public ActionResult Index()
        {
            return Ok("Welcome to my server!");
        }


        [HttpGet]
        [Route("usa_avg")]
        public ActionResult GetAvgOfAfectedAllUSA()
        {

            string avg = manager.GetAvgOfAfectedAllUSA();
            if (avg == null)
            {
                return BadRequest("Connection failure");
            }
            return Ok(avg);
        }

        [HttpGet]
        [Route("state_graph")]
        public ActionResult InfectedGraphPerState([FromQuery(Name = "state_str_id")] string state_str_id)
        {

            //List <KeyValuePair<int, int>> res = manager.InfectedGraphPerState(state_str_id);
            /* List<Dictionary<long, long>> res = new List<Dictionary<long, long>>() { new Dictionary<string, long>() { { "df": 2} }, new Dictionary<long, long>(1576108886400, 42), new Dictionary<long, long>(1576108972800, 82)};*/
            /* var res = new List<Dictionary<string, string>>()
             {
                 new Dictionary<string, string>()
                 {
                     { "city", "noa" },
                     {"month" , "July" }
                 },
                 new Dictionary<string, string>()
                 {
                     { "city", "gilad" },
                     {"month" , "asher" }
                 },
                 new Dictionary<string, string>()
                 {
                     { "city", "noa" },
                     {"month" , "July" }
                 },
                 new Dictionary<string, string>()
                 {
                     { "city", "noa" },
                     {"month" , "July" }
                 }
             };*/
            var res = new List<Dictionary<string, long>>()
             {
                 new Dictionary<string, long>()
                 {
                     { "month_as_number", 3 },
                     {"cases" , 564 }
                 },
                 new Dictionary<string, long>()
                 {
                     { "month_as_number", 4 },
                     { "cases" , 3281 }
                 },
                 new Dictionary<string, long>()
                 {
                     { "month_as_number", 5 },
                     { "cases" , 7253 }
                 },
                 new Dictionary<string, long>()
                 {
                     { "month_as_number", 6 },
                     { "cases" , 20777 }
                 },
                 new Dictionary<string, long>()
                 {
                     { "month_as_number", 7 },
                     { "cases" , 42511 }
                 },
                 new Dictionary<string, long>()
                 {
                     { "month_as_number", 8 },
                     { "cases" , 61224 }
                 },
                 new Dictionary<string, long>()
                 {
                     { "month_as_number", 9 },
                     { "cases" , 83697 }
                 },
                 new Dictionary<string, long>()
                 {
                     { "month_as_number", 10 },
                     { "cases" , 112190 }
                 },
                 new Dictionary<string, long>()
                 {
                     { "month_as_number", 11 },
                     { "cases" , 157359 }
                 },
             };

            if (res == null)
            {
                return BadRequest("Connection failure");
            }
            return Ok(res);
        }



        [HttpGet]
        [Route("county_growth")]
        public ActionResult TopMonthGrowthForCounty([FromQuery(Name = "state_str_id")] string state_str_id)
        {
            List<KeyValuePair<string, string>> res = manager.TopMonthGrowthForCounty(state_str_id);
            if (res == null)
            {
                return BadRequest("Connection failure");
            }
            return Ok(res);
        }

        [HttpGet]
        [Route("state_growth")]
        public ActionResult TopMonthsGrowthForState([FromQuery(Name = "state_str_id")] string state_str_id)
        {
            List<KeyValuePair<string, int>> res = manager.TopMonthsGrowthForState(state_str_id);
            if (res == null)
            {
                return BadRequest("Connection failure");
            }
            return Ok(res);
        }

        [HttpGet]
        [Route("map_coloring")]
        public ActionResult UpdatedPercentPerState()
        {
            List<KeyValuePair<string, int>> res = manager.UpdatedPercentPerState();
            if (res == null)
            {
                return BadRequest("Connection failure");
            }
            return Ok(res);
        }
    }
}
