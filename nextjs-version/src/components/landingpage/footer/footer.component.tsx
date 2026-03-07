import { Container, Grid, Typography, Link, Divider } from "@mui/material";
import Image from "next/image";
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer">
      <Container maxWidth="lg" >
        <Grid
          container
          rowSpacing={4}
          justifyContent="center"

        >
          <Grid item xs={3.5}>
            <Image
              src="/MENUUI_6_o6upjt.png"
              height={30}
              width={200}
              alt="logo"
            />
          </Grid>
          {/* <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="body1">Copyright - 2023</Typography>
          </Grid> */}
          <Grid item container xs={12} sm={2} className="social_footer">
            <Grid item xs={4}>
              <Link href="#">
                <AiFillFacebook />
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Link href="#">
                <AiFillInstagram />
              </Link>
            </Grid>
            <Grid item xs={4}>
              <Link href="#">
                <AiFillTwitterCircle />
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography>
              Get in Touch
            </Typography>
            <Typography>
              123 Street, New York, USA
              +012 345 67890
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
            <Typography variant="body1">Copyright - 2023</Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
