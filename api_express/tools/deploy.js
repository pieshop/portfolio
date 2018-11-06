import run from './run';
// import clean from './clean';
// import criticalCSS from './critical';
// import svninfo from './svninfo';
// import update from './update';
import sync from './sync';

async function deploy(options) {
  // await run(clean);
  // await run(criticalCSS);
  // await run(svninfo);
  // await run(update, options);
  run(sync, options);
}

export default deploy;
