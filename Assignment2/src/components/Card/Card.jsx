import React from 'react';
import './Card.css';

/**
 * Reusable Card Component
 * Supports dynamic rendering of images, badges, tags, custom children, and action footers.
 */
export const Card = ({
  title,
  subtitle,
  badge,
  badgeVariant = 'primary',
  image,
  description,
  tags = [],
  variant = 'default',
  footer,
  actions,
  onClick,
  isHoverable = true,
  children,
  className = '',
  ...props
}) => {
  return (
    <article
      className={`reusable-card card-${variant} ${isHoverable ? 'card-hoverable' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {image && (
        <div className="card-media">
          <img src={image} alt={title || 'Card media'} loading="lazy" />
          {badge && (
            <span className={`card-badge-overlay badge-${badgeVariant}`}>{badge}</span>
          )}
        </div>
      )}

      <div className="card-body">
        {!image && badge && (
          <div className="card-badge-wrapper">
            <span className={`card-badge badge-${badgeVariant}`}>{badge}</span>
          </div>
        )}

        {title && <h3 className="card-title">{title}</h3>}
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        {description && <p className="card-description">{description}</p>}

        {tags && tags.length > 0 && (
          <div className="card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="card-tag">#{tag}</span>
            ))}
          </div>
        )}

        {children && <div className="card-custom-content">{children}</div>}
      </div>

      {(footer || actions) && (
        <div className="card-footer">
          {footer}
          {actions && <div className="card-actions-group">{actions}</div>}
        </div>
      )}
    </article>
  );
};

export default Card;
