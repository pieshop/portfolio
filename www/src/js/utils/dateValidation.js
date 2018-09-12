/* global __WATCH__:false, __SERVICE_WORKER__:false */

const SECOND = 1000;
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export const shouldUpdateItem = (lastUpdated) => {
  const time = __WATCH__ ? 15 * SECOND : 1 * DAY;
  const stale = Date.now() - time;
  /**
   * should update if lastUpdated timestamp is stale time
   */
  return lastUpdated < stale;
};

export const shouldUpdateItems = (lastUpdated) => {
  const time = __WATCH__ ? 15 * SECOND : 1 * DAY;
  const stale = Date.now() - time;
  /**
   * should update if lastUpdated timestamp is stale time
   */
  return lastUpdated < stale;
};

export const shouldUpdateCategories = (lastUpdated) => {
  const time = __WATCH__ ? 15 * SECOND : 1 * DAY;
  const stale = Date.now() - time;
  return lastUpdated < stale;
};
