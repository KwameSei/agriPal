import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Connection from "../../components/Connection";
import { setConnections } from "../../state";
import "../widgets.css";

const SuggestedConnections = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const connections = useSelector((state) => state.user.connections);

  const fetchConnections = async () => {
    const res = await fetch(
      `http://localhost:5000/api/users/${userId}/connection`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log("Fetched data: ", data || "No data")
    dispatch(setConnections({ connections: data }));
  }

  useEffect(() => {
    fetchConnections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="wrapper">
      <Typography 
        variant="h5"
        style={{ marginBottom: "1rem" }}
        color="#fff"
        fontWeight={600}
      >
        Suggested Connections
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
      >
        {connections.map((connection) => (
          <Connection
            key={connection._id}
            connection={connection}
            connectionId={connection._id}
            name={connection.name}
            subtitle={connection.subtitle}
            picturePath={connection.picturePath}
          />
        ))}
      </Box>
    </div>
  )
};

export default SuggestedConnections;
