#!/bin/sh
# pre-commit.sh
set -e
make -j2 test
RESULT=$?
[ $RESULT -ne 0 ] && exit 1

jshint *.js app/*.js conf/*.js app/*/*.js
RESULT=$?
[ $RESULT -ne 0 ] && exit 1

exit 0
