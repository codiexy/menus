
import {
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';



import React from 'react'

export default function DeleteAccount() {
  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            md={4}
          >
            <Typography variant="h6">
              Delete Account
            </Typography>
          </Grid>
          <Grid
            xs={12}
            md={8}
          >
            <Stack
              alignItems="flex-start"
              spacing={3}
            >
              <Typography variant="subtitle1">
                Delete your account and all of your source data. This is irreversible.
              </Typography>
              <Button
                color="error"
                variant="contained"
              >
                Delete account
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

