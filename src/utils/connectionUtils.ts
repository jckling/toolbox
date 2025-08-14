import { CONNECTION_COLORS } from '../constants/circularArrangement';

/**
 * Generates a random color for a new connection type
 * @param existingColors - Array of colors already in use
 * @returns A hex color string
 */
export const generateRandomColor = (existingColors: string[]): string => {
  // Normalize existing colors to lowercase for comparison
  const normalizedExistingColors = existingColors.map(color => color.toLowerCase());
  
  // Find available colors from our palette
  const availableColors = CONNECTION_COLORS.filter(color => 
    !normalizedExistingColors.includes(color.toLowerCase())
  );
  
  // If we have available colors from the palette, use one
  if (availableColors.length > 0) {
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  } else {
    // If all palette colors are used, generate a random hex color
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }
};