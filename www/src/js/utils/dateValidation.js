/* global __WATCH__:false, __SERVICE_WORKER__:false */

const SECOND = 1000;
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

const getTime = () => {
  if (__WATCH__) {
    console.log('Using 15 second before refetching categories');
    return 15 * SECOND;
  }
  if (!__WATCH__) {
    return 1 * DAY;
  }
};

export const shouldUpdateItem = (lastUpdated) => {
  const time = getTime();
  const stale = Date.now() - time;
  /**
   * should update if lastUpdated timestamp is stale time
   */
  return lastUpdated < stale;
};

export const shouldUpdateItems = (lastUpdated) => {
  const time = getTime();
  const stale = Date.now() - time;
  /**
   * should update if lastUpdated timestamp is stale time
   */
  return lastUpdated < stale;
};

export const shouldUpdateCategories = (lastUpdated) => {
  const time = getTime();
  const stale = Date.now() - time;
  return lastUpdated < stale;
};
