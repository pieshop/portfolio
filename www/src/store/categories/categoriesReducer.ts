import {
  CATEGORIES_RECEIVE,
  CATEGORIES_REQUEST,
  YEAR_SELECT,
  CATEGORY_SELECT,
  FILTER_TOGGLE,
  METADATA_UPDATE,
  CATEGORIES_INVALIDATE,
} from 'store/categories/categoriesActions';
import * as constants from 'constants/AppConstants';

interface Category {
  category_name: string;
  category_label: string;
  category_description: string;
  is_active: boolean;
  [key: string]: unknown;
}

interface CategoriesState {
  available: Category[];
  activeByYear: Record<string, Record<string, boolean>>;
  lastUpdated: number;
  isFetching?: boolean;
  didInvalidate?: boolean;
}

const initState: CategoriesState = {
  available: [],
  activeByYear: {},
  lastUpdated: 0,
};

const initMetaDataState = { label: '', description: '' };

export const selectedCategory = (state: string = constants.DEFAULT_CATEGORY, action: { type: string; category?: string }): string => {
  switch (action.type) {
    case CATEGORY_SELECT:
      return action.category ?? state;
    default:
      return state;
  }
};

export const selectedCategoryMetaData = (
  state = initMetaDataState,
  action: { type: string; metadata?: { label: string; description: string } }
) => {
  switch (action.type) {
    case METADATA_UPDATE:
      return action.metadata ?? state;
    default:
      return state;
  }
};

export const selectedYear = (state: string = constants.DEFAULT_YEAR, action: { type: string; year?: string }): string => {
  switch (action.type) {
    case YEAR_SELECT:
      return action.year ?? state;
    default:
      return state;
  }
};

export const filtered = (state: boolean = constants.DEFAULT_FILTER, action: { type: string }): boolean => {
  switch (action.type) {
    case FILTER_TOGGLE:
      return !state;
    default:
      return state;
  }
};

const reducer = (state: CategoriesState = initState, action: { type: string; [key: string]: unknown }): CategoriesState => {
  const nextState: Partial<CategoriesState> = {};
  switch (action.type) {
    case CATEGORIES_INVALIDATE:
      return { ...state, isFetching: false, didInvalidate: true };
    case CATEGORIES_REQUEST:
      return { ...state, isFetching: true, didInvalidate: false };
    case CATEGORIES_RECEIVE:
      if (action.categories) {
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          activeByYear: action.activeByYear as Record<string, Record<string, boolean>>,
          available: action.categories as Category[],
          lastUpdated: action.receivedAt as number,
        };
      } else {
        return { ...state, isFetching: false, didInvalidate: true };
      }
    case YEAR_SELECT: {
      const year = action.year as string;
      nextState.available = state.available.map((o) => {
        const category_name = o.category_name;
        let is_active = false;
        if (year === 'allyears' || category_name === 'about' || category_name === 'all') {
          is_active = true;
        } else {
          is_active = state.activeByYear[year]?.[category_name] === true;
        }
        return { ...o, is_active };
      });
      return { ...state, ...nextState };
    }
    default:
      return state;
  }
};
export default reducer;
