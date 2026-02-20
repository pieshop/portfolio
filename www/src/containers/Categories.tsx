import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { getItems } from 'store/items/itemsSelectors';
import { selectCategory, selectYear } from 'store/categories/categoriesActions';
import { getSelectedCategoryMetaData } from 'store/categories/categoriesSelectors';
import Items from 'components/Items';

const Categories: React.FC = () => {
  const { category_id = '', year_id = '' } = useParams<{ category_id: string; year_id: string }>();
  const dispatch = useAppDispatch();
  const items = useAppSelector(getItems) as Array<Record<string, unknown>>;
  const selectedCategoryMetaData = useAppSelector(getSelectedCategoryMetaData);

  useEffect(() => {
    if (category_id) dispatch(selectCategory(category_id) as unknown as { type: string });
    if (year_id) dispatch(selectYear(year_id) as unknown as { type: string });
  }, [category_id, year_id, dispatch]);

  return <Items items={items} selectedCategoryMetaData={selectedCategoryMetaData} />;
};

export default Categories;
