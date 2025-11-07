// INSERT AUTHOR NAME HERE
// Water Sensor Device, reads delta water values from a file

class WaterSensor : IDevice
{
    // Params
    public FileManager fileManager { get; }
    public DeviceType type { get { return DeviceType.WaterSensor; } }
    public string filePath { get; } = Path.Combine("SensorEmulationFiles", "WaterLevels.dat");

    private float currentWaterLevel { get; set; } = 100.0f;
    private const float MAX_WATER = 100f;
    private const float MIN_WATER = 0f;

    // Constructor
    public WaterSensor()
    {
        fileManager = new FileManager(filePath);
    }

    // Methods
    public DeviceStatus QueryLatest()
    {
        float readInValue = fileManager.GetNextValue();

        currentWaterLevel += readInValue;

        // Ensures water level stays within bounds
        if (currentWaterLevel > MAX_WATER) currentWaterLevel = MAX_WATER;
        if (currentWaterLevel < MIN_WATER) currentWaterLevel = MIN_WATER;

        return new DeviceStatus
        { 
            type = DeviceType.WaterSensor,
            currentValue = currentWaterLevel
        };
    }

    public void HandleCommand(DeviceCommand command)
    {
        throw new NotImplementedException();
        // Im not sure yet, sprint 2 issue :P
    }
}
