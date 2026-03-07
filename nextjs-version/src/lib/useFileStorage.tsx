import { useState } from 'react';
import { v4 } from "uuid";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { trim } from '@/helper';
import { storage } from '@/firebase';
import { useTenant } from '@/context/TenantContext';

function useFileStorage(basePath: string = "") {
    const { tenantId, setSnackbar } = useTenant();
    const [fileLoading, setFileLoading] = useState(false);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);

    basePath = trim(basePath, "/");
    const path: string = `/${tenantId}/${basePath ? `${basePath}/` : ""}`;

    const handleUpload = async (file: any, another: string = "", callback: Function = () => { }) => {
        setFileLoading(true)
        another = trim(another, "/");
        const storageRef = ref(storage, `${path}${another ? `${another}/` : ""}${file.name + v4()}`);
        const uploadImage = uploadBytesResumable(storageRef, file);

        uploadImage.on(
            "state_changed",
            (snapshot) => {
                const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progressPercent > 0 ? progressPercent : 0);
            },
            (error) => {
                setSnackbar(false, error.message)
                setError(error.message);
                setFileLoading(false);
                setProgress(0);
            },
            async () => {
                const url = await getDownloadURL(uploadImage.snapshot.ref)
                    .then((url) => {
                        setFileLoading(false)
                        setProgress(0);
                        return url;
                    }).catch((error: any) => {
                        setProgress(0);
                        setError(error.message);
                        setSnackbar(false, error.message)
                        setFileLoading(false)
                        return "";
                    });
                if (url && typeof callback == "function") {
                    await callback(url)
                }
            }
        );
    }

    const handleDelete = async (url: string) => {
        try {
            const storageRef = ref(storage, url);
            await deleteObject(storageRef);
            setSnackbar(true, "File deleted successfully!")
        } catch (error: any) {
            setSnackbar(false, error.message)
        }
    }


    return {
        loading: fileLoading,
        error,
        upload: handleUpload,
        unlink: handleDelete,
        progress
    }
}

export default useFileStorage;
