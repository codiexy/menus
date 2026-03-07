import { Grid, Card, Button, TextField, Container, Typography, Paper, Box } from "@mui/material";
import { useState } from "react";
import { useMenuverse } from "@/context/MenuverseContext";
import RequestTenant from "@/classes/RequestTenant";
import { useTenant } from "@/context/TenantContext";

const defaultFormData = {
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  restaurantname: "",
  zipcode: ""
}

const Form = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { setSnackbar } = useMenuverse();
  const { tenantId } = useTenant();


  const handleChange = (event: any) => {
    let value = event.target.value;
    let name = event.target.name;
    setFormData((prevalue) => {
      return {
        ...prevalue,
        [name]: value
      }
    })
  }

  const resetForm = () => {
    setFormData(defaultFormData);
    setIsLoading(false);
  }

  const handleSubmit = async () => {
    try {
      if (!formData.firstname) {
        setSnackbar(false, "First name must be required!");
        return;
      }

      if (!formData.lastname) {
        setSnackbar(false, "Last name must be required!");
        return;
      }
      if (!formData.email) {
        setSnackbar(false, "Email  must be required!");
        return;
      }
      if (!formData.phonenumber) {
        setSnackbar(false, "Phone number must be required!");

        return;
      }
      if (!formData.restaurantname) {
        setSnackbar(false, "Restaurantname name must be required!");
        return;
      }
      if (!formData.zipcode) {
        setSnackbar(false, "Zipcode must be required!");
        return;
      }
      setIsLoading(true);
      const reqTenantClass = new RequestTenant(tenantId);
      const result: any = await reqTenantClass.insert(formData);
      if (result.status) {
        resetForm();
      }
      setIsLoading(false);
      setSnackbar(true, result.message);
    } catch (error: any) {
      setSnackbar(false, error.message);
    }

  }

  return (
    <div id="get_demo_acces">
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
                It&lsquo;s just <strong>better.</strong>
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
                      type="text"
                      name="firstname"
                      margin="normal"
                      fullWidth
                      required
                      label="First Name"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                      value={formData.firstname}
                      onChange={handleChange}
                    />
                    <TextField
                      type="text"
                      name="lastname"
                      margin="normal"
                      fullWidth
                      required
                      label="Last Name"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                      value={formData.lastname}
                      onChange={handleChange}
                    />
                    <TextField
                      type="email"
                      name="email"
                      margin="normal"
                      fullWidth
                      required
                      label="Email"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <TextField
                      type="number"
                      name="phonenumber"
                      margin="normal"
                      fullWidth
                      required
                      label="Phone"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                      value={formData.phonenumber}
                      onChange={handleChange}
                    />
                    <TextField
                      type="text"
                      name="restaurantname"
                      margin="normal"
                      fullWidth
                      required
                      label="Restaurant Name"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                      value={formData.restaurantname}
                      onChange={handleChange}
                    />
                    <TextField
                      type="text"
                      name="zipcode"
                      margin="normal"
                      fullWidth
                      required
                      label="Restaraunt zip code"
                      InputLabelProps={{
                        sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
                      }}
                      value={formData.zipcode}
                      onChange={handleChange}
                    />
                    {
                      isLoading ? (
                        <Button
                          disabled
                          color='secondary'
                          fullWidth
                          sx={{ mt: 2, textTransform: 'none', fontSize: '18px', backgroundColor: '#38b6ff' }}
                          variant='contained'
                        >Loading
                        </Button>
                      ) : (

                        <Button
                          color='secondary'
                          fullWidth
                          sx={{ mt: 2, textTransform: 'none', fontSize: '18px', backgroundColor: '#38b6ff' }}
                          variant='contained'
                          onClick={handleSubmit}
                        >
                          Get demo access
                        </Button>
                      )}
                  </form>
                </Paper>
              </Box>
            </Grid>

          </Grid>
        </Card>
      </Container>
    </div>
  );
};

export default Form;