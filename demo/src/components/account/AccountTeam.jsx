import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Scrollbar } from '../miscellaneous/scrollbar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { MailRounded, MoreHorizRounded } from '@mui/icons-material';


export default function AccountTeam() {
  const { user } = UserAuth();

  return (
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
          <Stack spacing={1}>
            <Typography variant="h6">
              Invite members
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              You currently pay for 2 Editor Seats.
            </Typography>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          md={8}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={3}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailRounded />
                  </InputAdornment>
                )
              }}
              label="Email address"
              name="email"
              sx={{ flexGrow: 1 }}
              type="email"
            />
            <Button variant="contained" sx={{ textTransform: 'none' }} >
              Send Invite
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </CardContent>
    <Scrollbar>
      <Table sx={{ minWidth: 400 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              Member
            </TableCell>
            <TableCell>
              Status
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow>
              <TableCell>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
              <Avatar sx={{ width: 50, height: 50 }}>
                  <img src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={50} width={50} />
                </Avatar>
                  <div>
                    <Typography variant="subtitle2">
                    {user.name}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      {user.email}
                    </Typography>
                  </div>
                </Stack>
              </TableCell>
              <TableCell>
               {user.status}
              </TableCell>
              <TableCell align="right">
                <IconButton>
                <MoreHorizRounded />
                </IconButton>
              </TableCell>
            </TableRow>
  
        </TableBody>
      </Table>
    </Scrollbar>
  </Card>
  )
}
