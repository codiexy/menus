import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonSecondary from './buttons/button-secondary.component';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};


function ProductHowItWorks() {
  return (
    <Container
      sx={{
        mt: { xs: 10, md: 17 },
        backgroundColor: '#f3ede7;',
        borderRadius: { xs: 0, md: 3 },
      }}
    >
      <Box
        component="section"
        maxWidth='lg'
        sx={{
          display: 'flex',
        }}
      >
        <Container
          sx={{
            mt: 10,
            mb: 8,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography
            variant="h1"
            maxWidth='md'
            sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mb: 8, mt: 1, fontSize: { xs: "38px", sm: "56px", md: "56px" } }}
          >
            Adding photos with Menuverse is easy as...
          </Typography>
          <div>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Box sx={item}>

                  <Box
                    component="img"
                    src="https://res.cloudinary.com/nell1818/image/upload/v1678696372/Untitled_design_27_nkumi0.png"
                    alt="1"
                    sx={{ height: 110, mb: 2 }}
                  />
                  <Typography variant="h3" align="center">
                    {'Send us your menu'}

                  </Typography>
                  <Typography align="center" sx={{ mt: 2 }} >
                    {'We will add your menu items for you. '}
                    {'After menu creation, you will be contacted.'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={item}>

                  <Box
                    component="img"
                    src="https://res.cloudinary.com/nell1818/image/upload/v1678696375/Untitled_design_28_oyidwg.png"
                    alt="graph"
                    sx={{ height: 110, mb: 2 }}
                  />
                  <Typography variant="h3" align="center">
                    {'Start adding photos'}

                  </Typography>
                  <Typography align="center" sx={{ mt: 2 }} >
                    {'Take or upload pictures of your menu items through your mobile friendly dashboard.'}
                    {''}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box
                    component="img"
                    src="https://res.cloudinary.com/nell1818/image/upload/v1678696376/Untitled_design_29_mkjtxg.png"
                    alt="clock"
                    sx={{ height: 110, mb: 2 }}
                  />
                  <Typography variant="h3" align="center" >
                    {'Share everywhere'}

                  </Typography>
                  <Typography align="center" sx={{ mt: 2 }} >
                    {'Sharing is caring. Your Menuverse framework will do the rest. '}
                    {'Let the interactivity begin!'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
          <Box
            sx={{ mt: 8 }}
          >
            <ButtonSecondary />
          </Box>
        </Container>
      </Box>
    </Container>
  );
}

export default ProductHowItWorks;