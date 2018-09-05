SETUP:

• Move package.json into root
• npm install
• cd buildtools
• bower install


----------------------------------------------
DEV:
----------------------------------------------
npmrun dev (npm run-script dev)    : runs dev server, and keeps js in memory

Visit http://localhost:4000 in browser to view app with livereload

----------------------------------------------
BUILD: Via grunt
----------------------------------------------
build - creates build folder, with src maps and unminified modules - for debugging

dist - creates dist folder with minified modules


frontend/default/index.php : is generated from dev/en_GB/index_template.html, with php vars replacing script paths '../'
frontend/language_select/index.php : is not part of build process



## HMR :
https://www.toptal.com/javascript/hot-module-replacement-in-redux?utm_campaign=Social+Media&utm_source=topt.al#setup
