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
