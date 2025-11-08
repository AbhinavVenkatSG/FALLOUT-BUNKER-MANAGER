
using Microsoft.AspNetCore.Mvc;
using FalloutBunkerManager;
using FalloutBunkerManager.Devices;

namespace FalloutBunkerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeviceController : ControllerBase
    {
        private readonly IDevice[] devices;
        private readonly int[] queryCounters;

        public DeviceController()
        {
            string sensorFolder = Path.GetFullPath(Path.Combine(
                AppDomain.CurrentDomain.BaseDirectory,
                "..", "..", "..", "..",
                "FalloutBunkerManager", "FalloutBunkerManager", "SensorEmulationFiles"
            ));

            devices = new IDevice[]
            {
                new Thermometer(sensorFolder),
                new WaterSensor(sensorFolder),
                // new FoodSensor(sensorFolder),
                new Generator(sensorFolder),
                new O2Scrubber(sensorFolder),
                new HealthMonitor(sensorFolder),
                new Dosimeter(sensorFolder)
            };

            queryCounters = new int[devices.Length];
        }
        //okay rn my understanding is that it is just  this query latest function is not not querying the latest data from the devices
        //its just querying the fist line of data from the file each time 
        //
        [HttpGet]
        public ActionResult<DeviceStatus[]> GetAll()
        {
            var statuses = new DeviceStatus[devices.Length];

            for (int i = 0; i < devices.Length; i++)
            {
                statuses[i] = devices[i].QueryLatest();
                queryCounters[i]++;

                
            }

            return Ok(statuses);
        }
    }
}
