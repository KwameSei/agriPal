import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import UserProfileWidget from '../../widgets/UserProfileWidget';

const Home = () => {
  const isNotMobile = useMediaQuery('(min-width:1000px)');
  const isMobile = useMediaQuery('(max-width:1000px)');
  const isTablet = useMediaQuery('(max-width:768px)');
  const isSmallMobile = useMediaQuery('(max-width:500px)');
  const isExtraSmallMobile = useMediaQuery('(max-width:350px)');
  const isExtraExtraSmallMobile = useMediaQuery('(max-width:300px)');
  const isExtraExtraExtraSmallMobile = useMediaQuery('(max-width:250px)');
  const isExtraExtraExtraExtraSmallMobile = useMediaQuery('(max-width:200px)');
  const isExtraExtraExtraExtraExtraSmallMobile = useMediaQuery('(max-width:150px)');

  const user = useSelector((state) => state.user);
  console.log('This is the user:', user);
  // const { _id, photoURL } = user;

  return (
    <div>
      <Box>
        <Box
          width="100%"
          padding="2rem 3%"
          display={isNotMobile ? 'flex' : 'block'}
          justifyContent="space-between"
          alignItems="center"
          gap="0.5rem"
        >
          <Box
            flexBasis={isNotMobile ? '30%' : undefined}
          >
            {/* <UserProfileWidget userId={_id} photoURL={photoURL} /> */}
          </Box>
          <Box
            flexBasis={isNotMobile ? '45%' : undefined}
            mt={isNotMobile ? 0 : '1rem'}
          ></Box>
          {isNotMobile && <Box flexBasis="28%"></Box>}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
