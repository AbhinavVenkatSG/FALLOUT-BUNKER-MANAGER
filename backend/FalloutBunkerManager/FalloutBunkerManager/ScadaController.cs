using FalloutBunkerManager.Devices;

namespace FalloutBunkerManager
{
    public class ScadaController
    {
        private IDevice[] deviceList;

        public ScadaController(IDevice[] devices)
        {
            deviceList = devices;
        }

        public void MainLoop()
        {
            while (true)
            {
                var statuses = QueryDevices();
                // TODO: send statuses to frontend
            }
        }

        public DeviceStatus[] QueryDevices()
        {
            var deviceStatuses = new DeviceStatus[deviceList.Length];
            for (int i = 0; i < deviceList.Length; i++)
            {
                deviceStatuses[i] = deviceList[i].QueryLatest();
            }
            return deviceStatuses;
        }
    }
}

