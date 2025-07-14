#!/usr/bin/env bash

PATH=$PATH:/home/nginx/.bun/bin

[ -f .env.production ] && cp .env.production /tmp/env.auth.lucasbrum
[ -f ansible/.vault_pass ] && cp ansible/.vault_pass /tmp/.auth.lucasbrum.vault_pass

git clean -fxd

[ -f /tmp/.auth.lucasbrum.vault_pass ] && cp /tmp/.auth.lucasbrum.vault_pass ansible/.vault_pass
sudo /usr/bin/systemctl stop auth.lucasbrum.dev.service

sudo /bin/bash scripts/db/drop.sh
sudo /bin/bash scripts/db/create.sh

bun install
bun run build

bun run db:push
bun run db:generate
bun run db:seed

sudo /usr/bin/systemctl start auth.lucasbrum.dev.service