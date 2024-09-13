import styles from './Card.module.css'
import { CardProps } from './Interface'

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

    return (
        <div
            className={`${styles.card} ${className || ''}`}
            style={{
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
            }}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default Card