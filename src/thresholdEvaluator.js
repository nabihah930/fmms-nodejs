import fs from 'fs/promises';

let thresholds = {
  waterLevel: 6,
  cumulativeRainfall: 100,
  riverFlowVelocity: 2.5,
  soilSaturation: 75,
  windSpeedDirection: 70
};

export const loadThresholds = async () => {
  try {
    const data = await fs.readFile('./util/thresholds.json', 'utf-8');
    thresholds = JSON.parse(data);
    console.log('✔ Thresholds loaded:', thresholds);
  } catch (error) {
    console.error('🔴 Error loading thresholds:', error);
  }
};

export const isThresholdBreached = (sensorType, value) => {
  if (!thresholds[sensorType]) {
    console.error(`🔴 Unknown sensor type: ${sensorType}`);
    return false;
  }
  return value > thresholds[sensorType];
};
