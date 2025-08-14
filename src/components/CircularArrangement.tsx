import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Group, Circle, Image as KonvaImage, Line, Rect, Text } from 'react-konva';
import { useZoomPan } from '../hooks/useZoomPan';
import ImageCropModal from './ImageCropModal';
import { DEFAULT_VALUES, CONNECTION_DEFAULTS, LEGEND_DEFAULTS, CONNECTION_DEFAULT_LIST } from '../constants/circularArrangement';
import { generateRandomColor } from '../utils/connectionUtils';
import * as styles from '../styles/circularArrangement';

interface CircleData {
  id: number;
  imageUrl?: string;
}

const CircularArrangement: React.FC = () => {
  const [circles, setCircles] = useState<CircleData[]>([]);
  const [n, setN] = useState<number>(DEFAULT_VALUES.CIRCLE_COUNT);
  const [borderThickness, setBorderThickness] = useState<number>(DEFAULT_VALUES.BORDER_THICKNESS);
  const [borderColor, setBorderColor] = useState<string>(DEFAULT_VALUES.BORDER_COLOR);
  const [spacing, setSpacing] = useState<number>(DEFAULT_VALUES.SPACING);
  const [selectedCircleId, setSelectedCircleId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<{[key: number]: HTMLImageElement}>({});

  // Logo state
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [logoPosition, setLogoPosition] = useState({ x: 20, y: 20 });
  const [logoScale, setLogoScale] = useState(1);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  
  // Connection states
  const [connectionTypes, setConnectionTypes] = useState<Array<{id: number, color: string, thickness: number, name: string}>>(CONNECTION_DEFAULT_LIST);
  const [selectedConnectionType, setSelectedConnectionType] = useState<number>(1);
  const [connections, setConnections] = useState<Array<{id: number, from: number, to: number, type: number}>>([]);
  const [tempConnection, setTempConnection] = useState<{from: number} | null>(null);
  const [selectedConnectionId, setSelectedConnectionId] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState<{x: number, y: number} | null>(null);
  
  // Legend states
  const [legendFontSize, setLegendFontSize] = useState<number>(LEGEND_DEFAULTS.FONT_SIZE);
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [legendX, setLegendX] = useState<number>(LEGEND_DEFAULTS.POSITION_X);
  const [legendY, setLegendY] = useState<number>(LEGEND_DEFAULTS.POSITION_Y);
  
  // Reset legend to default values
  const resetLegend = () => {
    setLegendFontSize(LEGEND_DEFAULTS.FONT_SIZE);
    setLegendX(LEGEND_DEFAULTS.POSITION_X);
    setLegendY(LEGEND_DEFAULTS.POSITION_Y);
  };
  
  const stageRef = useRef<any>(null);

  const { scale, position, handleWheel, handleDragMove, resetView } = useZoomPan();

  // Calculate positions when n changes
  useEffect(() => {
    const newCircles = Array.from({ length: n }, (_, i) => ({
      id: i,
      imageUrl: undefined
    }));
    setCircles(newCircles);
  }, [n]);

  // Load images when URLs change
  useEffect(() => {
    const loadImage = (id: number, url: string) => {
      const image = new window.Image();
      image.src = url;
      image.onload = () => {
        setImages(prev => ({
          ...prev,
          [id]: image
        }));
      };
    };

    circles.forEach(circle => {
      if (circle.imageUrl && !images[circle.id]) {
        loadImage(circle.id, circle.imageUrl);
      }
    });
  }, [circles, images]);

  // Load logo image when URL changes
  useEffect(() => {
    if (logoImage) {
      const image = new window.Image();
      image.src = logoImage;
      image.onload = () => {
        setLogoImg(image);
      };
    } else {
      setLogoImg(null);
    }
  }, [logoImage]);

  // Handle circle click
  const handleCircleClick = (id: number) => {
    // If we're in connection mode (tempConnection exists and is not null), handle connection logic
    if (tempConnection !== null) {
      // If we haven't selected the first circle yet (-1 indicates connection mode but no circle selected)
      if (tempConnection.from === -1) {
        // Set the first circle for connection
        setTempConnection({from: id});
        return;
      }
      
      // If clicking the same circle, cancel connection
      if (tempConnection.from === id) {
        setTempConnection({from: -1}); // Back to connection mode without a selected circle
        setMousePosition(null); // Clear mouse position when cancelling
        return;
      }
      
      // Create connection between tempConnection.from and id
      const newConnectionId = connections.length > 0 ? Math.max(...connections.map(c => c.id)) + 1 : 1;
      setConnections([
        ...connections,
        {id: newConnectionId, from: tempConnection.from, to: id, type: selectedConnectionType}
      ]);
      setTempConnection({from: -1}); // Back to connection mode without a selected circle
      setMousePosition(null); // Clear mouse position after creating connection
    } else {
      // Normal circle click - open image modal
      setSelectedCircleId(id);
      setIsModalOpen(true);
    }
  };

  // Handle image crop
  const handleImageCropped = (croppedImageUrl: string) => {
    if (selectedCircleId !== null) {
      setCircles(prev => 
        prev.map(circle => 
          circle.id === selectedCircleId 
            ? { ...circle, imageUrl: croppedImageUrl } 
            : circle
        )
      );
    }
    setIsModalOpen(false);
  };

  // Calculate X position for circle in circular arrangement
  const calculateX = (index: number, total: number) => {
    const centerX = DEFAULT_VALUES.STAGE_WIDTH / 2;
    // Dynamic radius calculation based on number of circles and spacing
    // At spacing=0, circles should be tangent (distance between centers = 2 * circle radius)
    const circleRadius = DEFAULT_VALUES.CIRCLE_RADIUS;
    const minDistance = 2 * circleRadius; // Minimum distance between circle centers
    const baseRadius = Math.max(
      minDistance / (2 * Math.sin(Math.PI / total)),
      DEFAULT_VALUES.MIN_RADIUS
    );
    const radius = baseRadius + spacing;
    const angle = (2 * Math.PI * index) / total;
    return centerX + radius * Math.cos(angle);
  };
  
  // Get circle position
  const getCirclePosition = (id: number) => {
    const circle = circles.find(c => c.id === id);
    if (!circle) return { x: 0, y: 0 };
    return {
      x: calculateX(circle.id, n),
      y: calculateY(circle.id, n)
    };
  };

  // Calculate Y position for circle in circular arrangement
  const calculateY = (index: number, total: number) => {
    const centerY = DEFAULT_VALUES.STAGE_HEIGHT / 2;
    // Dynamic radius calculation based on number of circles and spacing
    // At spacing=0, circles should be tangent (distance between centers = 2 * circle radius)
    const circleRadius = DEFAULT_VALUES.CIRCLE_RADIUS;
    const minDistance = 2 * circleRadius; // Minimum distance between circle centers
    const baseRadius = Math.max(
      minDistance / (2 * Math.sin(Math.PI / total)),
      DEFAULT_VALUES.MIN_RADIUS
    );
    const radius = baseRadius + spacing;
    const angle = (2 * Math.PI * index) / total;
    return centerY + radius * Math.sin(angle);
  };

  // Download functionality
  const handleDownload = () => {
    const stage = stageRef.current;
    if (stage) {
      // Hide all circles temporarily for export
      const layers = stage.getLayers();
      if (layers.length > 0) {
        const layer = layers[0];
        const background = layer.findOne('Rect'); // Get the white background
        
        if (background) {
          // Temporarily make background visible for export
          background.show();
          layer.batchDraw();
        }
        
        // Export the stage
        const dataURL = stage.toDataURL();
        
        // Trigger download
        const link = document.createElement('a');
        link.download = 'circular-arrangement.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: '20px',
      width: '100%'
    }}>
      {/* Controls */}
      <div style={{
        ...styles.controlPanelStyle,
        width: '40%',
        maxHeight: '900px',
        overflowY: 'auto'
      }}>
        <h2 style={styles.mainHeadingStyle}>
          控制面板
        </h2>
        
        {/* Basic Settings Section */}
        <div style={styles.unifiedPanelStyle}>
          <h3 style={styles.sectionHeadingStyle}>
            基本设置
          </h3>
          <div style={styles.controlGroupStyle}>
            <div>
              <label style={styles.labelStyle}>
                圆圈数量: {n}
              </label>
              <input
                type="range"
                value={n}
                onChange={(e) => setN(parseInt(e.target.value))}
                min="3"
                max="20"
                style={styles.inputRangeStyle}
              />
            </div>
            
            <div>
              <label style={styles.labelStyle}>
                边框粗细: {borderThickness}px
              </label>
              <input
                type="range"
                value={borderThickness}
                onChange={(e) => setBorderThickness(parseFloat(e.target.value))}
                min="0.5"
                max="5"
                step="0.5"
                style={styles.inputRangeStyle}
              />
            </div>
            
            <div>
              <label style={styles.labelStyle}>
                边框颜色:
              </label>
              <input
                type="color"
                value={borderColor}
                onChange={(e) => setBorderColor(e.target.value)}
                style={styles.colorInputStyle}
              />
            </div>
            
            <div>
              <label style={styles.labelStyle}>
                间距: {spacing}px
              </label>
              <input
                type="range"
                value={spacing}
                onChange={(e) => setSpacing(parseInt(e.target.value))}
                min="0"
                max="200"
                style={styles.inputRangeStyle}
              />
            </div>
          </div>
        </div>
        
        
        {/* Legend Controls */}
        <div style={styles.unifiedPanelStyle}>
          <h3 style={styles.sectionHeadingStyle}>
            图例设置
          </h3>
          <div style={styles.legendControlGroupStyle}>
            <label style={styles.labelStyle}>
              <input
                type="checkbox"
                checked={showLegend}
                onChange={(e) => setShowLegend(e.target.checked)}
              />
              显示图例
            </label>
            <div>
              <label style={styles.labelStyle}>
                字体大小: {legendFontSize}px
              </label>
              <input
                type="range"
                value={legendFontSize}
                onChange={(e) => setLegendFontSize(parseInt(e.target.value))}
                min="10"
                max="30"
                style={styles.inputRangeStyle}
              />
            </div>
            
            <div>
              <label style={styles.labelStyle}>
                位置X: {legendX}px
              </label>
              <input
                type="range"
                value={legendX}
                onChange={(e) => setLegendX(parseInt(e.target.value))}
                min="0"
                max={LEGEND_DEFAULTS.MAX_POSITION_X}
                style={styles.inputRangeStyle}
              />
            </div>
            
            <div>
              <label style={styles.labelStyle}>
                位置Y: {legendY}px
              </label>
              <input
                type="range"
                value={legendY}
                onChange={(e) => setLegendY(parseInt(e.target.value))}
                min="0"
                max={LEGEND_DEFAULTS.MAX_POSITION_Y}
                style={styles.inputRangeStyle}
              />
            </div>
            
            <div>
              <button
                onClick={resetLegend}
                style={styles.enhancedButtonStyle}
              >
                重置图例
              </button>
            </div>
          </div>
        </div>
        
        
        {/* Connection Modification Controls */}
        {selectedConnectionId !== null && (
          <div style={styles.unifiedPanelStyle}>
            <h3 style={styles.sectionHeadingStyle}>
              连接修改
            </h3>
            <div style={styles.connectionModifyContainerStyle}>
              <span>修改连接:</span>
              <select
                value={connections.find(c => c.id === selectedConnectionId)?.type || selectedConnectionType}
                onChange={(e) => {
                  setConnections(connections.map(conn =>
                    conn.id === selectedConnectionId
                      ? {...conn, type: parseInt(e.target.value)}
                      : conn
                  ));
                }}
                style={styles.connectionModifySelectStyle}
              >
                {connectionTypes.map(ct => (
                  <option key={ct.id} value={ct.id}>{ct.name}</option>
                ))}
              </select>
              <button
                onClick={() => {
                  setConnections(connections.filter(conn => conn.id !== selectedConnectionId));
                  setSelectedConnectionId(null);
                }}
                style={{
                  ...styles.enhancedButtonStyle,
                  backgroundColor: '#dc3545'
                }}
              >
                删除连接
              </button>
              <button
                onClick={() => setSelectedConnectionId(null)}
                style={{
                  ...styles.enhancedButtonStyle,
                  backgroundColor: '#6c757d'
                }}
              >
                取消选择
              </button>
            </div>
          </div>
        )}
        
        {/* Connection Type Management */}
        <div style={styles.unifiedPanelStyle}>
          <h3 style={styles.sectionHeadingStyle}>
            连接设置
          </h3>
          
          {/* Connection Types List */}
          <div style={styles.connectionTypeListStyle}>
            {connectionTypes.map((connType) => (
              <div
                key={connType.id}
                onClick={() => setSelectedConnectionType(connType.id)}
                style={styles.getConnectionTypeItemStyle(selectedConnectionType === connType.id)}
              >
                <div
                  style={{
                    ...styles.connectionColorSwatchStyle,
                    backgroundColor: connType.color
                  }}
                />
                <span>{connType.name}</span>
              </div>
            ))}
            
            {/* Add new connection type */}
            <button
              onClick={() => {
                const newId = connectionTypes.length > 0 ? Math.max(...connectionTypes.map(c => c.id)) + 1 : 1;
                // Generate a random color for the new connection type
                const existingColors = connectionTypes.map(ct => ct.color);
                const newColor = generateRandomColor(existingColors);
                
                setConnectionTypes([
                  ...connectionTypes,
                  {id: newId, color: newColor, thickness: CONNECTION_DEFAULTS.INITIAL_THICKNESS, name: `连接${newId}`}
                ]);
              }}
              style={{
                ...styles.enhancedButtonStyle,
                backgroundColor: '#28a745'
              }}
            >
              添加连接
            </button>
          </div>
          
          {/* Selected Connection Type Settings */}
          {(() => {
            const selectedType = connectionTypes.find(ct => ct.id === selectedConnectionType);
            if (!selectedType) return null;
            
            return (
              <div style={styles.connectionSettingsContainerStyle}>
                <input
                  type="text"
                  value={selectedType.name}
                  onChange={(e) => {
                    setConnectionTypes(connectionTypes.map(ct =>
                      ct.id === selectedConnectionType
                        ? {...ct, name: e.target.value}
                        : ct
                    ));
                  }}
                  placeholder="连接名称"
                  style={styles.connectionNameInputStyle}
                />
                <input
                  type="color"
                  value={selectedType.color}
                  onChange={(e) => {
                    setConnectionTypes(connectionTypes.map(ct =>
                      ct.id === selectedConnectionType
                        ? {...ct, color: e.target.value}
                        : ct
                    ));
                  }}
                  style={styles.connectionColorInputStyle}
                />
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={selectedType.thickness}
                  onChange={(e) => {
                    setConnectionTypes(connectionTypes.map(ct =>
                      ct.id === selectedConnectionType
                        ? {...ct, thickness: parseInt(e.target.value)}
                        : ct
                    ));
                  }}
                  style={styles.connectionThicknessSliderStyle}
                />
                <span>{selectedType.thickness}px</span>
                
                <button
                  onClick={() => {
                    if (connectionTypes.length > 1) {
                      setConnectionTypes(connectionTypes.filter(ct => ct.id !== selectedConnectionType));
                      // Select the first available connection type
                      if (connectionTypes.length > 1) {
                        setSelectedConnectionType(connectionTypes.filter(ct => ct.id !== selectedConnectionType)[0].id);
                      }
                    }
                  }}
                  disabled={connectionTypes.length <= 1}
                  style={{
                    ...styles.enhancedButtonStyle,
                    backgroundColor: '#dc3545',
                    opacity: connectionTypes.length > 1 ? 1 : 0.5,
                    cursor: connectionTypes.length > 1 ? 'pointer' : 'not-allowed'
                  }}
                >
                  删除
                </button>
              </div>
            );
          })()}
        </div>
        
        {/* Logo Controls */}
        <div style={styles.unifiedPanelStyle}>
          <h3 style={styles.sectionHeadingStyle}>
            Logo设置
          </h3>
          <div style={styles.controlGroupStyle}>
            <div>
              <button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setLogoImage(event.target.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }}
                style={styles.enhancedButtonStyle}
              >
                上传Logo
              </button>
              
              {logoImage && (
                <button
                  onClick={() => {
                    setLogoImage(null);
                  }}
                  style={{
                    ...styles.enhancedButtonStyle,
                    backgroundColor: '#dc3545',
                    marginLeft: '10px'
                  }}
                >
                  移除Logo
                </button>
              )}
            </div>
            
            {logoImage && (
              <>
                <div>
                  <label style={styles.labelStyle}>
                    位置 X: {logoPosition.x}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="800"
                    value={logoPosition.x}
                    onChange={(e) => {
                      setLogoPosition((prev: { x: number; y: number }) => ({ ...prev, x: parseInt(e.target.value) }));
                    }}
                    style={styles.inputRangeStyle}
                  />
                </div>
                
                <div>
                  <label style={styles.labelStyle}>
                    位置 Y: {logoPosition.y}px
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="600"
                    value={logoPosition.y}
                    onChange={(e) => {
                      setLogoPosition((prev: { x: number; y: number }) => ({ ...prev, y: parseInt(e.target.value) }));
                    }}
                    style={styles.inputRangeStyle}
                  />
                </div>
                
                <div>
                  <label style={styles.labelStyle}>
                    缩放: {logoScale.toFixed(2)}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={logoScale}
                    onChange={(e) => {
                      setLogoScale(parseFloat(e.target.value));
                    }}
                    style={styles.inputRangeStyle}
                  />
                </div>
                
                <div>
                  <label style={styles.labelStyle}>
                    透明度: {Math.round(logoOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={logoOpacity}
                    onChange={(e) => {
                      setLogoOpacity(parseFloat(e.target.value));
                    }}
                    style={styles.inputRangeStyle}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Top Buttons, Instructions and Canvas */}
      <div style={{
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Top Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #e9ecef'
        }}>
          <button
            onClick={handleDownload}
            style={styles.enhancedButtonStyle}
          >
            下载图像
          </button>
          
          <button
            onClick={resetView}
            style={styles.enhancedButtonStyle}
          >
            重置视图
          </button>
          
          {/* Mode Toggle Button */}
          <div style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setTempConnection(null)}
              style={{
                ...styles.enhancedButtonStyle,
                ...(tempConnection === null ? { backgroundColor: '#007bff' } : {})
              }}
            >
              图片模式
            </button>
            {/* <button
              onClick={() => setTempConnection({from: -1})} // -1 indicates we're in connection mode but haven't selected a circle yet
              style={{
                ...styles.enhancedButtonStyle,
                ...(tempConnection !== null ? { backgroundColor: '#007bff' } : {})
              }}
            >
              连线模式
            </button> */}
          </div>
        </div>
        
        {/* Instructions */}
        <div style={styles.instructionsPanelStyle}>
          <p style={styles.instructionsTextStyle}>提示：滚动鼠标滚轮可缩放，拖拽可移动画布，点击圆圈可上传图片。</p>
        </div>
        
        {/* Konva Canvas */}
        <div
          style={{
            ...styles.canvasWrapperStyle(tempConnection),
            flex: 1
          }}
        >
        <Stage
          ref={stageRef}
          width={DEFAULT_VALUES.STAGE_WIDTH}
          height={DEFAULT_VALUES.STAGE_HEIGHT}
          scaleX={scale}
          scaleY={scale}
          x={position.x}
          y={position.y}
          onDragMove={handleDragMove}
          draggable
          onWheelCapture={handleWheel}
          onMouseMove={(e) => {
            if (tempConnection !== null && tempConnection.from !== -1) {
              const stage = e.target.getStage();
              if (stage) {
                const pos = stage.getPointerPosition();
                if (pos) {
                  setMousePosition({
                    x: (pos.x - position.x) / scale,
                    y: (pos.y - position.y) / scale
                  });
                }
              }
            }
          }}
          onMouseLeave={() => {
            if (tempConnection !== null && tempConnection.from !== -1) {
              setMousePosition(null);
            }
          }}
        >
          <Layer>
            {/* White background for downloads */}
            <Rect
              x={0}
              y={0}
              width={DEFAULT_VALUES.STAGE_WIDTH}
              height={DEFAULT_VALUES.STAGE_HEIGHT}
              fill="white"
            />
            
            {/* Render connections */}
            {connections.map((connection) => {
              const fromPos = getCirclePosition(connection.from);
              const toPos = getCirclePosition(connection.to);
              const connType = connectionTypes.find(ct => ct.id === connection.type);
              
              if (!connType) return null;
              
              return (
                <Line
                  key={connection.id}
                  points={[fromPos.x, fromPos.y, toPos.x, toPos.y]}
                  stroke={connType.color}
                  strokeWidth={connType.thickness}
                  lineCap="round"
                  lineJoin="round"
                  onClick={(e) => {
                    e.cancelBubble = true;
                    setSelectedConnectionId(connection.id);
                  }}
                  strokeEnabled={selectedConnectionId !== connection.id}
                  shadowColor={selectedConnectionId === connection.id ? "#007bff" : "transparent"}
                  shadowBlur={selectedConnectionId === connection.id ? 10 : 0}
                />
              );
            })}
            
            {/* Render temporary connection */}
            {tempConnection !== null && tempConnection.from !== -1 && mousePosition && (
              <Line
                points={[
                  calculateX(tempConnection.from, n),
                  calculateY(tempConnection.from, n),
                  mousePosition.x,
                  mousePosition.y
                ]}
                stroke={connectionTypes.find(ct => ct.id === selectedConnectionType)?.color || '#000000'}
                strokeWidth={connectionTypes.find(ct => ct.id === selectedConnectionType)?.thickness || 2}
                lineCap="round"
                lineJoin="round"
                dash={[5, 5]}
              />
            )}
            
            {circles.map((circle) => (
              <Group
                key={circle.id}
                x={calculateX(circle.id, n)}
                y={calculateY(circle.id, n)}
                onClick={() => handleCircleClick(circle.id)}
              >
                {/* Selection indicator */}
                {(tempConnection !== null && tempConnection.from === circle.id) && (
                  <Circle
                    radius={35}
                    stroke="#007bff"
                    strokeWidth={3}
                    dash={[5, 5]}
                  />
                )}
                
                <Circle
                  radius={DEFAULT_VALUES.CIRCLE_RADIUS}
                  stroke={borderColor}
                  strokeWidth={borderThickness}
                  fill={circle.imageUrl ? undefined : "#f0f0f0"}
                />
                {images[circle.id] && (
                  <KonvaImage
                    image={images[circle.id]}
                    width={60}
                    height={60}
                    x={-30}
                    y={-30}
                    clipFunc={(ctx: CanvasRenderingContext2D) => {
                      ctx.arc(0, 0, 30, 0, Math.PI * 2);
                    }}
                  />
                )}
                {/* Plus icon for empty circles */}
                {!circle.imageUrl && (
                  <>
                    {/* Horizontal line of plus sign */}
                    <Line
                      points={[-10, 0, 10, 0]}
                      stroke="#666"
                      strokeWidth={2}
                    />
                    {/* Vertical line of plus sign */}
                    <Line
                      points={[0, -10, 0, 10]}
                      stroke="#666"
                      strokeWidth={2}
                    />
                  </>
                )}
              </Group>
            ))}

            {/* Render legend */}
            {showLegend && connectionTypes.length > 0 && (
              <Group x={legendX} y={legendY}>
                {connectionTypes.map((connType, index) => (
                  <Group key={connType.id} y={index * (legendFontSize + 10)}>
                    {/* Color block */}
                    <Rect
                      x={0}
                      y={0}
                      width={legendFontSize}
                      height={legendFontSize}
                      fill={connType.color}
                      stroke="#000"
                      strokeWidth={1}
                    />
                    {/* Description text */}
                    <Text
                      x={legendFontSize + 8}
                      y={0}
                      text={connType.name}
                      fontSize={legendFontSize}
                      fill="#000"
                    />
                  </Group>
                ))}
              </Group>
            )}
            
            {/* Render logo */}
            {logoImg && (
              <Group
                x={logoPosition.x}
                y={logoPosition.y}
                scaleX={logoScale}
                scaleY={logoScale}
                opacity={logoOpacity}
              >
                <KonvaImage
                  image={logoImg}
                  width={logoImg.width}
                  height={logoImg.height}
                  x={-logoImg.width / 2}
                  y={-logoImg.height / 2}
                />
              </Group>
            )}
          </Layer>
        </Stage>
      </div>
    </div>
      
      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImageCropped={handleImageCropped}
      />
    </div>
  );
};

export default CircularArrangement;