import { AddLocationAlt, Event, LocationOn } from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction, Box, Paper, ownerDocument } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import AddEvent from "../../components/Sections/Events/add/AddEvent";
import Events from "../../components/Sections/Events/Events";
import Map from "../../components/Sections/Map/Map";

const Basenav = () => {
  const [value, setValue] = useState(0);
  const ref = useRef();

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0; // Scroll to top when switching between sections
    console.log(ownerDocument)
  }, [value]);

  return (
    <div className="base"> 
      <Box ref={ref}>
        {/* Switching between sections */}
        {{
          0: <Map />,
          1: <Events />,
          2: <AddEvent />
        }[value]
        }
        <Paper
         elevator={3}
         sx={{
          position: 'fixed',
          bottom: 0,
          width:'100%',
          height: '10vh',
          zIndex: 1,
          bgcolor: 'black',
        }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="Map" icon={<LocationOn />} />
            <BottomNavigationAction label="Events" icon={<Event />} />
            <BottomNavigationAction label="Add" icon={<AddLocationAlt />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
};

export default Basenav;