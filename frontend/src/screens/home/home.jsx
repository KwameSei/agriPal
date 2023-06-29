import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Timeline from '../../widgets/Timeline';
import PostsWidget from '../../widgets/posts/PostsWidget';
import AllUserPosts from '../../widgets/posts/AllUserPosts';
import Commercials from '../../widgets/commercials/Commercials';
import SuggestedConnections from '../../widgets/users/SuggestedConnections';

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

  const { _id, photoURL } = useSelector((state) => state.user);

  return (
    <div>
      <Box>
        <Box
          width="100%"
          padding="2rem 1%"
          display={isNotMobile ? 'flex' : 'block'}
          justifyContent="space-between"
          alignItems="center"
          gap="0.5rem"
        >
          <Box
            flexBasis={isNotMobile ? '25%' : undefined}
          >
            <Timeline userId={_id} photoURL={photoURL} />
          </Box>
          <Box
            flexBasis={isNotMobile ? '45%' : undefined}
            mt={isNotMobile ? 0 : '1rem'}
          >
            <PostsWidget photoURL={photoURL} />
            <AllUserPosts userId={_id} />
          </Box>
          {isNotMobile && (
          <Box flexBasis="25%" marginRight="2rem">
            <Commercials />
            <SuggestedConnections userId={_id} />
          </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
