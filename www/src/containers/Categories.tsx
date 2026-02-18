import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'store/configureStore';
import { getItems } from 'store/items/itemsSelectors';
import { selectCategory, selectYear } from 'store/categories/categoriesActions';
import { getSelectedCategoryMetaData, getSelectedState } from 'store/categories/categoriesSelectors';
import Items from 'components/Items';

const Categories: React.FC = () => {
  const { category_id = '', year_id = '' } = useParams<{ category_id: string; year_id: string }>();
  const dispatch = useAppDispatch();
  const items = useAppSelector(getItems) as Array<Record<string, unknown>>;
  const selectedCategoryMetaData = useAppSelector(getSelectedCategoryMetaData);
  const { selectedCategory, selectedYear } = useAppSelector(getSelectedState);

  const prevCategoryRef = useRef(selectedCategory);
  const prevYearRef = useRef(selectedYear);

  useEffect(() => {
    if (category_id) dispatch(selectCategory(category_id) as unknown as { type: string });
    if (year_id) dispatch(selectYear(year_id) as unknown as { type: string });
  }, []);

  useEffect(() => {
    if (category_id && category_id !== prevCategoryRef.current) {
      dispatch(selectCategory(category_id) as unknown as { type: string });
      prevCategoryRef.current = category_id;
    }
    if (year_id && year_id !== prevYearRef.current) {
      dispatch(selectYear(year_id) as unknown as { type: string });
      prevYearRef.current = year_id;
    }
  }, [category_id, year_id, dispatch]);

  return <Items items={items} selectedCategoryMetaData={selectedCategoryMetaData} />;
};

export default Categories;
