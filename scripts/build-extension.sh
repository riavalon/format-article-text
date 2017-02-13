#!/bin/bash

# Bundles dist code together to make the browser extension.

BUILD_DIR=./build
MANIFEST=./manifest.json
TEMP_DIR=./tmp
EXTENSION_NAME=format-article-text.zip

# if old zip file exists, delete it
if [ -e $EXTENSION_NAME ]; then
  rm -rf $EXTENSION_NAME
fi

# Make temporary directory
mkdir $TEMP_DIR

# Move build and manifest files into directory
cp -r $BUILD_DIR $MANIFEST $TEMP_DIR

# Create a zip file in root of project from code in TEMP_DIR
cd $TEMP_DIR
zip -r $EXTENSION_NAME ./**
mv $EXTENSION_NAME ../
cd ..

# Remove temporary directory
rm -rf $TEMP_DIR

# Open finder in project
open .

echo Done!
