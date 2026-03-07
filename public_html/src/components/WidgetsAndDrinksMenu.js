import React, { useState, useEffect } from 'react'
import { CircularProgress, ImageListItem } from '@mui/material';

import { MenuDish } from '../classes';
import PublicDishCard from './dish/PublicDishCard';

function WidgetsAndDrinksMenu() {
  const [dishes, setDishes] = useState([])
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsloading(true);
      const menuDishClass = new MenuDish('WidgetsAndDrinks');
      const result = await menuDishClass.get();
      if (result.status) {
        setDishes(result?.data || []);
      }
      setIsloading(false);
    })();
  }, []);

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
                    dishes.map((dish, key) => (<PublicDishCard dish={dish} key={key} type="widgets-and-drinks" />))
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

export default WidgetsAndDrinksMenu