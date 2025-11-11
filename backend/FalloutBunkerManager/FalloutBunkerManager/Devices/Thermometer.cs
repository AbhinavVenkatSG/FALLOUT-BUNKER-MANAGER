// Spencer Watkinson
// Thermometer Device, reads static temperature values from a file
namespace FalloutBunkerManager.Devices{
public class Thermometer : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.Thermometer; } }
    public string filePath { get; }

    // Constructor
    public Thermometer(string baseFolder)
    {
        filePath =Path.Combine(baseFolder,"Temperature.dat");
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
}
