// INSERT AUTHOR NAME HERE
// Oxygen Scrubber Device, reads delta oxygen values from a file

class O2Scrubber : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.O2Scrubber; } }
    public string filePath { get; } = System.IO.Path.Combine("SensorEmulationFiles", "OxygenLevels.dat");

    // Constructor
    public O2Scrubber()
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
        //     type = DeviceType.O2Scrubber,
        //     currentValue = 0 // Replace with actual processed value
        // };
    }

    public void HandleCommand(DeviceCommand command)
    {
        throw new NotImplementedException();
        // Im not sure yet, sprint 2 issue :P
    }
}
