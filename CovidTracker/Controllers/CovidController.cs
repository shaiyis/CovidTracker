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
        [Route("/covid/usa_avg")]
        public ActionResult GetAvgOfAfectedAllUSA()
        {
            
            string avg = manager.GetAvgOfAfectedAllUSA();
            if (avg == null)
            {
                return BadRequest("Connection failure");
            }
            return Ok(avg);
        }


    }
}
