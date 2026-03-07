import { Button } from "@mui/material";
import styled from "@emotion/styled";

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

const ButtonSecondary = () => {

  const handleScroll = () => {
    const element = document.getElementById('get_demo_acces'); // Replace 'elementId' with the actual ID of the element you want to scroll to
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth', // To make it a smooth scroll
      });
    }
  };

  return (
    <StyledButtonSecondary
      variant="outlined"
      size='small'
      sx={{
        fontSize: { xs: "12px", sm: "16px" },
        borderWidth: 2,
        color: '#38b6ff'

      }}
      onClick={handleScroll}
    >
      Get demo access
    </StyledButtonSecondary>
  );
};

export default ButtonSecondary;
