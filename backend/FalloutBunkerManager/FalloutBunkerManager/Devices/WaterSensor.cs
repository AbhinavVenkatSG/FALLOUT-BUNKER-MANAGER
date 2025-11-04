// INSERT AUTHOR NAME HERE
// Water Sensor Device, reads delta water values from a file

class WaterSensor : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.WaterSensor; } }
    public string filePath { get; } = System.IO.Path.Combine("SensorEmulationFiles", "WaterLevels.dat");

    // Constructor
    public WaterSensor()
    {
        fileManager = new FileManager(filePath);
    }

    // Methods
    public DeviceStatus QueryLatest()
    {
        throw new NotImplementedException();
        float readInValue = fileManager.GetNextValue();
        // Do device specific math, if required
        // return new DeviceStatus
        // { 
        //     type = DeviceType.WaterSensor,
        //     currentValue = 0 // Replace with actual processed value
        // };
    }

    public void HandleCommand(DeviceCommand command)
    {
        throw new NotImplementedException();
        // Im not sure yet, sprint 2 issue :P
    }
}
