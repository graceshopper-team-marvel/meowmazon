import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from 'react-pro-sidebar'

import {FaCat, FaUserAlt, FaMoneyCheckAlt} from 'react-icons/fa'
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle
} from 'react-icons/fi'
import {RiPencilLine} from 'react-icons/ri'
import {BiCog} from 'react-icons/bi'

// import 'react-pro-sidebar/dist/css/styles.css'
// import './header.css'

const Header = () => {
  const [menuCollapse] = useState(false)

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem active={true} icon={<FiHome />}>
                <Link to="/home">Home</Link>
              </MenuItem>
              <MenuItem icon={<FaUserAlt />}>
                <Link to="/users">Users</Link>
              </MenuItem>
              <MenuItem icon={<FaCat />}>
                <Link to="/products">Products</Link>
              </MenuItem>
              <MenuItem icon={<FaMoneyCheckAlt />}>
                <Link to="/orders">Orders</Link>
              </MenuItem>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </>
  )
}

export default Header
