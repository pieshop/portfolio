import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import pkg from './package.json';

function localAssetsPlugin(): Plugin {
  const assetsDir = path.resolve(__dirname, '../assets/portfolio');

  return {
    name: 'local-assets',
    configureServer(server) {
      server.middlewares.use('/assets-proxy', (req, res, next) => {
        const filePath = path.join(assetsDir, req.url || '');
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          const stream = fs.createReadStream(filePath);
          stream.pipe(res);
        } else {
          next();
        }
      });
    },
  };
}

// Short commit of the build, shown with the version in the footer's tooltip; "-dirty" when built
// with uncommitted changes.
function gitCommit(): string {
  try {
    return execSync('git describe --always --dirty').toString().trim();
  } catch {
    return 'unknown';
  }
}

export default defineConfig(() => {
  const localAssetsExist = fs.existsSync(
    path.resolve(__dirname, '../assets/portfolio/images'),
  );

  return {
    plugins: [react(), ...(localAssetsExist ? [localAssetsPlugin()] : [])],
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __APP_COMMIT__: JSON.stringify(gitCommit()),
      __APP_BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
    },
    server: {
      proxy: {
        ...(!localAssetsExist && {
          '/assets-proxy': {
            target: 'https://assets.stephenhamilton.co.uk',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/assets-proxy/, '/portfolio'),
          },
        }),
      },
    },
    resolve: {
      alias: {
        constants: path.resolve(__dirname, 'src/constants'),
        components: path.resolve(__dirname, 'src/components'),
        containers: path.resolve(__dirname, 'src/containers'),
        store: path.resolve(__dirname, 'src/store'),
        services: path.resolve(__dirname, 'src/services'),
        utils: path.resolve(__dirname, 'src/utils'),
      },
    },
  };
});
