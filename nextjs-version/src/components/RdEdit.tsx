import React, { useState } from 'react'
import { Button, TextField, Box, Grid, Typography } from '@mui/material'

export default function RdEdit({
  defaultValue,
  name,
  title,
  type = "text",
  onUpdate = (value: string, name: string) => { }
}: any) {
  const [hide, setHide] = useState(true);
  const [value, setValue] = useState("");

  async function handleUpdate() {
    await onUpdate(value, name);
    setHide(true);
  }

  const changedValue = value.trim() ? value.trim() : defaultValue;

  return (
    <>
      {
        hide ? (
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="accountListItems">
              <Typography variant='h6'>{title}</Typography>
              <Typography>
                {changedValue || "N/A"}
              </Typography>
            </div>

            <Button variant="contained" color="secondary" onClick={() => setHide(false)} >
              Edit
            </Button>
          </div>
        ) : (
          <Box
            sx={{
              maxWidth: '100%',
            }}
          >
            <Typography variant='h6'>{title}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={7}>
                <TextField size='small' fullWidth type={type} value={changedValue} placeholder={title} onChange={(e) => setValue(e.target.value)} />
              </Grid>
              <Grid item xs={5}>
                <Button onClick={handleUpdate} variant='contained' size="small">update</Button>{" "}
                <Button onClick={() => setHide(true)} variant='contained' color="secondary" size="small">Cancel</Button>
              </Grid>
            </Grid>
          </Box>
        )
      }
    </>

  )
}
