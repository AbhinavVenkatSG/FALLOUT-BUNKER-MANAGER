// Ricardo & Spencer
// Dosimeter Device, reads static radiation values from a file
namespace FalloutBunkerManager.Devices{
public class Dosimeter : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.Dosimeter; } }
    public string filePath { get; }

    // Constructor
    public Dosimeter(string basefolder)
    {
        filePath =Path.Combine(basefolder,"RadiationLevels.dat");
        fileManager = new FileManager(filePath);
    }

    // Methods
    public DeviceStatus QueryLatest()
    {
        float readInValue = fileManager.GetNextValue();

        return new DeviceStatus
        { 
            type = DeviceType.Dosimeter,
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
