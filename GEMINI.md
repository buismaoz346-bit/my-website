# Project Rules

1. **Orient Pictures and Videos Before Uploading:**
   - Before adding, linking, committing, or uploading any image or video to the portfolio (or pushing to GitHub), always visually inspect it and check its EXIF orientation / video rotation metadata.
   - If any picture or video is sideways, upside down, or relies on EXIF/metadata rotation tags instead of properly oriented pixels, rotate and bake the upright orientation directly into the file first (stripping/resetting EXIF orientation tags for images, or re-encoding upright with cleared rotation metadata for videos).
   - Re-inspect the corrected media to verify it displays upright before updating portfolio references or pushing.
