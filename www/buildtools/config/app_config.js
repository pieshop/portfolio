'use strict';

module.exports = function() {
  /**
   * configurable paths
   */
  const USING_CDN = true;
  const CDN = '//cdn.stephenhamilton.co.uk/portfolio'; // bunnycdn using linked hostname with ssl

  // const WATCH_BASE = '//mini.portfolio';
  // const WATCH_API = '//mini.api/api/v2';
  // const WATCH_ASSETS = '//mini.assets/portfolio';
  // const WATCH_DATA = '/assets/json/archives';
  const WATCH_BASE = '//stage.stephenhamilton.co.uk';
  const WATCH_API = '//api-stage.stephenhamilton.co.uk/api/v2';
  const WATCH_ASSETS = '//assets-stage.stephenhamilton.co.uk/portfolio';
  const WATCH_DATA = '/assets/json/archives';

  const IMAC_BASE = '//portfolio.dev.imac';
  const IMAC_API = '//api.dev.imac/api/v2';
  const IMAC_ASSETS = '//assets.dev.imac/portfolio';
  const IMAC_DATA = '/assets/json/archives';

  const MINI_BASE = '//mini.portfolio';
  const MINI_API = '//mini.api/api/v2';
  const MINI_ASSETS = '//mini.assets/portfolio';
  const MINI_DATA = '/assets/json/archives';

  const STAGE_BASE = '//stage.stephenhamilton.co.uk';
  const STAGE_API = '//api-stage.stephenhamilton.co.uk/api/v2';
  const STAGE_ASSETS = '//assets-stage.stephenhamilton.co.uk/portfolio';
  const STAGE_DATA = '//assets-stage.stephenhamilton.co.uk/portfolio/json/archives';

  const DIST_BASE = '//www.stephenhamilton.co.uk';
  const DIST_API = '//api.stephenhamilton.co.uk/api/v2';
  const DIST_ASSETS = USING_CDN ? CDN : '//assets.stephenhamilton.co.uk/portfolio';
  const DIST_DATA = USING_CDN ? CDN + '/json/archives' : '//assets.stephenhamilton.co.uk/portfolio/json/archives';

  const ANALYTICS_ID = 'UA-551725-1';
  const ANALYTICS_DOMAIN = 'stephenhamilton.co.uk';

  let app_config = {
    build_tools: './buildtools',
    build_templates: './buildtools/templates',
    app: './src',
    imac: './dev',
    mini: './dev',
    stage: './stage',
    live: './dist',
    frontend: './frontend',
    cdn: USING_CDN ? CDN : DIST_ASSETS,
    svn: { repo: '', username: '', password: '' },
    env: {
      watch: {
        base: WATCH_BASE,
        api_base: WATCH_API,
        assets_base: WATCH_ASSETS,
        data_base: WATCH_DATA,
        analytics_id: '',
        analytics_domain: '',
        sitemap_stylesheet_pattern: '//mini.api/vendor',
      },
      imac: {
        base: IMAC_BASE,
        api_base: IMAC_API,
        assets_base: IMAC_ASSETS,
        data_base: IMAC_DATA,
        analytics_id: '',
        analytics_domain: '',
        sitemap_stylesheet_pattern: '//imac.api/vendor',
      },
      mini: {
        base: MINI_BASE,
        api_base: MINI_API,
        assets_base: MINI_ASSETS,
        data_base: MINI_DATA,
        analytics_id: '',
        analytics_domain: '',
        sitemap_stylesheet_pattern: '//mini.api/vendor',
      },
      stage: {
        base: STAGE_BASE,
        api_base: STAGE_API,
        assets_base: STAGE_ASSETS,
        data_base: STAGE_DATA,
        analytics_id: '',
        analytics_domain: '',
        sitemap_stylesheet_pattern: '//api-stage.stephenhamilton.co.uk/vendor',
      },
      live: {
        base: DIST_BASE,
        api_base: DIST_API,
        assets_base: DIST_ASSETS,
        data_base: DIST_DATA,
        analytics_id: ANALYTICS_ID,
        analytics_domain: ANALYTICS_DOMAIN,
        sitemap_stylesheet_pattern: '//api.stephenhamilton.co.uk/vendor',
      },
    },
    /**
     * rsync host is defined in ~/.ssh/config
     */
    rsync: {
      imac: {
        dest: '/Users/stephenhamilton/Sites/imac.portfolio',
        assets: '/Users/stephenhamilton/Sites/imac.assets/portfolio',
      },
      mini: {
        host: 'mini',
        dest: '/Users/stephenhamilton/Sites/mini.portfolio',
        assets: '/Users/stephenhamilton/Sites/mini.assets/portfolio',
      },
      stage: {
        host: 'ds1512_stephen',
        dest: '/volume1/web/stage.stephenhamilton.co.uk',
        assets: '/volume1/web/assets.stephenhamilton.co.uk/portfolio',
      },
      live: {
        host: 'ds918_stephen',
        dest: '/volume1/web/www.stephenhamilton.co.uk',
        assets: '/volume1/web/assets.stephenhamilton.co.uk/portfolio',
      },
    },
    replace_options: {
      watch: {
        multiple: [
          { search: '{base_url}', replace: WATCH_BASE },
          { search: '{api_base}', replace: WATCH_API },
          { search: '{assets_base}', replace: WATCH_ASSETS },
          { search: '{data_base}', replace: WATCH_DATA },
          { search: '{analytics_id}', replace: '' },
          { search: '{analytics_domain}', replace: '' },
        ],
      },
      imac: {
        multiple: [
          { search: '{base_url}', replace: IMAC_BASE },
          { search: '{api_base}', replace: IMAC_API },
          { search: '{assets_base}', replace: IMAC_ASSETS },
          { search: '{data_base}', replace: IMAC_DATA },
          { search: '{analytics_id}', replace: '' },
          { search: '{analytics_domain}', replace: '' },
        ],
      },
      mini: {
        multiple: [
          { search: '{base_url}', replace: MINI_BASE },
          { search: '{api_base}', replace: MINI_API },
          { search: '{assets_base}', replace: MINI_ASSETS },
          { search: '{data_base}', replace: MINI_DATA },
          { search: '{analytics_id}', replace: '' },
          { search: '{analytics_domain}', replace: '' },
        ],
      },
      stage: {
        multiple: [
          { search: '{base_url}', replace: STAGE_BASE },
          { search: '{api_base}', replace: STAGE_API },
          { search: '{assets_base}', replace: STAGE_ASSETS },
          { search: '{data_base}', replace: STAGE_DATA },
          { search: '{analytics_id}', replace: '' },
          { search: '{analytics_domain}', replace: '' },
        ],
      },
      live: {
        multiple: [
          { search: '{base_url}', replace: DIST_BASE },
          { search: '{api_base}', replace: DIST_API },
          { search: '{assets_base}', replace: DIST_ASSETS },
          { search: '{data_base}', replace: DIST_DATA },
          { search: '{analytics_id}', replace: ANALYTICS_ID },
          { search: '{analytics_domain}', replace: ANALYTICS_DOMAIN },
        ],
      },
    },
  };
  return app_config;
};
