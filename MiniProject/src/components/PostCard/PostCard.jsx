import React, { useState } from 'react';
import './PostCard.css';

export const PostCard = ({
  post,
  onReadClick,
  onTagClick,
}) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <article className="post-card" onClick={() => onReadClick(post)}>
      {/* Cover Media */}
      <div className="post-card-media">
        <img src={post.coverImage} alt={post.title} loading="lazy" />
        <span className="post-card-category">{post.category}</span>
      </div>

      {/* Content */}
      <div className="post-card-content">
        <div className="post-card-meta">
          <span className="post-read-time">{post.readTime}</span>
          <span className="meta-separator">•</span>
          <span className="post-views">👁️ {post.views.toLocaleString()}</span>
        </div>

        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.excerpt}</p>

        {/* Tags */}
        <div className="post-card-tags">
          {post.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="card-tag-pill"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="post-card-footer">
        <div className="post-author-info">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="post-author-avatar"
            loading="lazy"
          />
          <div className="author-texts">
            <span className="author-name">{post.author.name}</span>
            <span className="post-date">{post.publishedDate}</span>
          </div>
        </div>

        <button
          type="button"
          className={`post-like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          <span className="heart-icon">{isLiked ? '❤️' : '🤍'}</span>
          <span className="likes-count">{likes}</span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
