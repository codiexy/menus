import Button from "@mui/material/Button";
import styled from "@emotion/styled";

export const StyledButtonPrimary = styled(Button)({
    borderRadius: "30px",
    padding: "15px 31px",
    backgroundImage: "none",
    transition: "all .3s",
    backgroundColor: '#5e2791',


    "&:hover": {
        backgroundImage:
            "linear-gradient(135deg, #A060FF 0%, #CB30E3 49.21%, #7cc1ec 100%)",
        transition: "all .3s",
    },
});

export const StyledButtonSecondary = styled(Button)({
    borderRadius: "30px",
    padding: "12px 24px",
    borderColor: '#38b6ff',
    fontWeight: '300',
    backgroundColor: '#38b6ff',
    color: 'white',

    "&:hover": {
        backgroundColor: '#5e2791',
        transition: "all .3s",
        borderColor: '#5e2791',
        color: 'white',
        borderWidth: 2,

    },
});

type Props = {
    type?: string
    children: React.ReactNode
}

const CustomButton = (props: Props) => {
    const { type = "primary", children } = props;
    if (type == 'primary') {
        return (
            <StyledButtonPrimary
                variant="contained"
                sx={{ ml: { xs: 8, sm: 0, md: 0 }, }}
            >
                {children}
            </StyledButtonPrimary>
        );
    }
    return (
        <StyledButtonSecondary
            variant="outlined"
            size= 'small'
            sx={{
                fontSize: { xs: "12px", sm: "16px" },
                borderWidth: 2,
                color: '#38b6ff'
                
            }}
        >
            {children}
        </StyledButtonSecondary>
    )
};

export default CustomButton;
