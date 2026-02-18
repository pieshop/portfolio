import React from 'react';
import { useAppSelector } from 'store/configureStore';
import { getIsFetching } from 'store/items/itemsSelectors';

const Loader: React.FC = () => {
  const isFetching = useAppSelector(getIsFetching);
  return isFetching ? <div className="loading" /> : null;
};

export default Loader;
