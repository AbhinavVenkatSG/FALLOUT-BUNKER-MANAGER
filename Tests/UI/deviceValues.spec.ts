

//could not get this working prolblem for next sprint 
// skipping for now
import { test, expect } from '@playwright/test';

const frontendPort = 8081;
const baseUrl = `http://localhost:${frontendPort}/`;

const devices = [
  { id: 'thermometer-value', name: 'Thermometer' },
  { id: 'water-value', name: 'Water Sensor' },
  { id: 'food-value', name: 'Food Monitor' },
  { id: 'generator-value', name: 'Generator' },
  { id: 'o2scrubber-value', name: 'Oxygen Scrubber' },
  { id: 'health-value', name: 'Health Monitor' },
  { id: 'dosimeter-value', name: 'Dosimeter' },
];

test('Check device values change over 3 polls', async ({ page }) => {

  await page.goto(baseUrl, { waitUntil: 'networkidle', timeout: 60000 });

  await page.locator(`[data-testid="${devices[0].id}"]`).first().waitFor({ timeout: 60000 });

  console.log('Starting device value polling...');

  const previousValues: Record<string, number> = {};

  for (let poll = 1; poll <= 3; poll++) {
    console.log(`\nPoll ${poll}:`);

    for (const device of devices) {
      const el = page.locator(`[data-testid="${device.id}"]`);
      const text = await el.innerText();
      const value = parseFloat(text.replace('%', '').trim());

      console.log(`${device.name}: ${value}`);

      expect(value).not.toBeNaN();

      if (poll > 1 && previousValues[device.id] !=undefined) {

        expect(value).not.toBe(previousValues[device.id]);
      }

      previousValues[device.id] = value;
    }

    await page.waitForTimeout(3000);
  }

  console.log('\nAll device values validated and changed successfully!');
});
