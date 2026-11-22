# Portfolio Rule Book

All rules below must be followed automatically on every update to this portfolio repository.

## 1. Orient Pictures and Videos Before Uploading
- Before adding, linking, committing, or uploading any picture or video to the portfolio (or pushing to GitHub), always visually inspect it and check its EXIF orientation / video rotation metadata.
- If any picture or video is sideways, upside down, or relies on EXIF/metadata rotation tags instead of upright pixels, rotate and bake the upright orientation directly into the file first (resetting/stripping EXIF orientation tags for images, or re-encoding upright with cleared rotation metadata for videos).
- Re-inspect the corrected media visually to verify it renders upright before updating portfolio references or pushing.

## 2. Always Update Stats & Summary Sections After Uploading Anything New
- Every time a new **Project**, **Certification**, **Award**, or **Platform** is added, removed, or uploaded, always recount the actual cards in `index.html` and update **all** of these sections in the same commit:
  1. **Hero Stats Bar (`.hero-stats`)** in `index.html` — update the exact counts for `Projects`, `Certifications`, `Awards`, and `Platforms`, and keep all stats aligned cleanly on **one single line** (never wrapped onto two lines).
  2. **Social Meta Tags** in `index.html` — update `og:description` and `twitter:description` with the new counts.
  3. **Portfolio AI Knowledge Base** in `ai-mode.js` — add the new item to `KB.projects`, `KB.certifications`, or `KB.awards` and update `totalProjects`, `totalCertifications`, `totalAwards`, and `totalPlatforms`.

## 3. Keep Folders Organized
- Place all standalone certificates (images and PDFs) inside `Certificates/`. For PDF certificates, render a crisp upright PNG version alongside the PDF for web display.
- Keep award packages in `Documents/Award/` and general website photos, logos, and backgrounds in `Picture/`.

## 4. Verify Before Pushing
- Verify that 100% of local `src` and `href` links in `index.html` exist on disk before committing and pushing to GitHub (`main`).
