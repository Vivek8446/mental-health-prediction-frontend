// forms/WearableSensorForm.jsx
import React from 'react';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';

const WearableSensorForm = ({ formData, handleChange, handleNext }) => {
  return (
    <form className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-purple-700">Wearable Sensor Data</h2>
        <p className="text-gray-600 text-sm font-semibold">Please enter the following data from your wearable device</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="Heart Rate (BPM)"
          id="heartRate"
          name="heartRate"
          type="number"
          value={formData.heartRate}
          onChange={handleChange}
          placeholder="70"
          required
        />
        
        <CustomInput
          label="Sleep Hours"
          id="sleepHours"
          name="sleepHours"
          type="number"
          step="0.1"
          value={formData.sleepHours}
          onChange={handleChange}
          placeholder="7.5"
          required
        />
        
        <CustomInput
          label="Daily Step Count"
          id="stepCount"
          name="stepCount"
          type="number"
          value={formData.stepCount}
          onChange={handleChange}
          placeholder="8000"
          required
        />
        
        <CustomInput
          label="Calories Burned"
          id="caloriesBurned"
          name="caloriesBurned"
          type="number"
          value={formData.caloriesBurned}
          onChange={handleChange}
          placeholder="1800"
          required
        />
        
        <CustomInput
          label="Resting Heart Rate (BPM)"
          id="restingHeartRate"
          name="restingHeartRate"
          type="number"
          value={formData.restingHeartRate}
          onChange={handleChange}
          placeholder="60"
          required
        />
        
        <CustomInput
          label="Body Temperature (°F)"
          id="bodyTemperature"
          name="bodyTemperature"
          type="number"
          step="0.1"
          value={formData.bodyTemperature}
          onChange={handleChange}
          placeholder="98.6"
          required
        />
      </div>
      
      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleNext}
          isPrimary={true}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default WearableSensorForm;