import React, { isValidElement, ReactElement } from 'react'
import { Tooltip as MaterialTooltip, Zoom } from '@mui/material'
import { Tooltip as JoyTooltip } from '@mui/joy'

// Define a union type for placement
type TooltipPlacement =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end'

interface TooltipImprovedProps {
    children: ReactElement
    text: string
    placement?: TooltipPlacement
    offset?: [number, number]
    useJoy?: boolean
}

export const TooltipImproved: React.FC<TooltipImprovedProps> = ({
    children,
    text,
    placement = 'top',
    offset = [0, 0],
    useJoy = false,
}) => {
    // Ensure children is a valid React element
    if (!isValidElement(children)) {
        console.warn('TooltipImproved: children must be a valid React element')
        return children
    }

    if (useJoy) {
        return (
            <JoyTooltip
                title={text}
                placement={placement}
                sx={{
                    '--Tooltip-offset': `${offset[1]}px`,
                }}
            >
                {children}
            </JoyTooltip>
        )
    }

    return (
        <MaterialTooltip
            title={text}
            arrow
            enterDelay={456}
            placement={placement}
            TransitionComponent={Zoom}
            PopperProps={{
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: offset,
                        },
                    },
                ],
            }}
        >
            {children}
        </MaterialTooltip>
    )
}
