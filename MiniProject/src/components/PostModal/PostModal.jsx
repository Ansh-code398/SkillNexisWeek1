import React, { useEffect, useState } from 'react';
import './PostModal.css';

export const PostModal = ({ post, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!post) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close article modal"
        >
          ✕
        </button>

        {/* Modal Banner */}
        <div className="modal-media-header">
          <img src={post.coverImage} alt={post.title} className="modal-cover-img" />
          <div className="modal-media-overlay" />
          <div className="modal-badge-row">
            <span className="modal-category">{post.category}</span>
            <span className="modal-time">{post.readTime}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-content-area">
          <h2 className="modal-article-title">{post.title}</h2>

          <div className="modal-author-strip">
            <div className="author-left">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="modal-author-avatar"
              />
              <div>
                <span className="modal-author-name">{post.author.name}</span>
                <span className="modal-author-role">{post.author.role} • {post.publishedDate}</span>
              </div>
            </div>

            <button
              type="button"
              className="modal-share-btn"
              onClick={handleShare}
            >
              {copied ? '✓ Link Copied' : '🔗 Share Article'}
            </button>
          </div>

          <div className="modal-article-body">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="article-subheading">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={index} className="article-paragraph">
                  {paragraph}
                </p>
              );
            })}
          </div>

          <div className="modal-tags-section">
            <span className="tags-heading">Topics Covered:</span>
            <div className="modal-tags-list">
              {post.tags.map((tag) => (
                <span key={tag} className="modal-tag-item">#{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
