import { ShortcutRounded } from "@mui/icons-material";
import { useState } from "react";
import { SiteButton, SnackBarOpen } from "../miscellaneous";

export function ShareButton(props) {

    const [error, setError] = useState({ status: false, type: "", message: "" });

    const handleShareClick = async () => {
        try {
            const canvas = document.querySelector('canvas'); // get the QR code canvas element0
            const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png')); // convert the canvas to a PNG image blob
            const file = new File([blob], 'qrcode.png', { type: 'image/png' }); // create a file object from the blob
            const shareData = { files: [file], title: 'QR code' }; // create the share data object
            if (navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData); // share the QR code using the Web Share API
            } else {
                const canvas = document.getElementById('qr-canvas'); // get the image canvas element
                canvas.toBlob(async (blob) => { // convert the canvas to a blob
                    const item = new ClipboardItem({ 'image/png': blob }); // create a ClipboardItem object from the blob
                    try {
                        await navigator.clipboard.write([item]);
                        setError({ status: true, type: "success", message: "QR code copied to clipboard !" });
                    } catch (error) {
                        setError({ status: true, type: "error", message: error || "Error copying image to clipboard!" });
                    }
                }, 'image/png');
            }
        } catch (error) {
            throw new Error(error);
        }

    };

    return (
        <>
            <SiteButton
                endIcon={<ShortcutRounded />}
                onClick={handleShareClick}
                disabled={!props.value}
                color='secondary'
                fullWidth
                sx={{ mt: 2, textTransform: 'none', fontSize: '18px', display: "flex" }}
                variant='contained'
                type="button">
                Share
            </SiteButton>
            {
                error.status ?
                    <SnackBarOpen
                        message={error.message}
                        useOpen={() => [error, setError]}
                        color={error.type}
                    /> :
                    ""
            }
        </>
    );
}