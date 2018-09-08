const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export const shouldUpdateItem = (lastUpdated) => {
  const stale = Date.now() - 1 * DAY;
  /**
   * should update if lastUpdated timestamp is stale time
   */
  return lastUpdated < stale;
};

export const shouldUpdateItems = (lastUpdated) => {
  const stale = Date.now() - 1 * DAY;
  /**
   * should update if lastUpdated timestamp is stale time
   */
  return lastUpdated < stale;
};

export const shouldUpdateCategories = (lastUpdated) => {
  const stale = Date.now() - 1 * DAY;
  return lastUpdated < stale;
};
