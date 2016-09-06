# This will download all these files (inluding this one, so remove it)
# You can also update the local files the same way
# If you're feeling daring:
# curl -L https://raw.githubusercontent.com/kapost/codeclimate-common/master/00-install.sh | bash

git archive --format=tar --remote=https://github.com/kapost/codeclimate-common HEAD | tar xf -
rm 00-install.sh
