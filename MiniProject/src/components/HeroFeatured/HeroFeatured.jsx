import React from 'react';
import './HeroFeatured.css';

export const HeroFeatured = ({ post, onReadClick }) => {
  if (!post) return null;

  return (
    <section className="hero-featured" aria-label="Featured Story">
      <div className="featured-card">
        <div className="featured-content">
          <div className="featured-meta-top">
            <span className="category-tag">{post.category}</span>
            <span className="read-time">{post.readTime}</span>
          </div>

          <h1 className="featured-title">
            <button
              type="button"
              className="featured-title-btn"
              onClick={() => onReadClick(post)}
            >
              {post.title}
            </button>
          </h1>

          <p className="featured-excerpt">{post.excerpt}</p>

          <div className="featured-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag-pill">#{tag}</span>
            ))}
          </div>

          <div className="featured-footer">
            <div className="author-card">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="author-avatar"
                loading="lazy"
              />
              <div className="author-details">
                <span className="author-name">{post.author.name}</span>
                <span className="post-date">{post.author.role} • {post.publishedDate}</span>
              </div>
            </div>

            <button
              type="button"
              className="read-story-btn"
              onClick={() => onReadClick(post)}
            >
              <span>Read Full Article</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </div>
        </div>

        <div className="featured-visual">
          <img
            src={post.coverImage}
            alt={post.title}
            className="featured-cover"
            loading="eager"
          />
          <div className="visual-overlay" />
        </div>
      </div>
    </section>
  );
};

export default HeroFeatured;
