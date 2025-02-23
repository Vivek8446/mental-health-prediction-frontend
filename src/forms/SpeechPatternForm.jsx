// forms/SpeechPatternForm.jsx
import React from 'react';
import CustomInput from '../components/CustomInput';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

const SpeechPatternForm = ({ formData, handleChange, handleSubmit, handlePrevious, loading }) => {
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-purple-700">Speech Pattern Data</h2>
        <p className="text-gray-600 text-sm font-semibold">Please provide speech analysis metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          label="Speech Rate (words/min)"
          id="speechRate"
          name="speechRate"
          type="number"
          value={formData.speechRate}
          onChange={handleChange}
          placeholder="150"
          required
        />
        
        <CustomInput
          label="Pause Frequency (per min)"
          id="pauseFrequency"
          name="pauseFrequency"
          type="number"
          step="0.1"
          value={formData.pauseFrequency}
          onChange={handleChange}
          placeholder="2.5"
          required
        />
        
        <CustomInput
          label="Tone Variation Score (1-10)"
          id="toneVariation"
          name="toneVariation"
          type="number"
          min="1"
          max="10"
          step="0.1"
          value={formData.toneVariation}
          onChange={handleChange}
          placeholder="6.5"
          required
        />
        
        <CustomInput
          label="Word Choice Diversity (1-10)"
          id="wordChoice"
          name="wordChoice"
          type="number"
          min="1"
          max="10"
          step="0.1"
          value={formData.wordChoice}
          onChange={handleChange}
          placeholder="7.2"
          required
        />
        
        <CustomInput
          label="Coherence Score (1-10)"
          id="coherenceScore"
          name="coherenceScore"
          type="number"
          min="1"
          max="10"
          step="0.1"
          value={formData.coherenceScore}
          onChange={handleChange}
          placeholder="8.0"
          required
        />
        
        <CustomInput
          label="Emotional Tone Score (1-10)"
          id="emotionalTone"
          name="emotionalTone"
          type="number"
          min="1"
          max="10"
          step="0.1"
          value={formData.emotionalTone}
          onChange={handleChange}
          placeholder="6.5"
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
        <button
          type="submit"
          disabled={loading}
          className={`flex items-center px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <LoadingSpinner />
              Predicting...
            </>
          ) : (
            'Get Prediction'
          )}
        </button>
      </div>
    </form>
  );
};

export default SpeechPatternForm;