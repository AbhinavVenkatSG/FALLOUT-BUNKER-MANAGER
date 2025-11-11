
using FalloutBunkerManager.Devices;

namespace FalloutBunkerManager
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string sensorFolder = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "SensorEmulationFiles");

            IDevice[] devices =
            {
                new Thermometer(sensorFolder),
                new WaterSensor(sensorFolder),
                new FoodSensor(sensorFolder),
                new Generator(sensorFolder),
                new O2Scrubber(sensorFolder),
                new HealthMonitor(sensorFolder),
                new Dosimeter(sensorFolder)
            };

            var scadaController = new ScadaController(devices);
            scadaController.MainLoop();
        }
    }
}
