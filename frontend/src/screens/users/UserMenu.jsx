import React from 'react'
import { List, ListItemIcon, Menu, MenuItem} from '@mui/material'
import { useValue } from '../../stateManagement/context/ContextProvider'
import { Logout, Settings } from '@mui/icons-material'
import UserTokenCheck from '../../checks/CheckUserToken'

const UserMenu = ({ anchorUserMenu, setAnchorUserMenu }) => {
    UserTokenCheck()
    const { dispatch, state: {currentUser} } = useValue()
    
    const handleClose = () => {
        setAnchorUserMenu(null)
    }

    const testAuthorization = async() => {
        const url = import.meta.env.VITE_APP_SERVER_URL + '/api/posts'
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${currentUser.token}`
                },
            })
            const data = await response.json()
            console.log(data)

            if(!data.success) {
                if(response.status === 401) {
                    dispatch({ type: 'UPDATE_USER', payload: null })
                    throw new Error(data.message)
                }
                throw new Error(data.message);
            }
        }   catch (error) {
            dispatch({ type: 'UPDATE_NOTIFICATIONS', payload: { open:true ,severity: 'error', message: error.message } })
            console.log(error)
        }
    }

    return (
        <Menu
            anchorEl={anchorUserMenu} // anchorEl is the element that the menu is anchored to. It's the element that the menu will be positioned relative to.
            open={Boolean(anchorUserMenu)}  // open is a boolean that controls whether the menu is displayed.
            onClose={handleClose} // onClose is a callback that is called when the menu is closed.
            onClick={handleClose} // onClick is a callback that is called when a menu item is clicked.
        >
            <MenuItem onClick={testAuthorization}>
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
