# This will download all these files (inluding this one, so remove it)
# You can also update the local files the same way
# If you're feeling daring:
# curl -L https://gist.githubusercontent.com/paul/262d8140fda8479f4851ac78934f94e5/raw/00-install.sh | bash

git archive --format=tar --remote=https://gist.github.com/paul/262d8140fda8479f4851ac78934f94e5 HEAD | tar xf -
rm 00-install.sh
