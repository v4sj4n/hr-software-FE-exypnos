import React, { ReactNode , CSSProperties} from "react";
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
  backgroundColor?: string; 
  position?: CSSProperties['position'];
  alignSelf?: CSSProperties['alignSelf'];  
  flex? :string;
  width?: string;
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
  backgroundColor,
  position,
  alignSelf
}) => {
  const cardStyle: CSSProperties = {
    ...style,  
    width: width || '100%', 
    flex: flex || '0',  
    padding: padding || '1rem',  
    borderRadius: borderRadius || '4px',  
    gap: gap || '0',
    height:height || 'auto',   
    border: border || 'none',
    backgroundColor: backgroundColor || '#ffffff',
    position: position || 'static',
    alignContent: alignSelf || 'flex-start',
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