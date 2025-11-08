// INSERT AUTHOR NAME HERE
// Food Sensor Device, reads delta food values from a file
namespace FalloutBunkerManager.Devices{
public class FoodSensor : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.FoodSensor; } }
    public string filePath { get; }

    // Constructor
    public FoodSensor(string baseFolder)
    {
        filePath =Path.Combine(baseFolder,"FoodLevels.dat");
        fileManager = new FileManager(filePath);
    }

    // Methods
    public DeviceStatus QueryLatest()
    {
        throw new NotImplementedException();
        float readInValue = fileManager.GetNextValue();
        // Do device specific math, if required
        return new DeviceStatus
        {
            type = DeviceType.FoodSensor,
            currentValue = 0 // Replace with actual processed value
        };
    }

    public void HandleCommand(DeviceCommand command)
    {
        throw new NotImplementedException();
        // Im not sure yet, sprint 2 issue :P
    }
}
}
