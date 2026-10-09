# bacon251.github.io

Minimal static blog for <https://bacon251.github.io>. It has two levels: a tagged post index and article pages.

## Content

Posts live in `data/posts.js`. The fixed tags are `jazz`, `security`, `fuckinggambling`, and `other`. See `CONTENT_TEMPLATE.md` for the input format used when adding a post from Markdown or PDF.

## Preview

Serve the repository root with any static server, for example:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>. No build step or third-party dependency is required.
