
import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../firebase";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteDish({ id, imageUrl }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        await deleteDoc(doc(db, "Dishes", id));
        toast("Dish deleted successfully", { type: "success" });
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      } catch (error) {
        toast("Error deleting dish", { type: "error" });
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Button onClick={handleDelete}>
      <DeleteIcon/>
      <p>Delete dish</p>
      </Button>
    </div>
  );
}

        