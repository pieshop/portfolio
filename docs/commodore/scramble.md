# Scramble VIC-20 reverse-engineering notes

This folder summarises Stephen's original VIC-20 Scramble/Skramble game files and the current reverse-engineering work.

Source workspace:

```text
$HOME/projects/20.personal/commodore
```

Use that workspace as the source of truth for original PRGs, generated disassemblies, and preservation notes.

## Original program files

Keep these original binary program files at this folder root unless explicitly asked to move them:

- `ScrambleVic.prg` - disk-image version, loads at `$1201`, BASIC launcher runs `SYS 4*4096` = `$4000`.
- `Skramble.prg` - related/larger variant, also loads at `$1201` and enters at `$4000`.

`ScrambleVic.prg` also exists inside `../programs-disk-image.d64` and matches the standalone file byte-for-byte.

## Browser runner

A browser-based EmulatorJS test lives under:

- `browser/`

Current result:

- `browser/index.html` loads `ScrambleVic.prg` using EmulatorJS `vic20` / `vice_xvic`.
- It sets `vice_vic20_memory_expansions` to `16kB`.
- Headless Chrome test on 18-08-2026 confirmed the game reaches its own start/adjust-screen display.
- Confirmed browser controls: arrow keys to move, `X` to start/fire.
- Screenshot: `browser/emulatorjs-test-screenshot.png`.

Run locally:

```sh
cd browser
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Reverse-engineering workspace

Generated source/disassembly/support files live under:

- `src/`

Current files:

- `src/ScrambleVic-analysis.md` - main findings and memory map notes.
- `src/ScrambleVic.segmented.asm` - preferred second-pass disassembly to read.
- `src/ScrambleVic.disasm.asm` - first-pass linear disassembly.
- `src/ScrambleVic.refs.txt` - address reference summary.
- `src/Skramble.disasm.asm` - first-pass linear disassembly for the variant.
- `src/Skramble.refs.txt` - address reference summary for the variant.
- `src/disassemble_vic20.py` - local 6502 disassembler helper.
- `src/make_segmented_disasm.py` - regenerates `ScrambleVic.segmented.asm`.

## What has been established

- The game was written as hand-coded 6502, consistent with VICMON use.
- The BASIC stub at `$1201` launches machine code at `$4000`.
- `$4000` is the title/start entry point.
- `$1219` is the main game initialisation entry.
- `$2200` is the main game loop.
- `$2188` reads the joystick through VIA registers `$9111`, `$9120`, and `$9122`.
- Screen RAM is around `$1000`; colour RAM is around `$9400`.
- VIC setup writes directly to `$9000-$900F`.
- Custom character/tile graphics appear at `$1400-$1BFF`.
- Main terrain stream data appears at `$3000-$37FF`.
- Secondary feature/object stream data appears at `$3900-$3BFF`.
- Runtime object/event buffers appear around `$23E2-$23FF` and `$4B00-$4BFF`.

## Regeneration commands

From this folder root:

```sh
python3 src/disassemble_vic20.py ScrambleVic.prg > src/ScrambleVic.refs.txt
python3 src/disassemble_vic20.py Skramble.prg > src/Skramble.refs.txt
python3 src/make_segmented_disasm.py
```

The first two commands also rewrite the matching `.disasm.asm` files next to the PRG path passed to the script. If you want outputs under `src`, pass output paths manually or move them after generation.

## Current caveat

`ScrambleVic.segmented.asm` is a readable reconstruction aid, not yet a verified buildable source file. It has a manual code/data split for the largest obvious regions, but smaller data tables are likely still embedded inside some code ranges.
