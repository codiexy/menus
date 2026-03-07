import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';



export default function BasicStack() {
  return (
    <Box sx={{ width: '100%', pl:4, pr:4}}>
      <Stack spacing={3} height={10}>
          <Accordion >
          <AccordionSummary
          expandIcon={<AddOutlinedIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{pt:2, pb:2}} variant='h6' fontWeight={700}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
          </Accordion>
          <Accordion>
          <AccordionSummary
          expandIcon={<AddOutlinedIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{pt:2, pb:2}} variant='h6' fontWeight={700}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
          </Accordion>
          <Accordion>
          <AccordionSummary
          expandIcon={<AddOutlinedIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{pt:2, pb:2}} variant='h6' fontWeight={700}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
          </Accordion>
          <Accordion>
          <AccordionSummary
          expandIcon={<AddOutlinedIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{pt:2, pb:2}} variant='h6' fontWeight={700}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
          </Accordion>
          <Accordion>
          <AccordionSummary
          expandIcon={<AddOutlinedIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{pt:2, pb:2}} variant='h6' fontWeight={700}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
          </Accordion>
          <Accordion>
          <AccordionSummary
          expandIcon={<AddOutlinedIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{pt:2, pb:2}} variant='h6' fontWeight={700}>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
          </Accordion>
        
      </Stack>
    </Box>
  );
}
