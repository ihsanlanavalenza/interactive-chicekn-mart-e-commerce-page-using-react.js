import React from 'react';
import './ImagePlaceholder.css';

const ImagePlaceholder = ({ 
  type = 'chicken', 
  width = 400, 
  height = 300, 
  color = '#FF6B35',
  textColor = '#FFFFFF',
  text = ''
}) => {
  const getEmoji = () => {
    switch(type) {
      case 'broiler': return '🐔';
      case 'kampung': return '🐓';
      case 'telur': return '🥚';
      case 'olahan': return '🍗';
      case 'fillet': return '🥩';
      default: return '🐔';
    }
  };

  const getBackgroundGradient = () => {
    switch(type) {
      case 'broiler': return 'linear-gradient(135deg, #FF6B35, #F7931E)';
      case 'kampung': return 'linear-gradient(135deg, #F7931E, #FFEB3B)';
      case 'telur': return 'linear-gradient(135deg, #FFEB3B, #FFC107)';
      case 'olahan': return 'linear-gradient(135deg, #FF9800, #FF5722)';
      case 'fillet': return 'linear-gradient(135deg, #E91E63, #9C27B0)';
      default: return 'linear-gradient(135deg, #FF6B35, #F7931E)';
    }
  };

  return (
    <div 
      className="image-placeholder"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: getBackgroundGradient(),
        color: textColor
      }}
    >
      <div className="placeholder-content">
        <div className="emoji">{getEmoji()}</div>
        <div className="placeholder-text">{text}</div>
        <div className="quality-badge">Premium Quality</div>
      </div>
    </div>
  );
};

export default ImagePlaceholder;
