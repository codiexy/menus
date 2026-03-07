import React, { useState, useEffect } from 'react'
import { ImageListItem, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import PublicDishCard from './dish/PublicDishCard';
import { MenuDish } from '../classes';

function AssemblyLineMenu() {
  const [dishes, setDishes] = useState([])
  const [isLoading, setIsloading] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    (async () => {
      setIsloading(true);
      const menuDishClass = new MenuDish("AssemblyLine");
      const result = await menuDishClass.getAllByUsername(username);
      if (result.status) {
        setDishes(result?.data || []);
      }
      setIsloading(false);
    })();
  }, [username]);

  return (
    <div className="container">
      <ImageListItem key="Subheader" cols={3}></ImageListItem>
      {
        isLoading ? (
          <CircularProgress sx={{ mt: 5 }} disableShrink />
        ) : (
          <>
            {
              dishes.length ? (
                <>
                  {
                    dishes.map((dish, key) => (<PublicDishCard dish={dish} key={key} type="assembly-line" />))
                  }
                </>
              ) : (
                <div>No Dish Found</div>
              )
            }
          </>
        )
      }
    </div>

  )
}

export default AssemblyLineMenu