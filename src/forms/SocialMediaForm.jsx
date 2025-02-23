// forms/SocialMediaForm.jsx
import React from 'react';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';

const SocialMediaForm = ({ formData, handleChange, handleNext, handlePrevious }) => {
  return (
    <form className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-purple-700">Social Media Data</h2>
        <p className="text-gray-600 text-sm font-semibold">Please provide information about your social media usage</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="Posts Per Week"
          id="postFrequency"
          name="postFrequency"
          type="number"
          value={formData.postFrequency}
          onChange={handleChange}
          placeholder="10"
          required
        />
        
        <CustomInput
          label="Sentiment Score (0-10)"
          id="sentimentScore"
          name="sentimentScore"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={formData.sentimentScore}
          onChange={handleChange}
          placeholder="7.5"
          required
        />
        
        <CustomInput
          label="Daily Social Interactions"
          id="socialInteractions"
          name="socialInteractions"
          type="number"
          value={formData.socialInteractions}
          onChange={handleChange}
          placeholder="25"
          required
        />
        
        <CustomInput
          label="Daily Screen Time (hours)"
          id="timeSpent"
          name="timeSpent"
          type="number"
          step="0.1"
          value={formData.timeSpent}
          onChange={handleChange}
          placeholder="3.5"
          required
        />
        
        <CustomInput
          label="Content Type Score (1-5)"
          id="contentType"
          name="contentType"
          type="number"
          min="1"
          max="5"
          value={formData.contentType}
          onChange={handleChange}
          placeholder="3"
          required
        />
        
        <CustomInput
          label="Engagement Rate (%)"
          id="engagementRate"
          name="engagementRate"
          type="number"
          step="0.1"
          value={formData.engagementRate}
          onChange={handleChange}
          placeholder="4.2"
          required
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <Button 
          onClick={handlePrevious}
          isPrimary={false}
        >
          Previous
        </Button>
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

export default SocialMediaForm;