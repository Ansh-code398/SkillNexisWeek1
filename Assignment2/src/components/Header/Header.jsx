import React, { useState } from 'react';
import './Header.css';

/**
 * Reusable Header Component
 * Supports dynamic rendering of navigation menus, active state, user profile, brand info, and action slots.
 */
export const Header = ({
  brand = { name: 'SkillNexis', logo: null, href: '#' },
  navItems = [],
  activeId,
  onNavClick,
  actions,
  sticky = true,
  className = '',
  ...props
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e, item) => {
    if (item.href?.startsWith('#') && onNavClick) {
      e.preventDefault();
      onNavClick(item.id, item);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`reusable-header ${sticky ? 'header-sticky' : ''} ${className}`} {...props}>
      <div className="header-inner">
        {/* Brand */}
        <a href={brand.href || '#'} className="header-brand">
          {brand.logo ? (
            <span className="brand-logo-icon">{brand.logo}</span>
          ) : (
            <span className="brand-badge-icon">SN</span>
          )}
          <span className="brand-title">{brand.name}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Main Navigation">
          <ul className="nav-items-list">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="nav-list-item">
                  <a
                    href={item.href || '#'}
                    className={`nav-anchor ${isActive ? 'nav-anchor-active' : ''}`}
                    onClick={(e) => handleLinkClick(e, item)}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="nav-item-badge">{item.badge}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right Actions & User Profile */}
        <div className="header-right-slot">
          {actions}

          {/* Mobile Hamburger Button */}
          {navItems.length > 0 && (
            <button
              type="button"
              className="header-mobile-toggle"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {!mobileMenuOpen ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu preview-icon"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>  
            }
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="header-mobile-dropdown">
          <ul className="mobile-nav-list">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href || '#'}
                    className={`mobile-nav-link ${isActive ? 'mobile-active' : ''}`}
                    onClick={(e) => handleLinkClick(e, item)}
                  >
                    <span>{item.label}</span>
                    {item.badge && <span className="nav-item-badge">{item.badge}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
