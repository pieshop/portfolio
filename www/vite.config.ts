import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

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

export default defineConfig(() => {
  const localAssetsExist = fs.existsSync(
    path.resolve(__dirname, '../assets/portfolio/images'),
  );

  return {
    plugins: [react(), ...(localAssetsExist ? [localAssetsPlugin()] : [])],
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
