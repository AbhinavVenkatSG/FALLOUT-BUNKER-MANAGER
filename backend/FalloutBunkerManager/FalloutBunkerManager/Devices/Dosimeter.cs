// INSERT AUTHOR NAME HERE
// Dosimeter Device, reads static radiation values from a file

class Dosimeter : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.Dosimeter; } }
    public string filePath { get; } = System.IO.Path.Combine("SensorEmulationFiles", "RadiationLevels.dat");

    // Constructor
    public Dosimeter()
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
        //     type = DeviceType.Dosimeter,
        //     currentValue = 0 // Replace with actual processed value
        // };
    }

    public void HandleCommand(DeviceCommand command)
    {
        throw new NotImplementedException();
        // Im not sure yet, sprint 2 issue :P
    }
}
