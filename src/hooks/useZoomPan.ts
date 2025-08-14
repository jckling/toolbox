import { useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useZoomPan = () => {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const stage = e.currentTarget;
    const oldScale = scale;
    const pointer = {
      x: e.clientX - stage.getBoundingClientRect().left,
      y: e.clientY - stage.getBoundingClientRect().top,
    };

    const direction = e.deltaY > 0 ? -1 : 1;
    const factor = direction > 0 ? 1.1 : 0.9;
    const newScale = direction > 0 ? oldScale * factor : oldScale / factor;

    // Limit scale range
    if (newScale < 0.5 || newScale > 3) return;

    setScale(newScale);
    
    // Adjust position to zoom towards pointer
    const mousePointTo = {
      x: (pointer.x - position.x) / oldScale,
      y: (pointer.y - position.y) / oldScale,
    };

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    setPosition(newPos);
  }, [scale, position]);

  const handleDragMove = useCallback((e: any) => {
    setPosition({
      x: e.target.x(),
      y: e.target.y(),
    });
  }, []);

  const resetView = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  return {
    scale,
    position,
    handleWheel,
    handleDragMove,
    resetView,
  };
};