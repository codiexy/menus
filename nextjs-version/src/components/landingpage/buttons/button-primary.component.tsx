import { Button } from "@mui/material";
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

const ButtonPrimary = () => {
  return (
    <StyledButtonPrimary variant="contained" sx={{ ml: { xs: 8, sm: 0, md: 0 }, }} >
      Get demo access
    </StyledButtonPrimary>
  );
};

export default ButtonPrimary;
