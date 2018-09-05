/* global self, caches, fetch, URL, Response */
// @flow weak
/* eslint-disable no-console */

'use strict';
const VERSION = '025';
const DEBUG = false;
const { assets } = global.serviceWorkerOption;

let config = {
  version: 'portfolio-offline_v' + VERSION,
  staticCacheItems: [...assets, './'],
  cachePathPattern: /^\/(?:(20[0-9]{2}|about|css|images|js|api|jpg)\/(.+)?)?$/,
  offlineImage:
    '<svg role="img" aria-labelledby="offline-title"' +
    ' viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">' +
    '<title id="offline-title">Offline</title>' +
    '<g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/>' +
    '<text fill="#9B9B9B" font-family="Times New Roman,Times,serif" font-size="72" font-weight="bold">' +
    '<tspan x="93" y="172">offline</tspan></text></g></svg>',
  offlinePage: '/offline/',
};

config.staticCacheItems = config.staticCacheItems.map((path) => {
  return new URL(path, global.location).toString();
});

function cacheName(key, opts) {
  let cn = `${opts.version}-${key}`;
  return cn;
}

function addToCache(cacheKey, request, response) {
  if (DEBUG) {
    console.log('[SW] addToCache ', cacheKey, ' | request ', request, ' | response ', response);
  }
  if (response.ok) {
    if (DEBUG) {
      console.log('[SW] addToCache ', cacheKey, ' | url ', response.url);
    }
    let copy = response.clone();
    global.caches.open(cacheKey).then((cache) => {
      cache.put(request, copy);
    });
  } else {
    if (DEBUG) {
      console.log('[SW] addToCache FAILED ', cacheKey, ' | url ', response.url);
    }
  }
  return response;
}

function fetchFromCache(event) {
  return global.caches.match(event.request).then((response) => {
    if (!response) {
      throw Error(`${event.request.url} not found in cache`);
    }
    if (DEBUG) {
      console.log('[SW] fetchFromCache ', event.request, ' | response ', response);
    }
    return response;
  });
}

function offlineResponse(resourceType, opts) {
  if (resourceType === 'image') {
    return new Response(opts.offlineImage, { headers: { 'Content-Type': 'image/svg+xml' } });
  } else if (resourceType === 'content') {
    return global.caches.match(opts.offlinePage);
  }
  return undefined;
}

self.addEventListener('install', (event) => {
  function onInstall(event, opts) {
    let cacheKey = cacheName('static', opts);
    return global.caches.open(cacheKey).then((cache) => cache.addAll(opts.staticCacheItems));
  }

  event.waitUntil(onInstall(event, config).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  function onActivate(event, opts) {
    return global.caches.keys().then((cacheKeys) => {
      let oldCacheKeys = cacheKeys.filter((key) => key.indexOf(opts.version) !== 0);
      let deletePromises = oldCacheKeys.map((oldKey) => global.caches.delete(oldKey));
      return Promise.all(deletePromises);
    });
  }

  event.waitUntil(onActivate(event, config).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  function shouldHandleFetch(event, opts) {
    let request = event.request;
    let url = new URL(request.url);
    let criteria = {
      // matchesPathPattern: opts.cachePathPattern.test(url.pathname),
      isGETRequest: request.method === 'GET',
      isFromMyOrigin: url.host.indexOf('stephenhamilton') !== -1, // assets, api and www
    };
    let failingCriteria = Object.keys(criteria).filter((criteriaKey) => !criteria[criteriaKey]);
    return !failingCriteria.length;
  }

  function onFetch(event, opts) {
    let request = event.request;
    let acceptHeader = request.headers.get('Accept');
    let resourceType = 'static';
    let cacheKey;

    if (acceptHeader.indexOf('text/html') !== -1) {
      resourceType = 'content';
    } else if (acceptHeader.indexOf('image') !== -1) {
      resourceType = 'image';
    } else if (acceptHeader.indexOf('json') !== -1) {
      resourceType = 'api';
    } else if (request.url.indexOf('pdf') !== -1) {
      resourceType = 'pdf';
    }
    // if (DEBUG) {
    //     console.log('[SW] resourceType ', resourceType, 'request ', request);
    // }
    cacheKey = cacheName(resourceType, opts);

    if (resourceType === 'content') {
      event.respondWith(
        fetch(request)
          .then((response) => addToCache(cacheKey, request, response))
          .catch(() => fetchFromCache(event))
          .catch(() => offlineResponse(resourceType, opts))
      );
    } else {
      event.respondWith(
        fetchFromCache(event)
          .catch(() => fetch(request))
          .then((response) => addToCache(cacheKey, request, response))
          .catch(() => offlineResponse(resourceType, opts))
      );
    }
  }

  if (shouldHandleFetch(event, config)) {
    onFetch(event, config);
  }
});
