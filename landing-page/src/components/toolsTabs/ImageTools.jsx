import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function ImageTools() {


  return (
    <Container component="section" sx={{ mt: 3, display: 'flex', p: { xs: 0 } }}>
      <Grid container  >
        <Grid
          item
          xs={6}
          md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h2" component="h2" gutterBottom
            sx={{ fontSize: { xs: '28px', md: '40px' }}}
          >
            Before
          </Typography>
          <Box
            component="img"
            src="https://res.cloudinary.com/nell1818/image/upload/v1681958435/Untitled_design_47_w6au8i.png"
            alt="call to action"

            sx={{
              width: '100%',
              borderRadius: 1,
              maxWidth: 450,
            }}
          />
        </Grid>

        <Grid item xs={6} md={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            p: { xs: 1.5, md: 0 }
          }} >
          <Typography variant="h2" component="h2" gutterBottom textAlign= 'center'
            sx={{ fontSize: { xs: '28px', md: '40px' }, }}
          >
            After
          </Typography>
          <Grid
            item
            xs={6}
            md={6}
            sx={{ display: 'flex', justifyContent: "center", mb: 1  }}
          >

            <Box
              component="img"
              src="https://res.cloudinary.com/nell1818/image/upload/v1681965511/Untitled_design_48_gpfxhf.png"
              alt="call to action"

              sx={{
                width: '100%',
                borderRadius: 1,
                maxWidth: 200,
                maxHeight: 200,
                mr: { xs: 1, md: 6 },
                borderStyle: 'solid', borderWidth: .2
              }}
            />
            <Box
              component="img"
              src="https://res.cloudinary.com/nell1818/image/upload/v1681964966/White-PhotoRoom_1_newril.png"
              alt="call to action"

              sx={{
                width: '100%',
                borderRadius: 1,
                maxWidth: 200,
                maxHeight: 200,
                borderStyle: 'solid', borderWidth: .2
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            md={6}
            sx={{ display: 'flex', justifyContent: "center"  }}
          >
            <Box
              component="img"
              src="https://res.cloudinary.com/nell1818/image/upload/v1681964971/Food_%EF%B8%8F-PhotoRoom_1_bmeyt6.png"
              alt="call to action"

              sx={{
                width: '100%',
                borderRadius: 1,
                maxWidth: 200,
                maxHeight: 200,
                mr: { xs: 1, md: 6 },
                borderStyle: 'solid', borderWidth: .2
              }}
            />
            <Box
              component="img"
              src="https://res.cloudinary.com/nell1818/image/upload/v1681964974/Minimal_Shop-PhotoRoom_smtfs4.png"
              alt="call to action"

              sx={{
                width: '100%',
                borderRadius: 1,
                maxWidth: 200,
                maxHeight: 200,
                borderStyle: 'solid', borderWidth: .2
              }}
            />
          </Grid>
        </Grid>
      </Grid>

    </Container>
  );
}

export default ImageTools;