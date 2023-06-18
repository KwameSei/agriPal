import { useState } from "react"
import { Avatar, Badge, Icon, IconButton, Tooltip } from "@mui/material"
import { Box } from "@mui/system"
import { Mail, Notifications } from "@mui/icons-material"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ContextProvider } from "../stateManagement/context/ContextProvider"
// import { useValue } from "../../stateManagement/context/ContextProvider"
import { useSelector } from 'react-redux';
import { faBell, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import './UserIcons.css'
import UserMenu from "./UserMenu";
import UserTokenCheck from "../../checks/CheckUserToken";
// import { currentUser } from "../stateManagement/context/reducer"

const UserIcons = () => {
  UserTokenCheck()
  const user = useSelector((state) => state.user); // currentUser is the user that is currently logged in

  const [anchorUserMenu, setAnchorUserMenu] = useState(null)  

  // Check if currentUser is null or undefined
  if (!user) {
    return null; // Or you can render a loading spinner or placeholder
  }

  return (
    <Box>
      <IconButton size="large" color="white" className="link">
        <Badge badgeContent={4} color="error">
        <FontAwesomeIcon icon={faEnvelope} className="link" />
        </Badge>
      </IconButton>

      <IconButton size="large" color="white">
        <Badge badgeContent={20} color="error">
          <FontAwesomeIcon icon={faBell} className="link" />
        </Badge>
      </IconButton>

      <Tooltip title="Account settings">
        <IconButton color="inherit" onClick={(e) => setAnchorUserMenu(e.currentTarget)}>  {/* e.currentTarget is the element that the event listener is attached to. */}
          <Avatar sx={{ width: 32, height: 32 }}
            src={user?.imgURL} alt={user?.name}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>
      <UserMenu {...{ anchorUserMenu, setAnchorUserMenu }} />
    </Box>
  )
}

export default UserIcons;