#!/bin/bash

# Configuration
KANJI_DATA_FILE="src/data/kanji.js"
KANJI_SVG_DIR="public/assets/kanji"
KANJIVG_ZIP="kanjivg.zip"
KANJIVG_URL="https://github.com/KanjiVG/kanjivg/releases/download/r20250422/kanjivg-20250422-main.zip"

echo "Starting Kanji SVG generation process..."

# Create SVG directory if it doesn't exist
mkdir -p "$KANJI_SVG_DIR"

# Download KanjiVG dataset if not already present
if [ ! -f "$KANJIVG_ZIP" ]; then
    echo "Downloading KanjiVG dataset..."
    curl -L "$KANJIVG_URL" -o "$KANJIVG_ZIP"
    if [ $? -ne 0 ]; then
        echo "Error: Failed to download KanjiVG dataset."
        exit 1
    fi
else
    echo "KanjiVG dataset already exists. Skipping download."
fi

# Extract Kanji characters, their Unicode, and target filenames using Python
echo "Extracting Kanji data from $KANJI_DATA_FILE..."
KANJI_INFO=$(node --experimental-modules scripts/extract_kanji_data.js)

if [ -z "$KANJI_INFO" ]; then
    echo "Error: No Kanji data found or extracted from $KANJI_DATA_FILE. Please check the file format."
    exit 1
fi

# Process each Kanji
echo "Processing Kanji SVGs..."
echo "$KANJI_INFO" | while IFS=':' read -r kanji_char unicode_hex stroke_img_filename; do
    SOURCE_SVG="kanji/$unicode_hex.svg"
    TARGET_SVG="$KANJI_SVG_DIR/$stroke_img_filename"

    echo "  - Processing $kanji_char (Unicode: $unicode_hex) -> $stroke_img_filename"

    # Extract the specific SVG from the zip
    unzip -j "$KANJIVG_ZIP" "$SOURCE_SVG" -d "$KANJI_SVG_DIR" > /dev/null
    if [ $? -ne 0 ]; then
        echo "    Warning: Could not extract $SOURCE_SVG. It might not exist in the zip or there was an error."
        continue
    fi

    # Rename the extracted SVG
    mv "$KANJI_SVG_DIR/$unicode_hex.svg" "$TARGET_SVG"
    if [ $? -ne 0 ]; then
        echo "    Error: Failed to rename $KANJI_SVG_DIR/$unicode_hex.svg to $TARGET_SVG."
        continue
    fi
done

# Cleanup
echo "Cleaning up temporary files..."
rm -f "$KANJIVG_ZIP"
rm -rf kanji # Remove the extracted kanji directory if it exists

echo "Kanji SVG generation process completed."
