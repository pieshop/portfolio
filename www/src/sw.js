
/**
 * Code above injected by webpack plugin addServiceWorker
 */
const TEST = '{VERSION}';
const VERSION = 'v1.0.66';
const ASSET_CACHE_VERSION = 'v1.0.0';

workbox.setConfig({ debug: true });
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

workbox.core.setCacheNameDetails({
  prefix: 'portfolio',
  suffix: VERSION,
  precache: 'precache',
  runtime: 'runtime',
});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

const version = self.__precacheManifest.find((o) => {
  return o.url === 'https://cdn.stephenhamilton.co.uk/portfolio/version.json';
});
console.log('version', version.revision);

workbox.precaching.precache([
  {
    url: '/index.html',
    revision: version.revision,
  }
]);

workbox.googleAnalytics.initialize();

workbox.routing.registerNavigationRoute('/index.html', {});

// workbox.routing.registerRoute(
//   /about/,
//   workbox.strategies.networkFirst({
//     networkTimeoutSeconds: 3,
//     cacheName: 'pages-cache-' + ASSET_CACHE_VERSION,
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxEntries: 1,
//         maxAgeSeconds: 5 * 60, // 5 minutes
//       }),
//     ],
//   }),
//   'GET'
// );

// const FALLBACK_IMAGE_URL = '/images/fallback.png';
// const imagesHandler = workbox.strategies.cacheFirst();
// workbox.routing.registerRoute(/^https:\/\/cdn.stephenhamilton\.co\.uk.*.(?:png|jpg|svg)$/, ({event}) => {
//   return imagesHandler.handle({event})
//     .catch(() => caches.match(FALLBACK_IMAGE_URL));
// });

workbox.routing.registerRoute(
  /^https:\/\/cdn.stephenhamilton\.co\.uk.*.(?:png|jpg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache-' + ASSET_CACHE_VERSION,
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        // purgeOnQuotaError: true,
      }),
    ],
  }),
  'GET'
);

workbox.routing.registerRoute(
  /^https:\/\/cdn.stephenhamilton\.co\.uk.*.(?:gif)$/,
  workbox.strategies.staleWhileRevalidate({ cacheName: 'images-cache-' + ASSET_CACHE_VERSION, plugins: [] }),
  'GET'
);
workbox.routing.registerRoute(
  /^https:\/\/cdn.stephenhamilton\.co\.uk.*.(?:json)$/,
  workbox.strategies.cacheFirst({ cacheName: 'json-cache-' + ASSET_CACHE_VERSION, plugins: [] }),
  'GET'
);
workbox.routing.registerRoute(
  /^https:\/\/api.stephenhamilton\.co\.uk.*$/,
  workbox.strategies.staleWhileRevalidate({ cacheName: 'api-cache-' + ASSET_CACHE_VERSION, plugins: [] }),
  'GET'
);


/**
 * OFFLINE
 * https://github.com/GoogleChrome/workbox/issues/438
 *
 */
// var networkFirstHandler = workbox.strategies.networkFirst({
//   cacheName: 'default',
//   plugins: [
//     new workbox.expiration.Plugin({
//       maxEntries: 10
//     }),
//     new workbox.cacheableResponse.Plugin({
//       statuses: [200]
//     })
//   ]
// });
//
// const matcher = ({event}) => event.request.mode === 'navigate';
// const handler = (args) => networkFirstHandler.handle(args).then((response) => (!response) ? caches.match('/offline.html') : response);
//
// workbox.routing.registerRoute(matcher, handler);
