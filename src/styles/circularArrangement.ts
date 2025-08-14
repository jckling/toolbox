import type { CSSProperties } from 'react';
import { STYLE_CONSTANTS } from '../constants/circularArrangement';

// Main container styles
export const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

// Control panel styles
export const controlPanelStyle: CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  width: '100%',
  maxWidth: `${STYLE_CONSTANTS.CONTAINER_MAX_WIDTH}px`
};

// Control group styles
export const controlGroupStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  alignItems: 'center'
};

// Responsive control group styles
export const responsiveControlGroupStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  alignItems: 'center',
  justifyContent: 'space-between'
};

// Control item styles
export const controlItemStyle: CSSProperties = {
  flex: '1 1 auto',
  minWidth: '150px'
};

// Responsive control item styles
export const responsiveControlItemStyle: CSSProperties = {
  flex: '1 1 auto',
  minWidth: '150px'
};

// Mobile control item styles
export const mobileControlItemStyle: CSSProperties = {
  flex: '1 1 100%',
  minWidth: 'auto'
};

// Enhanced button styles
export const enhancedButtonStyle: CSSProperties = {
  padding: '8px 8px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  fontWeight: 500
};

export const enhancedButtonHoverStyle: CSSProperties = {
  backgroundColor: '#218838',
  transform: 'translateY(-2px)',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
};


// Label styles
export const labelStyle: CSSProperties = {
  display: 'block',
  marginBottom: '5px'
};

// Input range styles
export const inputRangeStyle: CSSProperties = {
  width: '100px'
};

// Color input styles
export const colorInputStyle: CSSProperties = {
  width: '30px',
  height: '30px',
  border: '1px solid #ccc'
};

// Button styles
export const buttonStyle: CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export const resetButtonStyle: CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export const legendControlGroupStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  alignItems: 'center'
};


export const modeToggleButtonContainerStyle: CSSProperties = {
  display: 'flex',
  gap: '10px'
};

export const getImageModeButtonStyle = (tempConnection: {from: number} | null): CSSProperties => ({
  padding: '5px 10px',
  backgroundColor: tempConnection === null ? '#007bff' : '#f0f0f0',
  color: tempConnection === null ? 'white' : 'black',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer'
});

export const getConnectionModeButtonStyle = (tempConnection: {from: number} | null): CSSProperties => ({
  padding: '5px 10px',
  backgroundColor: tempConnection !== null ? '#007bff' : '#f0f0f0',
  color: tempConnection !== null ? 'white' : 'black',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer'
});

export const modeInfoStyle: CSSProperties = {
  marginTop: '5px',
  fontSize: '14px',
  color: '#666'
};


export const connectionModifyContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

export const connectionModifySelectStyle: CSSProperties = {
  padding: '4px'
};

export const deleteConnectionButtonStyle: CSSProperties = {
  padding: '4px 8px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export const cancelSelectionButtonStyle: CSSProperties = {
  padding: '4px 8px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};


export const connectionManageHeadingStyle: CSSProperties = {
  margin: '0 0 10px 0'
};

export const connectionTypeListStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  marginBottom: '10px'
};

export const getConnectionTypeItemStyle = (isSelected: boolean): CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
  backgroundColor: isSelected ? '#007bff' : '#f0f0f0',
  color: isSelected ? 'white' : 'black',
  borderRadius: '4px',
  cursor: 'pointer',
  border: '1px solid #ccc'
});

export const connectionColorSwatchStyle: CSSProperties = {
  width: '20px',
  height: '20px',
  marginRight: '8px',
  border: '1px solid #999'
};

export const addConnectionTypeButtonStyle: CSSProperties = {
  padding: '5px 10px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export const connectionSettingsContainerStyle: CSSProperties = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
};

export const connectionNameInputStyle: CSSProperties = {
  padding: '4px'
};

export const connectionColorInputStyle: CSSProperties = {
  width: '40px',
  height: '30px'
};

export const connectionThicknessSliderStyle: CSSProperties = {
  width: '80px'
};

export const deleteConnectionTypeButtonStyle = (hasMultipleTypes: boolean): CSSProperties => ({
  padding: '4px 8px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: hasMultipleTypes ? 'pointer' : 'not-allowed',
  opacity: hasMultipleTypes ? 1 : 0.5
});

// Canvas styles
export const canvasWrapperStyle = (tempConnection: {from: number} | null): CSSProperties => ({
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  cursor: tempConnection !== null ? 'crosshair' : 'default'
});

// Instructions styles
export const instructionsPanelStyle: CSSProperties = {
  padding: '10px',
  backgroundColor: '#f8f9fa',
  borderRadius: '4px',
  border: '1px solid #e9ecef',
  fontSize: '14px',
  maxWidth: `${STYLE_CONSTANTS.CONTAINER_MAX_WIDTH}px`
};

export const instructionsTextStyle: CSSProperties = {
  margin: 0
};

// Section heading styles
export const sectionHeadingStyle: CSSProperties = {
  marginTop: 0,
  marginBottom: '15px',
  color: '#495057',
  fontSize: '1.2rem',
  fontWeight: 500
};

// Unified panel style
export const unifiedPanelStyle: CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#f8f9fa',
  borderRadius: '6px',
  border: '1px solid #e9ecef'
};

// Section container styles
export const sectionContainerStyle: CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: 'transparent',
  borderRadius: '6px',
  border: '1px solid #e9ecef'
};

// Divider style
export const dividerStyle: CSSProperties = {
  height: '1px',
  backgroundColor: '#e9ecef',
  margin: '20px 0',
  border: 'none'
};

// Main heading styles
export const mainHeadingStyle: CSSProperties = {
  marginTop: 0,
  marginBottom: '20px',
  color: '#2c3e50',
  fontSize: '1.5rem',
  fontWeight: 500
};