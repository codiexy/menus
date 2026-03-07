import { Typography } from "@mui/material";
import { useTenant } from "@/context/TenantContext";


const SiteButtonOutlined = ({ children, buttonColor = null, sx = {}, ...props }: any) => {
    const { useThemeColor } = useTenant();
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
                px: 2,
                borderRadius: 10,
                cursor: "pointer"
            }}
            {...props}
        >
            {children ? children : "Button Design"}
        </Typography>
    )
}

export default SiteButtonOutlined;