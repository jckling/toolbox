import type { CSSProperties } from 'react';

// Modal overlay styles
export const modalOverlayStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

// Modal content styles
export const modalContentStyle: CSSProperties = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '12px',
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflow: 'auto',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
};

// File input styles
export const fileInputStyle: CSSProperties = {
  marginBottom: '20px',
  padding: '10px',
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderColor: '#cccccc',
  borderRadius: '8px',
  width: '100%',
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  transition: 'all 0.2s ease-in-out',
  boxSizing: 'border-box'
};

// File input hover style
export const fileInputHoverStyle: CSSProperties = {
  borderColor: '#007bff',
  borderWidth: '2px',
  borderStyle: 'solid'
};

// Empty state styles
export const emptyStateStyle: CSSProperties = {
  textAlign: 'center',
  padding: '40px 20px',
  color: '#666666',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '20px 0'
};

// Empty state text styles
export const emptyStateTextStyle: CSSProperties = {
  margin: 0,
  fontSize: '16px'
};

// Action button container styles
export const actionButtonContainerStyle: CSSProperties = {
  marginTop: '30px',
  textAlign: 'right',
  paddingTop: '20px',
  borderTop: '1px solid #eee'
};

// Base button styles
export const baseButtonStyle: CSSProperties = {
  padding: '10px 20px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  cursor: 'pointer',
  marginLeft: '10px',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s ease-in-out'
};

// Cancel button styles
export const cancelButtonStyle: CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: '#f8f9fa',
  color: '#333',
  border: '1px solid #ddd'
};

// Hover effect for cancel button
export const cancelButtonHoverStyle: CSSProperties = {
  backgroundColor: '#e9ecef',
  borderColor: '#adb5bd'
};

// Save button styles
export const saveButtonStyle: CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none'
};

// Hover effect for save button
export const saveButtonHoverStyle: CSSProperties = {
  backgroundColor: '#0069d9'
};

// Disabled button styles
export const disabledButtonStyle: CSSProperties = {
  ...baseButtonStyle,
  backgroundColor: '#f8f9fa',
  color: '#6c757d',
  cursor: 'not-allowed',
  opacity: 0.6
};

// Preview canvas styles
export const previewCanvasStyle: CSSProperties = {
  width: 150,
  height: 150,
  display: 'block',
  margin: '20px auto',
  border: '1px solid #dddddd',
  borderRadius: '50%',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
};

// Image styles
export const imageStyle: CSSProperties = {
  maxWidth: '100%',
  maxHeight: '70vh',
  display: 'block',
  margin: '0 auto'
};

// Title styles
export const titleStyle: CSSProperties = {
  marginTop: 0,
  marginBottom: '20px',
  textAlign: 'center',
  color: '#333333',
  fontSize: '24px',
  fontWeight: '600'
};

// Instruction styles
export const instructionStyle: CSSProperties = {
  fontSize: '16px',
  color: '#666666',
  textAlign: 'center',
  marginBottom: '25px',
  lineHeight: '1.5'
};