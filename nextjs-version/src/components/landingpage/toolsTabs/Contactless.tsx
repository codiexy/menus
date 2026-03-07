import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Contactless() {


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
            src="https://res.cloudinary.com/nell1818/image/upload/v1681974729/Untitled_design_51_rknmjv.png"
            alt="call to action"

            sx={{

              width: '100%',
              maxHeight: 430,
              borderRadius: 1
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
                sx={{ fontSize: { xs: '18px', md: '22px' }, mb: 4, }}>
                With the traffic from search sites, our platform powers your menu to have it&lsquo;s own reviews, comments, shares and likes.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </Container>
  );
}

export default Contactless;