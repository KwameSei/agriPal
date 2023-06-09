import React from 'react'
import { List, ListItemIcon, Menu, MenuItem} from '@mui/material'
import { useValue } from '../../stateManagement/context/ContextProvider'
import { Logout, Settings } from '@mui/icons-material'

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
    const {dispatch} = useValue()
    
    const handleClose = () => {
        setAnchorUserMenu(null)
    }

    return (
        <Menu
            anchorEl={anchorUserMenu} // anchorEl is the element that the menu is anchored to. It's the element that the menu will be positioned relative to.
            open={Boolean(anchorUserMenu)}  // open is a boolean that controls whether the menu is displayed.
            onClose={handleClose} // onClose is a callback that is called when the menu is closed.
            onClick={handleClose} // onClick is a callback that is called when a menu item is clicked.
        >
            <MenuItem>
            <ListItemIcon>
                <Settings fontSize="small" />
                Profile
            </ListItemIcon>
            </MenuItem>

            {/* <MenuItem>
            <ListItemIcon>
                <Account fontSize="small" />
            </ListItemIcon>
                My account
            </MenuItem> */}

            <MenuItem
                onClick={() => dispatch({ type: 'UPDATE_USER', payload: null })}
            >
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    )
}

export default UserMenu;
