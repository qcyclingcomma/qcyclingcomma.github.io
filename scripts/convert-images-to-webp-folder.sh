#!/bin/bash

# Script to convert images to WebP format

if [ ! -d "assets/webp" ]; then
  mkdir -p assets/webp
fi

for img in *.png *.jpg; do
  if [ -f "$img" ]; then
    cwebp "$img" -o "assets/webp/${img%.*}.webp"
  fi
done
