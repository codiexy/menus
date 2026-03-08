
import React, { useState } from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Typography } from "@mui/material";

const apiKey: any = ''; // Replace with your API key

function RestaurantMap(props: any) {

    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

    const onMapClick = (mapProps: any, map: any, clickEvent: any) => {
        const latitude = clickEvent.latLng.lat();
        const longitude = clickEvent.latLng.lng();
        setCoordinates({ latitude, longitude });
    };


    const mapStyles = {
        height: '400px',
        width: "500px",
    };

    const defaultCenter = {
        lat: 30.6996, // Latitude of the exact address
        lng: 76.6930 // Replace with your desired longitude
    };


    return (
        <Typography
            component="div"
            className="map_design"
            sx={{
                width: "100%"
            }}
        >
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={10}
                    center={defaultCenter}
                />
            </LoadScript>
        </Typography>
    );
}

export default RestaurantMap;
