import { StyledButtonSecondary } from "./button-secondary.styles";

const ButtonSecondary = () => {
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
      Get demo access
    </StyledButtonSecondary>
  );
};

export default ButtonSecondary;
