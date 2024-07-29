import React, { ReactNode } from "react";
import styles from './Card.module.css'

interface CardProps {
  children: ReactNode;
  padding?: string;
  borderRadius?: string;
  gap?: string;
  className?: string;
  height?: string;
  flex?: string;
  style?: React.CSSProperties; 
  width?: string;  
  border?: string;  
}

const Card: React.FC<CardProps> = ({ 
  children, 
  padding, 
  borderRadius,
  height,
  gap, 
  flex,
  className ,
  style,
  width,
  border,
}) => {
  const cardStyle = {
    style: style || {},  
    width: width || '100%', 
    flex: flex || '0',  
    padding: padding || '1rem',  
    borderRadius: borderRadius || '4px',  
    gap: gap || '0',
    height:height || 'auto',   
    border: border || 'none',
  };

  return (
    <div 
      className={`${styles.card} ${className || ''}`} 
      style={cardStyle}
    >
      {children}
    </div>
  );
};

export default Card;