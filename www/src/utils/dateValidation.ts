const SECOND = 1000;
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const shouldUpdateItem = (lastUpdated: number): boolean => {
  const time = import.meta.env.DEV ? 15 * SECOND : 1 * DAY;
  const stale = Date.now() - time;
  return lastUpdated < stale;
};

export const shouldUpdateItems = (lastUpdated: number): boolean => {
  const time = import.meta.env.DEV ? 15 * SECOND : 1 * DAY;
  const stale = Date.now() - time;
  return lastUpdated < stale;
};

export const shouldUpdateCategories = (lastUpdated: number): boolean => {
  const time = import.meta.env.DEV ? 15 * SECOND : 1 * DAY;
  const stale = Date.now() - time;
  return lastUpdated < stale;
};
