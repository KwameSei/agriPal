import React, { useState, useRef } from "react";
import { DialogContent, DialogContentText, DialogActions, Button, IconButton, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useValue } from "../../stateManagement/context/ContextProvider";

const ProfileUpdate = () => {
  const { state: { profile, currentUser }, dispatch } = useValue();
  const nameRef = useRef();
  const phoneRef = useRef();
  const cityRef = useRef();
  const districtRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // dispatch({ type: "UPDATE_PROFILE", payload: { ...profile, file } });
      const photoURL = URL.createObjectURL(file);
      dispatch({ type: "UPDATE_PROFILE", payload: { ...profile, photoURL, file } });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>Update your Profile</DialogContentText>
            <>
              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="name"
                label="Name"
                type="text"
                fullWidth
                inputRef={nameRef}
                inputProps={{ minLength: 3, maxLength: 50 }}
                default={currentUser.name}
                required
              />

              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="phone"
                label="Phone Number"
                type="tel"
                fullWidth
                inputRef={phoneRef}
                inputProps={{ minLength: 11, maxLength: 13 }}
                default={currentUser.phone}
                required
              />

              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="city"
                label="City or Town"
                type="text"
                fullWidth
                inputRef={cityRef}
                inputProps={{ minLength: 2, maxLength: 20 }}
                default={currentUser.city}
              />

              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="district"
                label="District"
                type="text"
                fullWidth
                inputRef={districtRef}
                inputProps={{ minLength: 2, maxLength: 20 }}
                default={currentUser.district}
              />

              <TextField
                autoFocus
                margin="dense"
                variant="standard"
                id="address"
                label="Address"
                type="text"
                fullWidth
                inputRef={addressRef}
                inputProps={{ minLength: 2, maxLength: 20 }}
                default={currentUser.address}
              />

              <label htmlFor="profilePicture">
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <Avatar
                  src={profile.photoURL}
                  sx={{ width: 100, height: 100, margin: "0 auto" }}
                />
              </label>

            </>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<Send />}
            disabled={isSubmitting}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </DialogActions>
      </form>
    </div>
  )
}

export default ProfileUpdate;
