import React, { useState } from 'react'
import { Button, TextField, Box, Grid } from '@mui/material'
import { updateDoc } from 'firebase/firestore';
import SnackbarOpen from './miscellaneous/SnackBar';

export default function RdEdit({ docRef, defaultValue, name, title, type = "text" }) {
  const [hide, setHide] = useState(true);
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState({ status: false, type: "", message: "" });

  async function handleUpdate() {
    await updateDoc(docRef, {
      [name]: value
    });
    setError({ status: true, type: "success", message: `${title.replace('Edit ', '')} updated successfully!` });
    setHide(true);
  }

  if (hide) {
    return (
      <Button variant="contained" color="grey" onClick={() => setHide(false)} >
        Edit
      </Button>
    )
  }

  return (
    <>
      <Box
        sx={{
          maxWidth: '100%',
        }}
      >
        <h3>{title}</h3>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField size='small' type={type} value={value} placeholder={title} onChange={(e) => setValue(e.target.value)} />
          </Grid>
          <Grid item xs={5}>
            <Button onClick={handleUpdate} variant='contained' size="small">update</Button>{" "}
            <Button onClick={() => setHide(true)} variant='contained' color="grey" size="small">Cancel</Button>
          </Grid>
        </Grid>
      </Box>
      {
        error.status ?
          <SnackbarOpen
            message={error.message}
            useOpen={() => [error, setError]}
            color={error.type}
          /> :
          ""
      }
    </>

  )
}
