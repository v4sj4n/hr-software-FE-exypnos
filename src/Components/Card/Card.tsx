import React, { ReactNode } from "react";
import style from './Card.module.css'

interface CardProps {
  children: ReactNode;
  padding?: string;
  borderRadius?: string;
  gap?: string;
  className?: string;
  height?: string;
  width?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  padding, 
  borderRadius,
  height,
  width,
  gap, 
  className 
}) => {
  const cardStyle = {
    padding: padding || '1rem',  
    borderRadius: borderRadius || '4px',  
    gap: gap || '0',
    height:height || 'auto',  
    width: width || '100%',   
  };

  return (
    <div 
      className={`${style.card} ${className || ''}`} 
      style={cardStyle}
    >
      {children}
    </div>
  );
};

export default Card;