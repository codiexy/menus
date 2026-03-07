
import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import MuiDialog from '@mui/material/Dialog'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiAutocomplete from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom'
import { Icon, Tooltip } from '@mui/material'
import { Dish } from '../../classes'
import { orderBy } from 'firebase/firestore'
import { SearchRounded } from '@mui/icons-material'



// ** Styled Autocomplete component
const Autocomplete = styled(MuiAutocomplete)(({ theme }) => ({
  '& fieldset': {
    border: 0
  },
  '& + .MuiAutocomplete-popper': {
    '& .MuiAutocomplete-listbox': {
      // paddingTop: icon,
      height: '100%',
      maxHeight: 'inherit',
      '& .MuiListSubheader-root': {
        top: 0,
        fontWeight: 400,
        lineHeight: '15px',
        fontSize: '0.75rem',
        letterSpacing: '1px',
        color: theme.palette.text.disabled
      }
    },
    '& .MuiAutocomplete-paper': {
      border: 0,
      height: '100%',
      borderRadius: 0,
      boxShadow: 'none'
    },
    '& .MuiListItem-root.suggestion': {
      padding: 0,
      '& .MuiListItemSecondaryAction-root': {
        display: 'flex'
      },
      '&.Mui-focused.Mui-focusVisible, &:hover': {
        backgroundColor: theme.palette.action.hover
      },
      '& .MuiListItemButton-root: hover': {
        backgroundColor: 'transparent'
      },
      '&:not(:hover)': {
        '& .MuiListItemSecondaryAction-root': {
          display: 'none'
        },
        '&.Mui-focused, &.Mui-focused.Mui-focusVisible:not(:hover)': {
          '& .MuiListItemSecondaryAction-root': {
            display: 'flex'
          }
        },
        [theme.breakpoints.down('sm')]: {
          '&.Mui-focused:not(.Mui-focusVisible) .MuiListItemSecondaryAction-root': {
            display: 'none'
          }
        }
      }
    },
    '& .MuiAutocompiconlete-noOptions': {
      display: 'grid',
      minHeight: '100%',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(10)
    }
  }
}))

// ** Styled Dialog component
const Dialog = styled(MuiDialog)({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(4px)'
  },
  '& .MuiDialog-paper': {
    overflow: 'hidden',
    '&:not(.MuiDialog-paperFullScreen)': {
      height: '100%',
      maxHeight: 550
    }
  }
})

const DefaultSuggestions = ({ dishesData }) => {

  return (
    <Grid sx={{ ml: 0 }}>
      <Typography variant='h5'>All Dishes</Typography>
      {dishesData.length ? (
        <>
          {dishesData.map((item, index) => (
            <Grid item xs={12} sm={12} key={index}>
              <List sx={{ py: 1 }}>
                <ListItem sx={{ py: 0 }} disablePadding>
                  <Link to={`/hot-dog-kings/menu/${item.id}`} style={{ textDecoration: "none", cursor: "pointer", color: "#4458BE" }}>
                    <Typography variant='body2'  >
                      {item.name}
                    </Typography>
                  </Link>
                </ListItem>
              </List>
            </Grid>
          ))}
        </>
      ) : ""}
    </Grid>
  )
}

const DishSearch = ({ hidden }) => {
  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const [options, setOptions] = useState([])
  const [dishesData, setDishesData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      const dishClass = new Dish();
      const resultPublish = await dishClass.getPublishDish([
        orderBy("createAt")
      ]);
      setDishesData(resultPublish);
      setOptions(resultPublish)
      setIsloading(false);
    })();
  }, []);

  // ** Hooks & Vars
  const theme = useTheme()
  const navigate = useNavigate()
  // const { layout } = settings
  const wrapper = useRef(null)
  const fullScreenDialog = useMediaQuery(theme.breakpoints.down('sm'))



  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Handle click event on a list item in search result
  const handleOptionClick = (obj) => {
    setSearchValue('')
    setOpenDialog(false)
    if (obj) {
      navigate(`/hot-dog-kings/menu/${obj.id}`)
    }
  }


  if (!isMounted) {
    return null
  } else {
    return (
      <Box
        ref={wrapper}
        onClick={() => !openDialog && setOpenDialog(true)}
        sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
      >
        <Tooltip title="search menu">
          <IconButton color='inherit' sx={ !hidden ? { mr: 0.5, ml: -2.75 } : { mt: 1 }} className='search_icon'>
              <SearchRounded style={{ color: 'GrayText' }} />
          </IconButton>
        </Tooltip>
        {openDialog && (
          <Dialog fullWidth open={openDialog} fullScreen={fullScreenDialog} onClose={() => setOpenDialog(false)}>
            <Box sx={{ top: 0, width: '100%', position: 'sticky' }}>
              <Autocomplete
                autoHighlight
                disablePortal
                options={options}
                id='appBar-search'
                isOptionEqualToValue={() => true}
                onInputChange={(event, value) => setSearchValue(value)}
                onChange={(event, obj) => handleOptionClick(obj)}
                // noOptionsText={<NoResult value={searchValue} setOpenDialog={setOpenDialog} />}
                getOptionLabel={option => option.name || ''}
                sx={{
                  '& + .MuiAutocomplete-popper': {
                    ...(searchValue.length
                      ? {
                        overflow: 'auto',
                        maxHeight: 'calc(100vh - 69px)',
                        borderTop: `1px solid ${theme.palette.divider}`,
                        height: fullScreenDialog ? 'calc(100vh - 69px)' : 481,
                        '& .MuiListSubheader-root': { p: theme.spacing(3.75, 6, 0.75) }
                      }
                      : {
                        '& .MuiAutocomplete-listbox': { pb: 0 }
                      })
                  }
                }}
                renderInput={(params) => {
                  return (
                    <TextField
                      placeholder='dishes search...'
                      {...params}
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                      inputRef={input => {
                        if (input) {
                          if (openDialog) {
                            input.focus()
                          } else {
                            input.blur()
                          }
                        }
                      }}
                      InputProps={{
                        ...params.InputProps,
                        sx: { p: `${theme.spacing(3.75, 6)} !important`, '&.Mui-focused': { boxShadow: 0 } },
                        startAdornment: (
                          <InputAdornment position='start' sx={{ color: 'text.primary' }}>
                            <SearchIcon />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment
                            position='end'
                            onClick={() => setOpenDialog(false)}
                            sx={{ display: 'flex', cursor: 'pointer', alignItems: 'center' }}
                          >
                            {!hidden ? <Typography sx={{ mr: 2.5, color: 'text.disabled' }}>[esc]</Typography> : null}
                            <IconButton size='small' sx={{ p: 1 }}>
                              <Icon icon='tabler:x' fontSize='1.25rem' />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )
                }} />
            </Box>
            {searchValue.length === 0 ? (
              <Box
                sx={{
                  p: 10,
                  display: 'grid',
                  overflow: 'auto',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTop: `1px solid ${theme.palette.divider}`,
                  height: fullScreenDialog ? 'calc(100vh - 69px)' : '100%'
                }}
              >
                <DefaultSuggestions setOpenDialog={setOpenDialog} dishesData={dishesData} />
              </Box>
            ) : null}
          </Dialog>
        )}
      </Box>
    )
  }
}

export default DishSearch
