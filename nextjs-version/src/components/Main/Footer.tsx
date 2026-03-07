import { Container, Grid, Typography, Link, Divider } from "@mui/material";
import Image from "next/image";
// import "./footer.styles.css";

const Footer = () => {
    return (
        <footer className="footer">
            <Container maxWidth="lg" >
                <Divider variant="middle" sx={{ mb: 6 }} />
                <Grid
                    container
                    rowSpacing={4}
                    sx={{
                        justifyContent: { xs: "center", sm: "space-between" },
                    }}
                >
                    <Grid item xs={3.5}>
                        <Image
                            src="/MENUUI_6_o6upjt.png"
                            height={30}
                            width={200}
                            alt="Menuverse - Footer Logo"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: "center" }}>
                        <Typography variant="body1">Copyright - 2023</Typography>
                    </Grid>
                    <Grid item container xs={8} sm={2} sx={{ textAlign: "center" }}>
                        <Grid item xs={4}>
                            <Link href="#">
                                <Image
                                    src="/assets/icon-facebook.svg"
                                    height={25}
                                    width={25}
                                    alt="Menuverse - Facebook Logo"
                                />
                                {/* <Facebook /> */}
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link href="#">
                                <Image
                                    src="/assets/icon-instagram.svg"
                                    height={25}
                                    width={25}
                                    alt="Menuverse - Instagram Logo"
                                />
                                {/* <Twitter /> */}
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link href="#">
                                <Image
                                    src="/assets/icon-twitter.svg"
                                    height={25}
                                    width={25}
                                    alt="Menuverse - Twitter Logo"
                                />
                                {/* <Instagram /> */}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
};

export default Footer;
