#!/usr/bin/env node

import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const wwwRoot = path.resolve(scriptDir, '..');
const repoRoot = path.resolve(wwwRoot, '..');
const publicRoot = path.join(wwwRoot, 'public');
const emulatorDataDir = path.join(publicRoot, 'emulatorjs', 'data');
const publicCommodoreDir = path.join(publicRoot, 'commodore');
const publicGamesDir = path.join(publicCommodoreDir, 'games');
const nodeModulesDir = path.join(wwwRoot, 'node_modules');

const games = [
  {
    id: 'skramble',
    sourceFiles: [
      {
        from: path.join(repoRoot, 'commodore', 'vic20', 'ScrambleVic.prg'),
        to: 'ScrambleVic.prg',
      },
    ],
    config: {
      name: 'Skramble',
      core: 'vic20',
      emulatorCore: 'vice_xvic',
      gameUrl: '/commodore/games/skramble/ScrambleVic.prg',
      defaultOptions: {
        vice_vic20_memory_expansions: '16kB',
        vice_vic20_model: 'VIC20 PAL auto',
        vice_joyport_type: '1',
        vice_reset: 'autostart',
        vice_autostart: 'enabled',
      },
    },
  },
  {
    id: 'jungledrums',
    sourceFiles: [
      {
        from: path.join(
          repoRoot,
          'commodore',
          'c64',
          'jungledrums',
          'Jungle Drums (1984)(Anirog Software)[cr FCS].T64',
        ),
        to: 'Jungle Drums (1984)(Anirog Software)[cr FCS].T64',
      },
    ],
    config: {
      name: 'Jungle Drums',
      core: 'vice_x64',
      emulatorCore: 'vice_x64',
      gameUrl: '/commodore/games/jungledrums/Jungle Drums (1984)(Anirog Software)[cr FCS].T64',
      defaultOptions: {
        vice_reset: 'autostart',
        vice_autostart: 'enabled',
      },
    },
  },
];

const requiredPaths = [
  path.join(nodeModulesDir, '@emulatorjs', 'emulatorjs', 'data'),
  path.join(nodeModulesDir, '@emulatorjs', 'core-vice_xvic'),
  path.join(nodeModulesDir, '@emulatorjs', 'core-vice_x64'),
  ...games.flatMap((game) => game.sourceFiles.map((file) => file.from)),
];

const playerHtml = String.raw`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Commodore Player</title>
    <style>
      :root {
        color-scheme: dark;
        background: #05040a;
        color: #f3f0ff;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
      }

      body {
        display: grid;
        place-items: center;
        overflow: hidden;
        background:
          radial-gradient(circle at 20% 10%, rgba(125, 92, 255, 0.22), transparent 35%),
          radial-gradient(circle at 80% 90%, rgba(0, 255, 196, 0.12), transparent 32%),
          #05040a;
      }

      #game {
        width: 100%;
        height: 100%;
      }

      #status {
        max-width: 34rem;
        padding: 1rem 1.25rem;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 0.75rem;
        background: rgba(8, 7, 18, 0.78);
        box-shadow: 0 20px 70px rgba(0, 0, 0, 0.42);
        line-height: 1.5;
        text-align: center;
      }

      #status[data-state="error"] {
        color: #ffd7d7;
        border-color: rgba(255, 95, 95, 0.38);
      }
    </style>
  </head>
  <body>
    <div id="status">Loading Commodore player...</div>
    <div id="game" hidden></div>

    <script>
      const gameControlKeys = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Spacebar']);
      window.addEventListener('keydown', (event) => {
        if (gameControlKeys.has(event.key)) {
          event.preventDefault();
        }
      }, { capture: true });

      async function loadPlayer() {
        const status = document.getElementById('status');
        const gameEl = document.getElementById('game');
        const params = new URLSearchParams(window.location.search);
        const game = params.get('game') || '';

        if (!/^[a-z0-9-]+$/.test(game)) {
          throw new Error('Invalid game selection.');
        }

        const response = await fetch('/commodore/games/' + game + '/config.json', {
          cache: 'no-cache',
        });

        if (!response.ok) {
          throw new Error('Game config not found: ' + game);
        }

        const config = await response.json();

        window.EJS_player = '#game';
        window.EJS_core = config.core;
        window.EJS_gameName = config.name;
        window.EJS_gameUrl = config.gameUrl;
        window.EJS_pathtodata = '/emulatorjs/data/';
        window.EJS_startOnLoaded = true;
        window.EJS_threads = false;
        window.EJS_DEBUG_XX = true;
        window.EJS_disableAutoLang = false;
        window.EJS_defaultOptions = config.defaultOptions || {};

        status.hidden = true;
        gameEl.hidden = false;

        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/emulatorjs/data/loader.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load EmulatorJS.'));
          document.body.appendChild(script);
        });
      }

      loadPlayer().catch((error) => {
        const status = document.getElementById('status');
        status.hidden = false;
        status.dataset.state = 'error';
        status.textContent = error.message || 'The Commodore player failed to load.';
      });
    </script>
  </body>
</html>
`;

async function assertPaths() {
  const missing = requiredPaths.filter((itemPath) => !existsSync(itemPath));
  if (missing.length > 0) {
    throw new Error(`Missing required EmulatorJS/game asset paths:\n${missing.join('\n')}`);
  }
}

async function copyEmulatorJs() {
  await rm(emulatorDataDir, { recursive: true, force: true });
  await mkdir(path.dirname(emulatorDataDir), { recursive: true });

  await cp(path.join(nodeModulesDir, '@emulatorjs', 'emulatorjs', 'data'), emulatorDataDir, {
    recursive: true,
  });

  const coresDir = path.join(emulatorDataDir, 'cores');
  await mkdir(coresDir, { recursive: true });

  for (const corePackage of ['core-vice_xvic', 'core-vice_x64']) {
    await cp(path.join(nodeModulesDir, '@emulatorjs', corePackage), coresDir, {
      recursive: true,
    });
  }
}

async function copyGames() {
  await rm(publicGamesDir, { recursive: true, force: true });
  await mkdir(publicGamesDir, { recursive: true });

  for (const game of games) {
    const gameDir = path.join(publicGamesDir, game.id);
    await mkdir(gameDir, { recursive: true });

    for (const file of game.sourceFiles) {
      await cp(file.from, path.join(gameDir, file.to));
    }

    await writeFile(
      path.join(gameDir, 'config.json'),
      `${JSON.stringify(game.config, null, 2)}\n`,
      'utf8',
    );
  }
}

async function writePlayer() {
  await mkdir(publicCommodoreDir, { recursive: true });
  await writeFile(path.join(publicCommodoreDir, 'player.html'), playerHtml, 'utf8');
}

async function main() {
  await assertPaths();
  await copyEmulatorJs();
  await copyGames();
  await writePlayer();
  console.info('Copied EmulatorJS and Commodore assets.');
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
