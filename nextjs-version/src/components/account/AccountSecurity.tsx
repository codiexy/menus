import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  // Table,
  // TableHead,
  // TableRow,
  // TableCell,
  // TableBody
} from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { EastRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { updatePassword } from 'firebase/auth';

export const AccountSecuritySettings = (props: any) => {
  const { loginEvents = [] } = props;
  const { user, setSnackbar } = useAuth()
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleEdit = async () => {
    if (password.trim()) {
      await updatePassword(user, password.trim())
        .then(() => {
          setSnackbar(true, 'Password updated successfully.');
          setPassword("");
          setShowPassword(false);
          setIsEditing(false);
        })
        .catch((error: any) => {
          setSnackbar(false, error.message);
        });
    } else {
      setSnackbar(false, "Password is required!");
    }
  };

  return (
    <Stack spacing={4} sx={{ flexGrow: 1, pb: 5, }}>
      <Card>
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
                Change password
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={8}
            >
              <Stack
                alignItems="center"
                direction="row"
                spacing={3}
              >
                <FormControl
                  sx={{ m: 1 }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    disabled={!isEditing}
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    sx={{
                      flexGrow: 1,
                      ...(!isEditing && {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderStyle: 'dotted'
                        }
                      })
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    value={password}
                    label="Password"
                    onChange={(e: any) => setPassword(e.target.value)}
                    placeholder='Enter Password'
                  />
                </FormControl>
                {
                  isEditing ? (
                    <Button variant='outlined' onClick={handleEdit}>Update</Button>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                  )
                }
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <Box sx={{ p: 3, }} >
          <Typography variant="h6">
            Multi Factor Authentication
          </Typography>
        </Box>
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={4}
          >
            <Grid
              xs={12}
              sm={6}
            >
              <Card
                sx={{ height: '100%' }}
                variant="outlined"
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'block',
                      position: 'relative'
                    }}
                  >
                    <Box
                      sx={{
                        '&::before': {
                          backgroundColor: 'error.main',
                          borderRadius: '50%',
                          content: '""',
                          display: 'block',
                          height: 8,
                          left: 4,
                          position: 'absolute',
                          top: 7,
                          width: 8,
                          zIndex: 1
                        }
                      }}
                    >
                      <Typography
                        color="error"
                        sx={{ pl: 3 }}
                        variant="body2"
                      >
                        Off
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{ mt: 1 }}
                    variant="subtitle2"
                  >
                    Authenticator App
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Use an authenticator app to generate one time security codes.
                  </Typography>
                  <Box sx={{ mt: 4 }}>
                    <Button
                      endIcon={(
                        <EastRounded />
                      )}
                      variant="outlined"
                    >
                      Set Up
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid
              sm={6}
              xs={12}
            >
              <Card
                sx={{ height: '100%' }}
                variant="outlined"
              >
                <CardContent>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        '&::before': {
                          backgroundColor: 'error.main',
                          borderRadius: '50%',
                          content: '""',
                          display: 'block',
                          height: 8,
                          left: 4,
                          position: 'absolute',
                          top: 7,
                          width: 8,
                          zIndex: 1
                        }
                      }}
                    >
                      <Typography
                        color="error"
                        sx={{ pl: 3 }}
                        variant="body2"
                      >
                        Off
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{ mt: 1 }}
                    variant="subtitle2"
                  >
                    Text Message
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Use your mobile phone to receive security codes via SMS.
                  </Typography>
                  <Box sx={{ mt: 4 }}>
                    <Button
                      endIcon={(
                        <EastIcon />
                      )}
                      variant="outlined"
                    >
                      Set Up
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <Box sx={{ p: 3, }} >
          <Typography variant="h6">
            Multi Factor Authentication
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
            variant="body2"
          >
            Your recent login activity
          </Typography>

        </Box>

        {/* <Scrollbar>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  Login type
                </TableCell>
                <TableCell>
                  IP Address
                </TableCell>
                <TableCell>
                  Client
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loginEvents.map((event: any) => {
                const createdAt = format(event.createdAt, 'HH:mm a MM/dd/yyyy');

                return (
                  <TableRow
                    key={event.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography variant="subtitle2">
                        {event.type}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="body2"
                      >
                        on {createdAt}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {event.ip}
                    </TableCell>
                    <TableCell>
                      {event.userAgent}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Scrollbar> */}
      </Card>
    </Stack>
  );
};

AccountSecuritySettings.propTypes = {
  loginEvents: PropTypes.array.isRequired
};
