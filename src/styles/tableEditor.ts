import type { CSSProperties } from 'react';

// Main container styles
export const tableEditorContainerStyle: CSSProperties = {
  padding: '20px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'
};

// Config panel styles
export const configPanelStyle: CSSProperties = {
  marginBottom: '20px',
  padding: '15px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef'
};

export const configPanelHeadingStyle: CSSProperties = {
  marginTop: 0,
  marginBottom: '15px',
  color: '#495057'
};

export const configRowStyle: CSSProperties = {
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
  alignItems: 'center',
  marginBottom: '15px'
};

export const configButtonsStyle: CSSProperties = {
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap'
};

// Control group styles
export const controlGroupStyle: CSSProperties = {
  marginBottom: '10px'
};

export const controlGroupLabelStyle: CSSProperties = {
  display: 'block',
  marginBottom: '5px'
};

export const controlGroupInputsStyle: CSSProperties = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
};

// Border controls styles
export const borderControlsStyle: CSSProperties = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
};

export const borderControlsLabelStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center'
};

export const borderControlsCheckboxStyle: CSSProperties = {
  marginRight: '5px'
};

export const colorControlStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
};

export const widthControlStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
};

// Button styles
export const resetButtonStyle: CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: '#007bff'
};

export const csvButtonStyle: CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: '#28a745'
};

export const imageButtonStyle: CSSProperties = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: '#17a2b8'
};

// Printable table styles
export const hiddenPrintableTableStyle: CSSProperties = {
  position: 'absolute',
  left: '-9999px',
  top: '-9999px',
  width: '100%'
};

// Table container styles
export const tableContainerStyle: CSSProperties = {
  overflowX: 'auto',
  marginBottom: '20px'
};

// Table base styles
export const tableBaseStyle: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: 'white'
};

// Table header cell styles
export const tableHeaderCellStyle: CSSProperties = {
  padding: '4px',
  backgroundColor: '#f8f9fa',
  fontWeight: 600,
  textAlign: 'center',
  color: '#495057'
};

// Table data cell styles
export const tableDataCellStyle: CSSProperties = {
  padding: '2px',
  verticalAlign: 'top',
  textAlign: 'center'
};

// Printable table header cell styles
export const printableTableHeaderCellStyle: CSSProperties = {
  padding: '8px',
  backgroundColor: '#f8f9fa',
  fontWeight: 600,
  textAlign: 'center',
  color: '#495057'
};

// Printable table data cell styles
export const printableTableDataCellStyle: CSSProperties = {
  padding: '8px',
  verticalAlign: 'top',
  minHeight: '40px',
  height: '40px',
  textAlign: 'center'
};

// Cell content wrapper styles
export const cellContentWrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center'
};

// Image container styles
export const imageContainerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '80px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

// Cell image styles
export const cellImageStyle: CSSProperties = {
  maxWidth: '100%',
  maxHeight: '60px',
  objectFit: 'contain'
};

// Change image button styles
export const changeImageButtonStyle: CSSProperties = {
  position: 'absolute',
  top: '4px',
  right: '4px',
  padding: '4px 8px',
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
};

// Cell textarea styles
export const cellTextareaStyle: CSSProperties = {
  width: '100%',
  minHeight: '40px',
  height: '40px',
  padding: '2px',
  border: '1px solid #ced4da',
  borderRadius: '4px',
  fontFamily: 'inherit',
  fontSize: '12px',
  resize: 'none',
  boxSizing: 'border-box'
};

// Upload image button styles
export const uploadImageButtonStyle: CSSProperties = {
  padding: '4px 8px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
};

// Remove image button styles
export const removeImageButtonStyle: CSSProperties = {
  padding: '4px 8px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
};

// Column header input styles
export const columnHeaderInputStyle: CSSProperties = {
  width: '100%',
  padding: '2px',
  border: '1px solid #ced4da',
  borderRadius: '4px',
  textAlign: 'center',
  fontWeight: 600,
  color: '#495057',
  fontSize: '14px'
};

// Dimension controls styles
export const dimensionControlsStyle: CSSProperties = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
};

// Rows range input styles
export const rowsRangeStyle: CSSProperties = {
  width: '120px'
};

// Input field styles (used for both rows/columns number inputs and border width select)
export const inputFieldStyle: CSSProperties = {
  padding: '4px',
  border: '1px solid #ced4da',
  borderRadius: '4px'
};

// Number input styles
export const numberInputStyle: CSSProperties = {
  width: '60px',
  ...inputFieldStyle
};

// Columns range input styles
export const columnsRangeStyle: CSSProperties = {
  width: '120px'
};

// Border color input styles
export const borderColorInputStyle: CSSProperties = {
  width: '40px',
  height: '24px'
};

// Border width select styles
export const borderWidthSelectStyle: CSSProperties = {
  ...inputFieldStyle
};