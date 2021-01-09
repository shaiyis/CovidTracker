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

        //1
        [HttpGet]
        [Route("state_growth")]
        public ActionResult TopMonthsGrowthForState([FromQuery(Name = "state_str_id")] string state_str_id)
        {
            // asking the manager to ask the DB for the result 
            var res = manager.TopMonthsGrowthForState(state_str_id);
            if (res == null)
            {
                return BadRequest("Connection failure");
            }
            // return the model answer to the UI
            return Ok(res);
        }


        // 2
        [HttpGet]
        [Route("county_growth")]
        public ActionResult TopMonthGrowthForCounty([FromQuery(Name = "state_str_id")] string state_str_id)
        {
            var res = manager.TopMonthGrowthForCounty(state_str_id);
            if (res == null)
            {
                return BadRequest("Connection failure");
            }
            return Ok(res);
        }



        // 3
        [HttpGet]
        [Route("state_graph")]
        public ActionResult InfectedGraphPerState([FromQuery(Name = "state_str_id")] string state_str_id)
        {

            var res = manager.InfectedGraphPerState(state_str_id);

            if (res == null)
            {
                return BadRequest("Connection failure");
            }
            return Ok(res);
        }

        // 4
        [HttpGet]
        [Route("usa_avg")]
        public ActionResult GetAvgOfAfectedAllUSA()
        {

            var res = manager.GetAvgOfAfectedAllUSA();
            if (res == null)
            {
                return BadRequest("Connection failure");
            }
            return Ok(res);
        }

        // 5
        [HttpGet]
        [Route("map_coloring")]
        public ActionResult UpdatedPercentPerState()
        {
            var res = manager.UpdatedPercentPerState();
            if (res == null)
            {
                return BadRequest("Connection failure");
            }
            return Ok(res);
        }
    }
}
