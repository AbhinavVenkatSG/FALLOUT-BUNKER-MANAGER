using Microsoft.AspNetCore.Mvc;
using FalloutBunkerManager;
using FalloutBunkerManager.Devices;

namespace FalloutBunkerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
public class DeviceController : ControllerBase
{
    private IDevice[] devices;

    public DeviceController()
    {
        
      string sensorFolder = Path.GetFullPath(Path.Combine(
        AppDomain.CurrentDomain.BaseDirectory,
        "..", "..","..",".." ,"FalloutBunkerManager", "FalloutBunkerManager", "SensorEmulationFiles"
));
        devices = new IDevice[]
        {
            new Thermometer(sensorFolder),
            new WaterSensor(sensorFolder),
            new FoodSensor(sensorFolder),
            new Generator(sensorFolder),
            new O2Scrubber(sensorFolder),
            new HealthMonitor(sensorFolder),
            new Dosimeter(sensorFolder)
        };
    }

    [HttpGet]
    public ActionResult<DeviceStatus[]> GetAll()
    {
        return Ok(devices.Select(d => d.QueryLatest()).ToArray());
    }
}
}
