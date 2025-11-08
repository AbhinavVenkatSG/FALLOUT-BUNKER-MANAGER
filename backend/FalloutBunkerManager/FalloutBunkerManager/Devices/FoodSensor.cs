// INSERT AUTHOR NAME HERE
// Food Sensor Device, reads delta food values from a file
namespace FalloutBunkerManager.Devices{
public class FoodSensor : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.FoodSensor; } }
    public string filePath { get; }
    private float currentFoodLevel { get; set; } = 100.0f;
    private float Max_Food = 100f;
    private float Min_Food = 0f;

    // Constructor
    public FoodSensor(string baseFolder)
    {
        filePath =Path.Combine(baseFolder,"FoodLevels.dat");
        fileManager = new FileManager(filePath);
    }

    // Methods
     public DeviceStatus QueryLatest()
    {
        float readInValue = fileManager.GetNextValue();

        currentFoodLevel += readInValue;

        if (currentFoodLevel > Max_Food) currentFoodLevel = Max_Food;
        if (currentFoodLevel < Min_Food) currentFoodLevel = Min_Food;

        return new DeviceStatus
        {
            type = DeviceType.FoodSensor,
            currentValue = currentFoodLevel
        };
    }

    public void HandleCommand(DeviceCommand command)
    {
        throw new NotImplementedException();
        // Im not sure yet, sprint 2 issue :P
    }
}
}
