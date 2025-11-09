

using Microsoft.VisualStudio.TestTools.UnitTesting;
using FalloutBunkerManager.Devices;
using System.IO;

namespace IDeviceTests
{
    [TestClass]
    public class DeviceFileReadTests
    {
        private readonly string sensorFolder;

        public DeviceFileReadTests()
        {
            // Get the folder where the test output is running
            var outputPath = Path.GetDirectoryName(typeof(DeviceFileReadTests).Assembly.Location);

            // Point to the TestResults\SensorEmulationFiles directory
            sensorFolder = Path.Combine(outputPath, "TestResults", "SensorEmulationFiles");
        }

        [TestMethod]
        public void ThermometerFile_Readable()
        {
            var thermometer = new Thermometer(sensorFolder);
            Assert.IsTrue(File.Exists(Path.Combine(sensorFolder, "Temperature.dat")));
        }

        [TestMethod]
        public void WaterSensorFile_Readable()
        {
            var waterSensor = new WaterSensor(sensorFolder);
            Assert.IsTrue(File.Exists(Path.Combine(sensorFolder, "WaterLevels.dat")));
        }

        [TestMethod]
        public void O2ScrubberFile_Readable()
        {
            var o2Scrubber = new O2Scrubber(sensorFolder);
            Assert.IsTrue(File.Exists(Path.Combine(sensorFolder, "OxygenLevels.dat")));
        }

        [TestMethod]
        public void FoodSensorFile_Readable()
        {
            var foodSensor = new FoodSensor(sensorFolder);
            Assert.IsTrue(File.Exists(Path.Combine(sensorFolder, "FoodLevels.dat")));
        }

        [TestMethod]
        public void GeneratorFile_Readable()
        {
            var generator = new Generator(sensorFolder);
            Assert.IsTrue(File.Exists(Path.Combine(sensorFolder, "GasolineLevels.dat")));
        }

        [TestMethod]
        public void HealthMonitorFile_Readable()
        {
            var healthMonitor = new HealthMonitor(sensorFolder);
            Assert.IsTrue(File.Exists(Path.Combine(sensorFolder, "HealthLevels.dat")));
        }

        [TestMethod]
        public void DosimeterFile_Readable()
        {
            var dosimeter = new Dosimeter(sensorFolder);
            Assert.IsTrue(File.Exists(Path.Combine(sensorFolder, "RadiationLevels.dat")));
        }
    }
}
