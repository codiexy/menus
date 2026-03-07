import Box from '@mui/material/Box';
import { RWebShare } from "react-web-share";
import { BASE_URL } from '../../constants';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FacebookRounded, InsertLinkRounded, SendRounded } from '@mui/icons-material';
import { Paper } from '@mui/material';
import { useTenant } from '@/context/TenantContext';


export default function MenuHeader(props: any) {
  const { tenant } = useTenant();
  const { address1, address2, country, email, isVerified, phone, state, ...other } = props;

  return (
    <>
      <Box sx={{ width: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper sx={{ borderRadius: 6, p: 1 }} elevation={5} >
          <a href={tenant.instagram} target="_blank" rel="noreferrer noopener">
            <InstagramIcon color="disabled" fontSize='large' />
          </a>
          <a href={tenant.facebook} target="_blank" rel="noreferrer noopener">
            <FacebookRounded color="disabled" fontSize='large' sx={{ ml: 2 }} />
          </a>
          <a href={tenant.website} target="_blank" rel="noreferrer noopener">
            <InsertLinkRounded color="disabled" fontSize='large' sx={{ ml: 2 }} />
          </a>
          <RWebShare
            data={{
              text: `${tenant.name} live menu link!`,
              url: `${BASE_URL}hot-dog-kings/menu`,
              title: `${tenant.name} Live Menu`,
            }}
          // onClick={() => console.log("shared successfully!")}
          >
            <span style={{ cursor: "pointer" }}><SendRounded sx={{ ml: 1 }} color="disabled" fontSize='large' /></span>
          </RWebShare>
        </Paper>
      </Box>
    </>
  )
}














