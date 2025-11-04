// INSERT AUTHOR NAME HERE
// Health Monitor Device, reads delta health values from a file

class HealthMonitor : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.HealthMonitor; } }
    public string filePath { get; } = System.IO.Path.Combine("SensorEmulationFiles", "HealthLevels.dat");

    // Constructor
    public HealthMonitor()
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
        //     type = DeviceType.HealthMonitor,
        //     currentValue = 0 // Replace with actual processed value
        // };
    }

    public void HandleCommand(DeviceCommand command)
    {
        throw new NotImplementedException();
        // Im not sure yet, sprint 2 issue :P
    }
}
