'use strict';

module.exports = function() {
  /**
   * configurable paths
   */

  // const CDN = 'http://assets-6947.kxcdn.com/portfolio'; // KeyCDN
  // const CDN = 'https://assets.b-cdn.net/portfolio'; // bunnycdn
  const USING_CDN = true;
  const CDN = 'https://cdn.stephenhamilton.co.uk/portfolio'; // bunnycdn using linked hostname with ssl

  const MINI_BASE = 'http://mini.portfolio';
  const MINI_API = 'http://mini.api/api/v2';
  const MINI_ASSETS = 'http://mini.assets/portfolio';

  // const MINI_BASE   = 'http://dev.stephenhamilton.co.uk';
  // const MINI_API    = 'http://api-stage.stephenhamilton.co.uk/api/v2';
  // const MINI_ASSETS = 'http://assets-stage.stephenhamilton.co.uk/portfolio';

  const STAGE_BASE = 'http://stage.stephenhamilton.co.uk';
  const STAGE_API = 'http://api-stage.stephenhamilton.co.uk/api/v2';
  const STAGE_ASSETS = 'http://assets-stage.stephenhamilton.co.uk/portfolio';

  const STAGE_NAS_BASE = 'https://stage.stephenhamilton.co.uk';
  const STAGE_NAS_API = 'https://api-stage.stephenhamilton.co.uk/api/v2';
  const STAGE_NAS_ASSETS = 'https://assets-stage.stephenhamilton.co.uk/portfolio';

  const DIST_BASE = 'https://www.stephenhamilton.co.uk';
  const DIST_API = 'https://api.stephenhamilton.co.uk/api/v2';
  const DIST_ASSETS = USING_CDN ? CDN : 'https://assets.stephenhamilton.co.uk/portfolio';

  const ANALYTICS_ID = 'UA-551725-1';
  const ANALYTICS_DOMAIN = 'stephenhamilton.co.uk';

  let app_config = {
    build_tools: './buildtools',
    build_templates: './buildtools/templates',
    app: './src',
    dev: './dev',
    stage: './stage',
    stage_nas: './stage_nas',
    dist: './dist',
    frontend: './frontend',
    cdn: USING_CDN ? CDN : DIST_ASSETS,
    svn: { repo: '', username: '', password: '' },
    env: {
      dev: {
        base: MINI_BASE,
        api_base: MINI_API,
        assets_base: MINI_ASSETS,
        analytics_id: '',
        analytics_domain: '',
        sitemap_stylesheet_pattern: 'http://mini.api/vendor',
      },
      stage: {
        base: STAGE_BASE,
        api_base: STAGE_API,
        assets_base: STAGE_ASSETS,
        analytics_id: '',
        analytics_domain: '',
        sitemap_stylesheet_pattern: 'http://api-stage.stephenhamilton.co.uk/vendor',
      },
      stage_nas: {
        base: STAGE_NAS_BASE,
        api_base: STAGE_NAS_API,
        assets_base: STAGE_NAS_ASSETS,
        analytics_id: '',
        analytics_domain: '',
        sitemap_stylesheet_pattern: 'https://api-stage.stephenhamilton.co.uk/vendor',
      },
      dist: {
        base: DIST_BASE,
        api_base: DIST_API,
        assets_base: DIST_ASSETS,
        analytics_id: ANALYTICS_ID,
        analytics_domain: ANALYTICS_DOMAIN,
        sitemap_stylesheet_pattern: 'https://api.stephenhamilton.co.uk/vendor',
      },
    },
    /**
     * rsync host is defined in ~/.ssh/config
     */
    rsync: {
      dev: {
        dest: '/Users/stephenhamilton/Sites/mini.stephenhamilton.co.uk',
        assets: '/Users/stephenhamilton/Sites/assets.stephenhamilton.co.uk/portfolio',
      },
      stage: {
        host: 'stage',
        dest: '/Users/stephenhamilton/Sites/stage.stephenhamilton.co.uk',
        assets: '/Users/stephenhamilton/Sites/assets.stephenhamilton.co.uk/portfolio',
      },
      stage_nas: {
        host: 'nas_stage',
        dest: '/volume1/web/stage.stephenhamilton.co.uk',
        assets: '/volume1/web/assets.stephenhamilton.co.uk/portfolio',
      },
      dist: {
        host: 'nas_stephen',
        dest: '/volume1/web/www.stephenhamilton.co.uk',
        assets: '/volume1/web/assets.stephenhamilton.co.uk/portfolio',
      },
    },
    replace_options: {
      watch: {
        multiple: [
          { search: '{base_url}', replace: MINI_BASE },
          { search: '{api_base}', replace: MINI_API },
          { search: '{assets_base}', replace: MINI_ASSETS },
          { search: '{analytics_id}', replace: '' },
          { search: '{analytics_domain}', replace: '' },
        ],
      },
      dev: {
        multiple: [
          { search: '{base_url}', replace: MINI_BASE },
          { search: '{api_base}', replace: MINI_API },
          { search: '{assets_base}', replace: MINI_ASSETS },
          { search: '{analytics_id}', replace: '' },
          { search: '{analytics_domain}', replace: '' },
        ],
      },
      stage: {
        multiple: [
          { search: '{base_url}', replace: STAGE_BASE },
          { search: '{api_base}', replace: STAGE_API },
          { search: '{assets_base}', replace: STAGE_ASSETS },
          { search: '{analytics_id}', replace: '' },
          { search: '{analytics_domain}', replace: '' },
        ],
      },
      stage_nas: {
        multiple: [
          { search: '{base_url}', replace: STAGE_NAS_BASE },
          { search: '{api_base}', replace: STAGE_NAS_API },
          { search: '{assets_base}', replace: STAGE_NAS_ASSETS },
          { search: '{analytics_id}', replace: '' },
          { search: '{analytics_domain}', replace: '' },
        ],
      },
      dist: {
        multiple: [
          { search: '{base_url}', replace: DIST_BASE },
          { search: '{api_base}', replace: DIST_API },
          { search: '{assets_base}', replace: DIST_ASSETS },
          { search: '{analytics_id}', replace: ANALYTICS_ID },
          { search: '{analytics_domain}', replace: ANALYTICS_DOMAIN },
        ],
      },
    },
  };
  return app_config;
};
