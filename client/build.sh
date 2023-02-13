#!/usr/bin/env bash
PUBLIC_ROOT=$(cd `dirname $0` && pwd )/src/main/resources/public
cd $PUBLIC_ROOT
pwd
#./node_modules/.bin/webpack  main.js main.bundle.js
browserify main.js -o main.bundle.js
