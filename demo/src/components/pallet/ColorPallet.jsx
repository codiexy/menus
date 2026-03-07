import React, { useState } from 'react';

import {
    Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Button, Tooltip, Grid
} from '@mui/material';
import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { SketchPicker } from 'react-color';
import { useSiteTheme } from '../../context';
import { SiteButton } from '../miscellaneous';
import { ColorLensRounded } from '@mui/icons-material';

export default function ColorPallet() {
    const { useThemeColor } = useSiteTheme();
    const [colors, setColors] = useThemeColor();
    const [isLoading, setIsLoading] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [buttonColors, setButtonColors] = useState(colors?.button || {
        text: "",
        background: "",
        hover: "",
        focus: "",
        border: ""
    })


    const buttonColorsData = [,
        {
            type: "text",
            primary: "Text Color",
            secondary: "Select text color for the button"
        },
        {
            type: "background",
            primary: "Background Color",
            secondary: "Select background color for the button"
        },
        {
            type: "border",
            primary: "Border Color",
            secondary: "Select border color for the button"
        }
    ];

    const handleButtonColorPallet = (state, color) => {
        if (state.popupId) {
            const newButtonColors = buttonColors;
            newButtonColors[state.popupId] = color.hex;
            setButtonColors(newButtonColors);
            setUpdated(!updated);
        }
    }

    const handleSubmitColor = async (event) => {
        setIsLoading(true)
        try {
            event.preventDefault();
            await setColors(buttonColors, "button");
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            throw new Error(error.message)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                mt: 5,
                mx: 8,
                justifyContent: 'flex-start'
            }}
        >

            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                }}
            >
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ColorLensRounded />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Color Pallet" secondary="Adjust button design for your menu." />
                </ListItem>
            </List>
            <Grid
                container
                spacing={2}
                sx={{
                    boxShadow: "0px 0px 8px #8f7a7a",
                    // mx: 2,
                    mt: 2,
                    borderRadius: 6
                }}
            >
                <Grid
                    item
                    xs={12}
                >
                    <List
                        sx={{
                            width: '100%',
                            bgcolor: 'background.paper',
                        }}
                    >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>B</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Button Color Pallet" secondary="Set the button design of whole site." />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={6}
                    sx={{
                        paddingTop: "0px"
                    }}
                >
                    <List
                        sx={{
                            mx: 5,
                            width: "90%",
                            paddingTop: "0px"
                        }}
                    >
                        {
                            buttonColorsData.map((value, key) => {
                                const color = buttonColors[value.type];
                                return (
                                    <ListItem
                                        key={key}
                                        secondaryAction={
                                            <PopupState variant="popover" popupId={value.type}>
                                                {(popupState) => {
                                                    return (
                                                        <div>
                                                            <Tooltip title="Open Color Pallet">
                                                                <Fab
                                                                    {...bindTrigger(popupState)}
                                                                    edge="end"
                                                                    aria-label="color-pallet"
                                                                    color="primary"
                                                                    size="small"
                                                                >
                                                                    <ColorLensRounded />
                                                                </Fab>
                                                            </Tooltip>
                                                            <Popover
                                                                {...bindPopover(popupState)}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'center',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'center',
                                                                }}
                                                            >
                                                                <SketchPicker
                                                                    color={color}
                                                                    onChangeComplete={(color, event) => handleButtonColorPallet(popupState, color, event)}
                                                                />
                                                            </Popover>
                                                        </div>
                                                    )
                                                }}
                                            </PopupState>
                                        }
                                    >
                                        <ListItemText
                                            sx={{
                                                ml: 3
                                            }}
                                            primary={value.primary}
                                            secondary={value.secondary}
                                        />
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <SiteButton buttonColor={buttonColors} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        my: 2,
                        mx: 10,
                        mb: 4
                    }}
                >
                    <SiteButton
                        onClick={handleSubmitColor}
                    >{isLoading ? "loading..." : "Save changes"}</SiteButton>
                </Grid>
            </Grid>
        </Box >
    );
}
