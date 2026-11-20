import React, { useState, useMemo } from 'react';
import postsData from './data/posts.json';
import BlogNavbar from './components/BlogNavbar/BlogNavbar';
import HeroFeatured from './components/HeroFeatured/HeroFeatured';
import FilterBar from './components/FilterBar/FilterBar';
import PostCard from './components/PostCard/PostCard';
import PostModal from './components/PostModal/PostModal';
import './App.css';

export function App() {
  const [posts] = useState(postsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [activeArticle, setActiveArticle] = useState(null);

  // Featured Post Spotlight
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  // Dynamic Categories with Counts
  const categories = useMemo(() => {
    const counts = { All: posts.length };
    posts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
    }));
  }, [posts]);

  // Unique Tags extraction
  const allTags = useMemo(() => {
    const tagSet = new Set();
    posts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [posts]);



  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSelectedTag('');
    setSortBy('newest');
  };

  const isFiltered = Boolean(
    searchQuery.trim() ||
    activeCategory !== 'All' ||
    selectedTag !== ''
  );

  // Filtered and Sorted Posts computation
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {

        // Category filter
        if (activeCategory !== 'All' && post.category !== activeCategory) {
          return false;
        }

        // Tag filter
        if (selectedTag && !post.tags.includes(selectedTag)) {
          return false;
        }

        // Search query filter (matches title, excerpt, content, tags, author)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = post.title.toLowerCase().includes(q);
          const matchExcerpt = post.excerpt.toLowerCase().includes(q);
          const matchAuthor = post.author.name.toLowerCase().includes(q);
          const matchCategory = post.category.toLowerCase().includes(q);
          const matchTag = post.tags.some((t) => t.toLowerCase().includes(q));

          if (!matchTitle && !matchExcerpt && !matchAuthor && !matchCategory && !matchTag) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'views') {
          return b.views - a.views;
        }
        if (sortBy === 'likes') {
          return b.likes - a.likes;
        }
        if (sortBy === 'readTime') {
          return parseInt(a.readTime) - parseInt(b.readTime);
        }
        // Default 'newest'
        return b.id.localeCompare(a.id);
      });
  }, [posts, searchQuery, activeCategory, selectedTag, sortBy]);

  return (
    <div className="blog-app">
      {/* Navbar */}
      <BlogNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="blog-main-content">
        <div className="container">
          {/* Spotlight Hero Section (visible when not actively searching) */}
          {!isFiltered && (
            <HeroFeatured
              post={featuredPost}
              onReadClick={(post) => setActiveArticle(post)}
            />
          )}

          {/* Section Heading & Filter Bar */}
          <div className="feed-header">
            <div>
              <h2 className="feed-title">
                {isFiltered
                  ? 'Filtered Articles'
                  : 'Latest Articles & Publications'}
              </h2>
              <p className="feed-subtitle">
                Explore engineering architectures, distributed systems, and modern frontend paradigms.
              </p>
            </div>
          </div>

          <FilterBar
            categories={categories}
            activeCategory={activeCategory}
            onCategorySelect={setActiveCategory}
            tags={allTags}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalCount={posts.length}
            filteredCount={filteredPosts.length}
            onResetFilters={handleResetFilters}
            isFiltered={isFiltered}
          />

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onReadClick={(p) => setActiveArticle(p)}
                  onTagClick={(tag) => setSelectedTag(tag)}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state-card">
              <div className="empty-state-icon">🔍</div>
              <h3 className="empty-state-title">No articles found</h3>
              <p className="empty-state-text">
                We couldn't find any articles matching your search criteria. Try modifying your search keywords or clearing active filters.
              </p>
              <button
                type="button"
                className="empty-reset-btn"
                onClick={handleResetFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Article Detail Modal */}
      {activeArticle && (
        <PostModal
          post={activeArticle}
          onClose={() => setActiveArticle(null)}
        />
      )}

      {/* Footer */}
      <footer className="blog-footer">
        <div className="container footer-content">
          <p className="footer-left">
            &copy; {new Date().getFullYear()} AnshBlog
          </p>
          <p className="footer-right">
            Made by <a href="https://github.com/ansh-code398" target="_blank" rel="noopener noreferrer">Ansh Sharma</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
