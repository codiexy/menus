import { Grid, Card, Button, TextField, Container, Typography, Paper, Box } from "@mui/material";
import "./form.styles.css";

const Form = () => {
  return (
    <>


      <Container maxWidth="lg" 
        sx={{ 
            backgroundColor: '#5e2791', 
            borderRadius: { xs: 0, md: 3 },
            mt: { xs: 10, md: 17 },
            }}>
        <Card sx={{ mb: 6, backgroundColor: '#5e2791' }}>
          <Typography
            color='text.secondary'
            variant="h1"
            sx={{ display: 'flex', justifyContent: 'center', mb: 0, mt: 5, fontSize: { xs: "38px", sm: "56px", md: "72px" } }}
          >
            Try the demo today!
          </Typography>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            rowSpacing={4}
            sx={{
              padding: {
                xs: "10px 16px",
                sm: "50px 58px",
                md: "50px 25px 50px 25px",
              },

              zIndex: 3,
            }}
          >
            <Grid item xs={12} md={4} sx={{ m: 3 }}>
              <Typography
                variant="h2"
                color="text.secondary"
                sx={{
                  fontWeight: "400",
                  marginBottom: "40px",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                It's just <strong>better.</strong>
              </Typography>
              <Typography variant="subtitle1" sx={{ marginBottom: "40px" }}>
                “For a restaurant, the menu is the face of their business. The core that attracts
                people to their establishment. Our goal is to bring more photos of dishes to menus
                and automate the menu for the restaurant. Our menu software allows restaurant owners
                to provide a better experience to their customers across the internet.”
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                maxWidth="500px"
              >
                <Paper
                  style={{ backgroundColor: "#ffffff" }}

                  elevation={24}
                  sx={{ width: "100%", p: "1rem" }}
                >
                  <Typography
                    variant="subtitle1"
                    color="text.primary"
                    sx={{
                      fontWeight: "400",
                      marginBottom: "5px",
                      textAlign: { xs: "center", md: "left" },
                      textTransform: 'none'
                    }}
                  >
                    Fill out the form below to get access to the demo
                  </Typography>
                  <form
                    autoComplete='off'
                  // onSubmit={handleSubmit}
                  >
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      label="First Name"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      label="Last Name"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      label="Email"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      label="Phone"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      label="Restaurant Name"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      required
                      label="Restaraunt zip code"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                    />
                    <Button
                      color='secondary'
                      fullWidth
                      sx={{ mt: 2, textTransform: 'none', fontSize: '18px', backgroundColor: '#38b6ff' }}
                      variant='contained'
                      type="submit">
                      Get demo access
                    </Button>
                  </form>
                </Paper>
              </Box>
            </Grid>

          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default Form;
