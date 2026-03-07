
import { useTenant } from "@/context/TenantContext";
import { SxProps, Theme, Typography, TypographyOwnProps, TypographyProps } from "@mui/material";
import React from "react";

// interface Props extends TypographyOwnProps {
//     children?: React.ReactNode;
//     buttonColor?: null | {
//         text: string;
//         background: string;
//         border: string;
//     }
//     sx?: SxProps<Theme>
// }

const SiteButton = ({ children, buttonColor = null, sx = {}, ...props }: any) => {
    const { useThemeColor }: any = useTenant();
    const [colors] = useThemeColor();
    buttonColor = buttonColor ? buttonColor : colors.button;

    return (
        <Typography
            component="span"
            sx={{
                ...sx,
                color: `${buttonColor?.text} !important`,
                backgroundColor: `${buttonColor?.background} !important`,
                border: `2px solid ${buttonColor?.border} !important`,
                py: 1,
                px: 1,
                borderRadius: 3,
                cursor: "pointer",
                textAlign: "center"
            }}
            {...props}
        >
            {children ? children : "Button Design"}
        </Typography>
    )
}

export default SiteButton;