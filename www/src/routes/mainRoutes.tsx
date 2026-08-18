import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import { Box } from '@radix-ui/themes';
import About from '../containers/About';
import Item from '../containers/Item';
import Categories from '../containers/Categories';
import CommodorePlayer from '../containers/CommodorePlayer';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainRoutes: React.FC = () => {
  const location = useLocation();
  const isPlayerRoute = location.pathname.startsWith('/play/commodore/');

  return (
    <>
      {!isPlayerRoute && <Header />}
      <Box flexGrow="1">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route index element={<Navigate to="/about" replace />} />
          <Route path="/play/commodore/:game_id" element={<CommodorePlayer />} />
          <Route path="/:category_id/:client_id/:entry_id" element={<Item />} />
          <Route path="/:category_id/:client_id/:entry_id/archive" element={<Item />} />
          <Route path="/:category_id/:year_id" element={<Categories />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </Box>
      {!isPlayerRoute && <Footer />}
    </>
  );
};

export default MainRoutes;
