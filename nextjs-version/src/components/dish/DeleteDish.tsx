
import React from "react";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Dish from "@/classes/Dish";
import { useTenant } from "@/context/TenantContext";
import useFileStorage from "@/lib/useFileStorage";

export default function DeleteDish({ id, imageUrl }: any) {
  const { tenantId, setSnackbar } = useTenant();
  const { unlink } = useFileStorage();


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        const dishClass = new Dish(tenantId)
        await dishClass.delete(id);
        setSnackbar(true, "Dish deleted successfully!");
        await unlink(imageUrl);
      } catch (error) {
        setSnackbar(false, "Error deleting dish!");
      }
    }
  };
  return (
    <div>
      <Button onClick={handleDelete}>
        <DeleteIcon />
        <p>Delete dish</p>
      </Button>
    </div>
  );
}

