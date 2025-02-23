// FormContainer.jsx
import React, { useState } from 'react';
import WearableSensorForm from './forms/WearableSensorForm';
import SocialMediaForm from './forms/SocialMediaForm';
import SpeechPatternForm from './forms/SpeechPatternForm';

const FormContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    // Wearable Sensor Data (Page 1)
    heartRate: '',
    sleepHours: '',
    stepCount: '',
    caloriesBurned: '',
    restingHeartRate: '',
    bodyTemperature: '',
    
    // Social Media Data (Page 2)
    postFrequency: '',
    sentimentScore: '',
    socialInteractions: '',
    timeSpent: '',
    contentType: '',
    engagementRate: '',
    
    // Speech Pattern Data (Page 3)
    speechRate: '',
    pauseFrequency: '',
    toneVariation: '',
    wordChoice: '',
    coherenceScore: '',
    emotionalTone: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Move to next page
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  
  // Move to previous page
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  
  // Submit form data for prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Convert form data to array of features in the expected order
    const features = [
      // Wearable data
      parseFloat(formData.heartRate),
      parseFloat(formData.sleepHours),
      parseFloat(formData.stepCount),
      parseFloat(formData.caloriesBurned),
      parseFloat(formData.restingHeartRate),
      parseFloat(formData.bodyTemperature),
      
      // Social media data
      parseFloat(formData.postFrequency),
      parseFloat(formData.sentimentScore),
      parseFloat(formData.socialInteractions),
      parseFloat(formData.timeSpent),
      parseFloat(formData.contentType),
      parseFloat(formData.engagementRate),
      
      // Speech pattern data
      parseFloat(formData.speechRate),
      parseFloat(formData.pauseFrequency),
      parseFloat(formData.toneVariation),
      parseFloat(formData.wordChoice),
      parseFloat(formData.coherenceScore),
      parseFloat(formData.emotionalTone)
    ];
    
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: features }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error making prediction');
      }
      
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message || 'An error occurred during prediction');
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate progress percentage
  const progressPercentage = (currentPage / 3) * 100;
  
  // Render based on current page
  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <WearableSensorForm formData={formData} handleChange={handleChange} handleNext={handleNext} />;
      case 2:
        return <SocialMediaForm formData={formData} handleChange={handleChange} handleNext={handleNext} handlePrevious={handlePrevious} />;
      case 3:
        return <SpeechPatternForm 
          formData={formData} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit}
          handlePrevious={handlePrevious}
          loading={loading}
        />;
      default:
        return <WearableSensorForm formData={formData} handleChange={handleChange} handleNext={handleNext} />;
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4 ">
      <div className="bg-gradient-to-b from-[rgb(203,197,237)] to-[rgb(193,182,242)] shadow-2xl rounded-lg overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-center text-[#2D1B69] ">
            MENTAL HEALTH Prediction Tool
          </h2>
          <div className="mt-4">
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Step {currentPage} of 3
            </p>
          </div>
        </div>
        
        {/* Card Content */}
        <div className="p-6">
          {renderPage()}
          
          {/* Prediction Results */}
          {prediction && (
            <div className="mt-6 p-4 border rounded-md bg-gray-50">
              <h3 className="font-bold text-lg mb-2 text-gray-800">Prediction Result</h3>
              <p className="mb-1"><span className="font-medium">Mental Health Condition:</span> {prediction.mental_health_condition}</p>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                <p className="font-medium">Note:</p>
                <p>This is an automated prediction and should not replace professional medical advice. Please consult a healthcare provider for proper diagnosis.</p>
              </div>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;