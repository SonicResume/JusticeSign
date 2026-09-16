#!/usr/bin/env bash
set -e

echo "==> Rebuilding Justice On Call OpenSign stack"

docker compose down

echo "==> Rebuilding client image"
docker compose build --no-cache client

echo "==> Starting services"
docker compose up -d --force-recreate

echo "==> Status"
docker compose ps

echo "==> Done"
