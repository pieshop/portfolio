import React from 'react';
import { Box, Heading, Text } from '@radix-ui/themes';
import NavBar from 'containers/NavBar';

const Header: React.FC = () => {
  return (
    <header>
      <Box py="8" style={{ textAlign: 'center' }}>
        <Heading size="8" as="h1">
          Stephen Hamilton{' '}
          <Text size="6" color="gray" weight="regular">
            Interactive Developer
          </Text>
        </Heading>
      </Box>
      <NavBar />
    </header>
  );
};

export default Header;
