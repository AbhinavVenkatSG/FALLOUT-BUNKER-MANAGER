


//aim is to basically test simulate frontend polling and verify weather the data is changing over time
import fetch from "node-fetch"; // make sure node-fetch is installed: npm install node-fetch


const API_URL = "http://localhost:5244/api/device";
const POLL_COUNT = 5;
const POLL_INTERVAL_MS = 3000;

let previousData = null;

async function pollDevices() {
  console.log(`Starting device polling test: ${POLL_COUNT} polls, every ${POLL_INTERVAL_MS}ms\n`);

  for (let i = 1; i <= POLL_COUNT; i++) {
    try {
      const res = await fetch(API_URL);
      const devices = await res.json();

      if (!Array.isArray(devices)) throw new Error("API did not return an array of devices");

      console.log(`Poll #${i}:`);
      devices.forEach(d => console.log(`  Device ${d.type}: ${d.currentValue}`));

      if (previousData) {
        let changed = false;
        for (let j = 0; j < devices.length; j++) {
          if (devices[j].currentValue !== previousData[j].currentValue) {
            changed = true;
            break;
          }
        }

        console.log(changed ? "   Values changed since last poll\n" : "  No change detected\n");
      }

      previousData = devices;

    } catch (err) {
      console.error("Error fetching API:", err.message);
    }


    if (i < POLL_COUNT) await new Promise(res => setTimeout(res, POLL_INTERVAL_MS));
  }

  console.log("Polling test completed ✅");
}

pollDevices();

