import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function MenuFooter() {
  return (
    <footer className='menuFooter' >
      Made with <FavoriteIcon color='secondary' sx={{ fontSize: 20, pl: .5, pr: .5,  }} /> by Menuverse
    </footer>
  )
}
