import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Box, Container } from '@radix-ui/themes';
import About from '../containers/About';
import Item from '../containers/Item';
import Categories from '../containers/Categories';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainRoutes: React.FC = () => {
  return (
    <Container size="4" align="center">
      <Header />
      <Box flexGrow="1">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route index element={<Navigate to="/about" replace />} />
          <Route path="/:category_id/:client_id/:entry_id" element={<Item />} />
          <Route path="/:category_id/:client_id/:entry_id/archive" element={<Item />} />
          <Route path="/:category_id/:year_id" element={<Categories />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </Box>
      <Footer />
    </Container>
  );
};

export default MainRoutes;
