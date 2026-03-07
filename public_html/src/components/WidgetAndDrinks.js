import React, { useState, useEffect } from 'react';
import { orderBy, where } from 'firebase/firestore';
import { CircularProgress } from '@mui/material';

import DishCard from './dish/DishCard';
import AddMenuDish from './dish/AddMenuDish';
import { UserAuth } from '../context/AuthContext';
import { MenuDish } from '../classes';

export default function WidgetsAndDrinks() {
  const [dishes, setDishes] = useState([])
  const [isLoading, setIsloading] = useState(false);
  const { user } = UserAuth()

  useEffect(() => {
    (async () => {
      if (user?.uid) {
        setIsloading(true);
        const menuDishClass = new MenuDish();
        const result = await menuDishClass.get([
          orderBy("createdAt", "desc"),
          where('userId', '==', user.uid)
        ]);
        setDishes(result?.data || []);
        setIsloading(false);
      }
    })()
  }, [user?.uid]);

  return (

    <div className="container">
      <div className='addCard'>
        <AddMenuDish tableCollection='WidgetsAndDrinks' />
      </div>
      {
        isLoading ? (
          <CircularProgress sx={{ mt: 5 }} disableShrink />
        ) : (
          <>
            {
              dishes.length ? (
                <>
                  {
                    dishes.map((dish, key) => (<DishCard dish={dish} key={key} collection="WidgetsAndDrinks" />))
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
  );
}
