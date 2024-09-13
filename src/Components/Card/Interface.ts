import { ReactNode } from "react"
import { CSSProperties } from "styled-components"

export interface CardProps {
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