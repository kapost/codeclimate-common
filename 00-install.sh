#!/bin/sh

git archive --format=tar --remote=https://github.com/kapost/codeclimate-common HEAD | tar xf -
rm 00-install.sh
