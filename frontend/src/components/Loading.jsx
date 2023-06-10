import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useValue } from "../stateManagement/context/ContextProvider";

const Loading = () => {
    const { state: { loading }, } = useValue();

  return (
    <div className="loading">
      <Backdrop
        open={loading} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress sx={{color: "white"}} />
      </Backdrop>
    </div>
  );
};

export default Loading;