// Default values for the circular arrangement
export const DEFAULT_VALUES = {
  CIRCLE_COUNT: 6,
  BORDER_THICKNESS: 1,
  BORDER_COLOR: "#333333",
  SPACING: 10,
  STAGE_WIDTH: 800,
  STAGE_HEIGHT: 600,
  CIRCLE_RADIUS: 30,
  MIN_RADIUS: 100
};

// Connection type defaults
export const CONNECTION_DEFAULT_LIST = [
  {id: 1, color: '#ff0000', thickness: 2, name: '尊い'},
  {id: 2, color: '#ffc400', thickness: 2, name: '比较喜欢'},
  {id: 3, color: '#fbff00', thickness: 2, name: '可以接受'},
  {id: 4, color: '#000000', thickness: 2, name: '雷'},
]
export const CONNECTION_DEFAULTS = {
  INITIAL_COLOR: '#ff0000',
  INITIAL_THICKNESS: 2,
  INITIAL_NAME: '尊い'
};

// Color palette for connection types
export const CONNECTION_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', '#FB5607',
  '#8338EC', '#3A86FF', '#06D6A0', '#118AB2', '#073B4C',
  '#EF476F', '#FFD166', '#073B4C', '#118AB2', '#06D6A0'
];

// Style constants
export const STYLE_CONSTANTS = {
  CONTAINER_MAX_WIDTH: 800
};

// Image crop modal constants
export const IMAGE_CROP_CONSTANTS = {
  CROP_SIZE_PERCENTAGE: 0.8, // 80% of the smaller dimension
  ASPECT_RATIO: 1 // 1:1 for circle
};

// Legend defaults
export const LEGEND_DEFAULTS = {
  FONT_SIZE: 14,
  POSITION_X: 550,
  POSITION_Y: 50,
  MAX_POSITION_X: 750, // DEFAULT_VALUES.STAGE_WIDTH - 50 (800 - 50)
  MAX_POSITION_Y: 550  // DEFAULT_VALUES.STAGE_HEIGHT - 50 (600 - 50)
};