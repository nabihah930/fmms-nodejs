import eventEmitter from './eventEmitter.js';
import AlertModel from './models/AlertModel.js';

eventEmitter.on('thresholdBreached', async (data) => {
    console.log(`\nThreshold breached for ${data.type}: `, data);
    try {
        // Checking if alert already exists for the same sensor and region
        const existingAlert = await AlertModel.findOne({
            type: data.type,
            region: data.region,
            resolved: false
        });
        if (existingAlert) {
            console.log('Alert already exists for this threshold breach.');
            return;
        }

        const alert = new AlertModel(data);
        await alert.save();
        console.log(`Saved alert for ${data.type} to database.`);
    } catch (error) {
        console.error('🔴 Error saving alert:', error);
    }
});
