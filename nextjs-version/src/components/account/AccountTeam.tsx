import React, { useState } from 'react';
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
import { MailRounded, MoreHorizRounded } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';


export default function AccountTeam() {

  const [email, setEmail] = useState("")
  const { user, sendLoginLinkToEmail } = useAuth();

  const handleInviteLink = async () => {
    await sendLoginLinkToEmail(email);
  }

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
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button variant="contained" sx={{ textTransform: 'none' }} onClick={handleInviteLink}>
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
                  <Image src={user.photoURL ? user.photoURL : "/user-avatar.png"} alt="User Profile Pic" height={50} width={50} />
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
