import React, { CSSProperties } from 'react'
import { ButtonTypes } from '../ButtonTypes'



type ButtonType = (typeof ButtonTypes)[keyof typeof ButtonTypes]

export interface ButtonStyles extends CSSProperties {
    backgroundColor?: string
    color?: string
    borderColor?: string
    width?: string | number
    height?: string | number
    fontSize?: string | number
    padding?: string
    margin?: string
    borderRadius?: string | number
}

export interface ButtonProps extends ButtonStyles {
    isSubmit?: boolean
    type: ButtonType
    btnText: string | JSX.Element
    disabled?: boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    icon?: React.ReactNode
    cursor?: string
}