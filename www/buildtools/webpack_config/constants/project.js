const PROJECT_TITLE = 'Portfolio';
// const DEVSERVER_HOST = 'mini.portfolio';
const DEVSERVER_HOST = 'localhost';
const DEVSERVER_PORT = 3000;
const BROWSERSYNC_PORT = 4000;

const PROJECT = {
  title: PROJECT_TITLE,
  devserverHost: DEVSERVER_HOST,
  devserverPort: DEVSERVER_PORT,
  devserverURL: 'http://' + DEVSERVER_HOST + ':' + DEVSERVER_PORT,
  devServer: 'webpack-dev-server/client?http://' + DEVSERVER_HOST + ':' + DEVSERVER_PORT,
  browserSyncPort: BROWSERSYNC_PORT,
  manifestName: 'manifest',
  vendorName: 'vendor',
};

module.exports = PROJECT;
