import { ShortcutRounded } from "@mui/icons-material";
import { SiteButton } from "../miscellaneous";
import { useTenant } from "@/context/TenantContext";

export function ShareButton(props: any) {
    const { setSnackbar } = useTenant();

    const handleShareClick = async () => {
        try {
            const canvas: any = document.querySelector('canvas'); // get the QR code canvas element0
            const blob: any = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png')); // convert the canvas to a PNG image blob
            const file = new File([blob], 'qrcode.png', { type: 'image/png' }); // create a file object from the blob
            const shareData = { files: [file], title: 'QR code' }; // create the share data object
            if (navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData); // share the QR code using the Web Share API
            } else {
                const qrCanvas: any = document.getElementById('qr-canvas'); // get the image canvas element
                qrCanvas.toBlob(async (blob: any) => { // convert the canvas to a blob
                    const item = new ClipboardItem({ 'image/png': blob }); // create a ClipboardItem object from the blob
                    try {
                        await navigator.clipboard.write([item]);
                        setSnackbar(true, "QR code copied to clipboard !");
                    } catch (error: any) {
                        setSnackbar(true, error.message || "Error copying image to clipboard!");
                    }
                }, 'image/png');
            }
        } catch (error: any) {
            setSnackbar(false, error.message)
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
        </>
    );
}