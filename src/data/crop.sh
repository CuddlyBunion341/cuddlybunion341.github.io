#!/bin/bash

if ! command -v convert &> /dev/null; then
    echo "ImageMagick is required but it's not installed. Aborting."
    exit 1
fi

input_dir="../assets/projects"
width="1200"
height="600"

if [ ! -d "$input_dir" ]; then
    echo "Directory $input_dir does not exist. Aborting."
    exit 1
fi

for image in "$input_dir"/*.webp; do
    if [ -f "$image" ]; then
        convert "$image" -resize "${width}x${height}^" -gravity center -extent "${width}x${height}" "$image"

        echo "Resized and cropped $image"
    else
        echo "No WebP images found in $input_dir"
    fi
done

echo "All images have been resized and cropped!"
