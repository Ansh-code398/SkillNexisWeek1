# Mini Project: React Blog UI

A React-based engineering blog application displaying post cards loaded from a JSON dataset, with real-time search, multi-category filters, tag filtering, sorting, bookmarking, and article reading modals.

## Features
- **JSON Data Architecture**: Rich structured blog posts with titles, excerpts, full markdown-formatted content, categories, tags, author metadata, read times, views, and likes in `src/data/posts.json`.
- **Search Functionality**: Real-time instant search filtering across post titles, excerpts, author names, categories, and tags with a clear button.
- **Multi-Dimensional Filters**:
  - **Category Tabs**: Dynamic category chips with post count badges (All, Web Architecture, Frontend Systems, AI & ML, Database Design, DevOps & Cloud).
  - **Tag Filter**: One-click tag selector to isolate posts by technology (`#WebRTC`, `#LiveKit`, `#React19`, etc.).
  - **Saved Bookmarks Filter**: Bookmark posts to local state and filter to view only saved articles.
- **Sorting Options**: Sort by Newest First, Most Views, Most Liked, and Shortest Read Time.
- **Interactive Post Cards**: Category badges, author info, live likes count toggle with heart animation, and bookmark toggling.
- **Full Article Modal**: In-depth modal with keyboard `Escape` dismissal, link sharing, and full section-by-section article reader view.
- **Empty State**: Clear feedback and single-click reset when search queries yield zero results.

## Build & Run
```bash
# Install dependencies
bun install   # or npm install

# Start development server
bun run dev   # or npm run dev

# Build for production
bun run build # or npm run build
```
