import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import * as styles from '../styles/imageCropModal';
import { IMAGE_CROP_CONSTANTS } from '../constants/circularArrangement';

interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageCropped: (croppedImage: string) => void;
}

const ImageCropModal: React.FC<ImageCropModalProps> = ({ isOpen, onClose, onImageCropped }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [isCancelButtonHovered, setIsCancelButtonHovered] = useState(false);
  const [isSaveButtonHovered, setIsSaveButtonHovered] = useState(false);
  const [isFileInputHovered, setIsFileInputHovered] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setImage(null);
      setCrop(undefined);
      setCompletedCrop(null);
    }
  }, [isOpen]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
        };
        img.src = reader.result as string;
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const size = Math.min(width, height);
    const cropSize = size * IMAGE_CROP_CONSTANTS.CROP_SIZE_PERCENTAGE;
    
    const newCrop = centerCrop(
      makeAspectCrop(
        {
          unit: 'px',
          width: cropSize,
          height: cropSize,
        },
        IMAGE_CROP_CONSTANTS.ASPECT_RATIO,
        width,
        height
      ),
      width,
      height
    );
    
    setCrop(newCrop);
  };

  useEffect(() => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
      const image = imgRef.current;
      const canvas = previewCanvasRef.current;
      const crop = completedCrop;

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      // Set canvas dimensions to match the crop size
      canvas.width = crop.width;
      canvas.height = crop.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the cropped image
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      // Apply circular mask
      ctx.globalCompositeOperation = 'destination-in';
      ctx.beginPath();
      ctx.arc(
        crop.width / 2,
        crop.height / 2,
        Math.min(crop.width, crop.height) / 2,
        0,
        2 * Math.PI
      );
      ctx.closePath();
      ctx.fill();
    }
  }, [completedCrop]);

  const handleSave = () => {
    if (previewCanvasRef.current) {
      const dataUrl = previewCanvasRef.current.toDataURL('image/png');
      onImageCropped(dataUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlayStyle}>
      <div style={styles.modalContentStyle}>
        <h2 style={styles.titleStyle}>图片裁剪工具</h2>
        <p style={styles.instructionStyle}>请选择一张图片，然后拖动或调整裁剪框来选择裁剪区域</p>
        
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          style={{
            ...styles.fileInputStyle,
            ...(isFileInputHovered ? styles.fileInputHoverStyle : {})
          }}
          onMouseEnter={() => setIsFileInputHovered(true)}
          onMouseLeave={() => setIsFileInputHovered(false)}
        />
        
        {image && (
          <div>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              circularCrop
              keepSelection
              aspect={1}
            >
              <img
                ref={imgRef}
                src={image.src}
                onLoad={onImageLoad}
                style={styles.imageStyle}
              />
            </ReactCrop>
            
            <div>
              <canvas
                ref={previewCanvasRef}
                style={styles.previewCanvasStyle}
              />
            </div>
          </div>
        )}
        
        {!image && (
          <div style={styles.emptyStateStyle}>
            <p style={styles.emptyStateTextStyle}>请选择一张图片开始裁剪</p>
          </div>
        )}
        
        {/* Action buttons - always visible */}
        <div style={styles.actionButtonContainerStyle}>
          <button
            onClick={onClose}
            style={{
              ...styles.cancelButtonStyle,
              ...(isCancelButtonHovered ? styles.cancelButtonHoverStyle : {})
            }}
            onMouseEnter={() => setIsCancelButtonHovered(true)}
            onMouseLeave={() => setIsCancelButtonHovered(false)}
          >
            取消
          </button>
          <button
            onClick={handleSave}
            disabled={!image}
            style={{
              ...(image ? styles.saveButtonStyle : styles.disabledButtonStyle),
              ...(isSaveButtonHovered && image ? styles.saveButtonHoverStyle : {})
            }}
            onMouseEnter={() => setIsSaveButtonHovered(true)}
            onMouseLeave={() => setIsSaveButtonHovered(false)}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModal;