// Spencer Watkinson
// Thermometer Device, reads static temperature values from a file

class Thermometer : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.Thermometer; } }
    public string filePath { get; } = System.IO.Path.Combine("SensorEmulationFiles", "Temperature.dat");

    // Constructor
    public Thermometer()
    {
        fileManager = new FileManager(filePath);
    }

    // Methods
    public DeviceStatus QueryLatest()
    {
        float readInValue = fileManager.GetNextValue();

        return new DeviceStatus
        {
            type = DeviceType.Thermometer,
            currentValue = readInValue
        };
    }

    public void HandleCommand(DeviceCommand command)
    {
        throw new NotImplementedException();
        // Im not sure yet, sprint 2 issue :P
    }
}
