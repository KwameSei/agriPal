import React from 'react';
import { useValue } from '../stateManagement/context/ContextProvider';
import { Alert, Snackbar } from '@mui/material';

const Notify = () => {
  const {state: {notify}, dispatch} = useValue();

  const handleNotifyClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: "UPDATE_NOTIFICATIONS", payload: {  ...notify, isOpen: false } });
    console.log('Notify: ', notify);
  }

  return (
    <div>
      <Snackbar
        open={notify.isOpen}
        autoHideDuration={6000}
        onClose={handleNotifyClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key={'top' + 'right'}
        sx={{ backgroundColor: notify.severity === 'success' ? 'green' : 'red' }}
      >
      <Alert
        onClose={handleNotifyClose}
        severity={notify.severity}
        sx={{ width: '100%' }}
        variant='filled'
        elevation={6}
      >
        {notify.message}
      </Alert>      
      </Snackbar>
    </div>
  )
};

export default Notify;