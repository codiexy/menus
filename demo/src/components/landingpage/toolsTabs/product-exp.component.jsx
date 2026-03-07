import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function ProductCTA() {


  return (
    <Container component="section" sx={{ mt: 3, display: 'flex', p: { xs: 0 } }}>
      <Grid container sx={{ m: 0 }} >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/nell1818/image/upload/v1681978543/Menu_2_u5idqb.png"
            alt="call to action"

            sx={{
              width: '100%',
              borderRadius: 2
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 1,
              px: 1,
              borderRadius: 1,
              backgroundColor: 'white'
            }}
          >
            <Box component="form"
              sx={{
                maxWidth: 400,
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center'
              }}>
              <Typography variant="h2" component="h2" gutterBottom textAlign='center'
                sx={{ fontSize: { xs: '28px', md: '40px' } }}
              >
                Your menu everywhere diners are searching
              </Typography>
              <Typography variant='subtitle2' textAlign='center' color='grey'
                sx={{ fontSize: { xs: '18px', md: '22px' }, mb: 1}} >
                With the traffic from search sites, our platform powers your menu to have it's own reviews, comments, shares and likes.
              </Typography>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <Box
                  component="img"
                  src="https://res.cloudinary.com/nell1818/image/upload/v1678724225/Untitled_design_36_x3ijsc.png"
                  alt="call to action"
                  sx={{
                    maxWidth: 150,
                  }}
                />
              </Container>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </Container>
  );
}

export default ProductCTA;