import run from './run';
// import clean from './clean';
import criticalCSS from './critical';
import svninfo from './svninfo';
import update from './update';
import sync from './sync';

async function deploy() {
    // await run(clean);
    // await run(criticalCSS);
    await run(svninfo);
    await run(update);
    run(sync);
}

export default deploy;
