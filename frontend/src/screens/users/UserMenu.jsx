import React from 'react'
import {ListItemIcon, Menu, MenuItem} from '@mui/material'
import { Logout, Settings } from '@mui/icons-material'
import UserTokenCheck from '../../checks/CheckUserToken'
import Profile from './Profile'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, updateUser } from '../../state' // Update the import statement with the correct path to authSlice

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
    UserTokenCheck()
    const user = useSelector((state) => state.user); // Update the state selector with the correct path to the user state
    const dispatch = useDispatch();
    
    const handleClose = () => {
        setAnchorUserMenu(null)
    }

    return (
        <>
          <Menu
            anchorEl={anchorUserMenu}
            open={Boolean(anchorUserMenu)}
            onClose={handleClose}
            onClick={handleClose}
        >
            {!user.google && (
               <MenuItem
                onClick={() => dispatch(updateProfile({ open: true, file: null, photoURL: user?.photoURL, name: user?.name, email: user?.email }))} // Dispatch the updateProfile action with the correct payload
            >
                <ListItemIcon>
                    <Settings fontSize="small" />
                    Profile
                </ListItemIcon>
                </MenuItem>  
            )}

            <MenuItem
                onClick={() => dispatch(updateUser(null))} // Dispatch the updateUser action with the null payload
            >
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>

        <Profile />
        </>
    )
}

export default UserMenu;
