import { Button } from "@mui/material";
import styled from "@emotion/styled";

export const StyledButtonLogin = styled(Button)({
  borderRadius: "30px",
  backgroundImage: "none",
  transition: "all .3s",
  backgroundColor: 'white',
  fontWeight: '700',
  borderWidth: 2,
  color: '#5e2791',
  borderColor: '#5e2791',


  "&:hover": {
    backgroundColor: '#5e2791',
    transition: "all .3s",
    borderColor: '#5e2791',
    color: 'white',
    borderWidth: 2,
    
  },
});
