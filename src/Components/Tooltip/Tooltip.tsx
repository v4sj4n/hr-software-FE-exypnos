import { Tooltip, Zoom } from "@mui/material";
import { isValidElement, ReactNode } from "react";

interface TooltipImprovedProps {
  children: ReactNode;
  text: string;
  placement?:
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start";
  offset?: [number, number];
}

export const TooltipImproved: React.FC<TooltipImprovedProps> = ({
  children,
  text,
  placement = "top",
  offset = [0, 0],
}) => {
  if (!isValidElement(children)) {
    return null;
  }

  return (
    <Tooltip
      title={text}
      arrow
      enterDelay={456}
      placement={placement}
      TransitionComponent={Zoom}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: offset,
              },
            },
          ],
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
