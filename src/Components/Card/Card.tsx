import React, { ReactNode, CSSProperties } from 'react'
import styles from './Card.module.css'

interface CardProps {
    children: ReactNode
    padding?: string
    marginTop?: string
    borderRadius?: string
    gap?: string
    className?: string
    height?: string
    flex?: string
    style?: React.CSSProperties
    width?: string
    border?: string
    backgroundColor?: string
    position?: CSSProperties['position'] | undefined
    alignSelf?: string
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Card: React.FC<CardProps> = ({
    children,
    padding,
    borderRadius,
    height,
    gap,
    flex,
    className,
    style,
    width,
    border,
    backgroundColor,
    position,
    alignSelf,
    marginTop,
    onClick,
}) => {
    const cardStyle: CSSProperties = {
        ...style,
        width: width || '100%',
        flex: flex || '0',
        padding: padding || '1rem',
        borderRadius: borderRadius || '4px',
        gap: gap || '0',
        height: height || 'auto',
        border: border || 'none',
        backgroundColor: backgroundColor || '#ffffff',
        position: position || 'static',
        alignContent: alignSelf || 'flex-start',
        marginTop: marginTop || '0',
    }

    return (
        <div
            className={`${styles.card} ${className || ''}`}
            style={cardStyle}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default Card
