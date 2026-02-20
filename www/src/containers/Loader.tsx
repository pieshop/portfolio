import React from 'react';
import { Flex, Spinner } from '@radix-ui/themes';
import { useAppSelector } from 'store/configureStore';
import { getIsFetching } from 'store/items/itemsSelectors';

const Loader: React.FC = () => {
  const isFetching = useAppSelector(getIsFetching);
  return isFetching ? (
    <Flex style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(255,255,255,0.75)', zIndex: 1000 }} align="center" justify="center">
      <Spinner size="3" />
    </Flex>
  ) : null;
};

export default Loader;
