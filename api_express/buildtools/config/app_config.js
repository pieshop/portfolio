'use strict';

module.exports = function() {
  /**
   * configurable paths
   */
  const USING_CDN = true;
  const CDN = 'https://cdn.stephenhamilton.co.uk/portfolio'; // bunnycdn using linked hostname with ssl

  const WATCH_BASE = 'http://mini.portfolio';
  const WATCH_API = 'http://mini.api/api/v2';

  const MINI_BASE = 'http://mini.portfolio';
  // const MINI_API = 'http://mini.api/api/v2';
  const MINI_API = 'http://pieshop.express:3000/api';


  const STAGE_BASE = 'https://stage.stephenhamilton.co.uk';
  const STAGE_API = 'https://api-stage.stephenhamilton.co.uk/api/v2';

  const DIST_BASE = 'https://www.stephenhamilton.co.uk';
  const DIST_API = 'https://api.stephenhamilton.co.uk/api/v2';

  const ANALYTICS_ID = 'UA-551725-1';
  const ANALYTICS_DOMAIN = 'stephenhamilton.co.uk';

  let app_config = {
    build_tools: './buildtools',
    build_templates: './buildtools/templates',
    src: './src',
    cdn: CDN,
    env: {
      watch: {
        base: WATCH_BASE,
        api_base: WATCH_API,
      },
      local: {
        base: MINI_BASE,
        api_base: MINI_API,
      },
      stage: {
        base: STAGE_BASE,
        api_base: STAGE_API,
      },
      live: {
        base: DIST_BASE,
        api_base: DIST_API,
      },
    },
    /**
     * rsync host is defined in ~/.ssh/config
     */
    rsync: {
      local: {
        host: '',
        dest: '/Users/stephenhamilton/Sites/mini.stephenhamilton.co.uk',
        assets: '/Users/stephenhamilton/Sites/assets.stephenhamilton.co.uk/portfolio',
      },
      stage: {
        host: 'ds1512_stephen',
        dest: '/volume1/web/stage.stephenhamilton.co.uk',
        assets: '/volume1/web/assets.stephenhamilton.co.uk/portfolio',
      },
      live: {
        host: 'ds918_stephen',
        dest: '/volume1/server/portfolio_api',
      },
    }
  };
  return app_config;
};
