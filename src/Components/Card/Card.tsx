import React, { ReactNode } from "react";
import style from './Card.module.css'

interface CardProps {
  children: ReactNode;
  padding?: string;
  borderRadius?: string;
  gap?: string;
  className?: string;
  height?: string;
  flex? :string;
  width?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  padding, 
  borderRadius,
  height,
  gap, 
  className ,
  flex
}) => {
  const cardStyle = {
    padding: padding || '1rem',  
    borderRadius: borderRadius || '4px',  
    gap: gap || '0',
    height:height || 'auto',  
    flex: flex || '1 1 0%'  
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