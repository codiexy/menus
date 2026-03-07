import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const tiers = [
  {
    title: 'Free',
    price: '0',
    description: [
      '10 users included',
      '2 GB of storage',
      'Help center access',
      'Email support',
    ],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];



function PricingContent() {
  return (
    <Box
      sx={{ mb: 16 }}
    >
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          variant="h1"
          sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center', mb: 5, fontSize: { xs: "30px", sm: "45px", md: "55px" } }}
        >
          Pricing that fits your restaurant's budget
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card
              variant='outlined'
                sx={{  borderColor: '#5e2791', borderWith: 14 }}
              >
                <CardHeader
                variant='outlined'
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor:'#5e2791',  borderColor: '#5e2791', borderWith: 2
                  }}
                />
                <CardContent
                  sx={{ backgroundColor: 'white', }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.primary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                      color="text.primary"
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions
                  sx={{ backgroundColor: "#5e2791" }}
                >
          
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </Box>
  );
}

export default function Pricing() {
  return <PricingContent />;
}