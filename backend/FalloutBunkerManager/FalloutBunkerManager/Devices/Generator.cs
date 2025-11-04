// INSERT AUTHOR NAME HERE
// Generator Device, reads delta gasoline usage values from a file

class Generator : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.Generator; } }
    public string filePath { get; } = System.IO.Path.Combine("SensorEmulationFiles", "GasolineLevels.dat");

    // Constructor
    public Generator()
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
        //     type = DeviceType.Generator,
        //     currentValue = 0 // Replace with actual processed value
        // };
    }

    public void HandleCommand(DeviceCommand command)
    {
        throw new NotImplementedException();
        // Im not sure yet, sprint 2 issue :P
    }
}
