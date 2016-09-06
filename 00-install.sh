# This will download all these files (inluding this one, so remove it)

git archive --format=tar --remote=<repository URL> HEAD | tar xf -
rm 00-install.sh
