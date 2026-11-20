import React from 'react';
import './Footer.css';

/**
 * Reusable Footer Component
 * Supports dynamic rendering of brand info, grouped link columns, social media links, and copyright notices.
 */
export const Footer = ({
  brand = {
    name: 'SkillNexis',
    description: 'Empowering future developers with practical hands-on engineering experience.',
  },
  columns = [],
  socials = [],
  copyright,
  bottomLinks = [],
  className = '',
  ...props
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`reusable-footer ${className}`} {...props}>
      <div className="footer-inner">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-brand-title">
              <span>{brand.name}</span>
            </div>
            {brand.description && (
              <p className="footer-brand-desc">{brand.description}</p>
            )}

            {socials && socials.length > 0 && (
              <div className="footer-social-row">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href || '#'}
                    className="footer-social-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    {social.icon || social.name.charAt(0)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Link Columns */}
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="footer-links-col">
              <h4 className="footer-col-heading">{column.title}</h4>
              <ul className="footer-col-list">
                {column.links?.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href || '#'}
                      className="footer-link-item"
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copy">
            {copyright || `© ${currentYear} ${brand.name}. All rights reserved.`}
          </p>

          {bottomLinks.length > 0 && (
            <ul className="footer-bottom-links">
              {bottomLinks.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href || '#'}>{item.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
