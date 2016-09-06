#!/bin/sh

TMPFILE=`mktemp`
PWD=`pwd`
wget https://github.com/kapost/codeclimate-common/archive/master.zip -O $TMPFILE
unzip -j $TMPFILE -d $PWD -x */README.mkd */install.sh
rm $TMPFILE
