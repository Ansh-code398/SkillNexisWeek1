import './BlogNavbar.css';

export const BlogNavbar = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="blog-navbar">
      <div className="navbar-container">
        {/* Brand */}
        <div className="navbar-brand">
          <span className="brand-icon">&lt;/&gt;</span>
          <span className="brand-name">Ansh<span className="accent">Blog</span></span>
        </div>

        {/* Global Quick Search */}
        <div className="navbar-search-wrapper">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input
            type="search"
            placeholder="Search articles, tags, authors..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="navbar-search-input"
            aria-label="Search articles"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default BlogNavbar;
