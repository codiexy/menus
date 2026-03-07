
import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SnackbarOpen from "../miscellaneous/SnackBar";

export default function DeleteDish({ id, imageUrl }) {

  const [error, setError] = useState({ status: false, type: "", message: "" });


  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        await deleteDoc(doc(db, "Dishes", id));
        setError({ status: true, type: "success", message: "Dish deleted successfully!" });
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      } catch (error) {
        setError({ status: true, type: "error", message: "Error deleting dish!" });
        throw new Error(error);
      }
    }
  };
  return (
    <div>
      <Button onClick={handleDelete}>
        <DeleteIcon />
        <p>Delete dish</p>
      </Button>
      {
        error.status ?
          <SnackbarOpen
            message={error.message}
            useOpen={() => [error, setError]}
            color={error.type}
          /> :
          ""
      }
    </div>
  );
}

