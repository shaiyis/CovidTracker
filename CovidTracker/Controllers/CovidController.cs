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
            List <KeyValuePair<long, long>> res = new List<KeyValuePair<long, long>>() { new KeyValuePair<long, long>(1576108800000, 2), new KeyValuePair<long, long>(1576108886400, 42), new KeyValuePair<long, long>(1576108972800, 82)};

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
