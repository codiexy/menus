import React from 'react'
import MenuHeader from '../components/MenuHeader';
import { PublicLayout } from '../components/layouts';
import MenuTabs from '../components/MenuTabs'

function Menu() {

  return (
    <PublicLayout>
      <MenuHeader />
      <MenuTabs />
    </PublicLayout>

  )
}

export default Menu