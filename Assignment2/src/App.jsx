import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Card from './components/Card/Card';
import Button from './components/Button/Button';
import Form from './components/Form/Form';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [clickCount, setClickCount] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [formSubmissions, setFormSubmissions] = useState([]);

  // Dynamic cards state
  const [cards, setCards] = useState([
    {
      id: 1,
      title: 'Card Component',
      subtitle: 'This is a simple card component.',
      likes: 0,
    }
  ]);

  // Dynamic card form values
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState('');
  const [newCardBadge, setNewCardBadge] = useState('New');
  const [newCardVariant, setNewCardVariant] = useState('default');

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCardTitle.trim()) return;
    const newCard = {
      id: Date.now(),
      title: newCardTitle,
      subtitle: 'User Generated',
      badge: newCardBadge,
      badgeVariant: 'warning',
      description: newCardDesc || '',
      
      likes: 0,
      variant: newCardVariant,
    };
    setCards([newCard, ...cards]);
    setNewCardTitle('');
    setNewCardDesc('');
  };

  const handleLikeCard = (id) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const handleDeleteCard = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  // Header navigation items
  const navItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'about', label: 'About', href: '#' },
  ];

  // Dynamic form schema
  const userRegistrationFields = [
    {
      name: 'fullNameInput',
      label: 'Full Name',
      type: 'text',
      placeholder: 'Ansh Sharma',
      required: true,
      minLength: 3,
    },
    {
      name: 'emailIput',
      label: 'Email Address',
      type: 'email',
      placeholder: 'ansh@example.com',
      required: true,
    },
    {
      name: 'dropdownInput',
      label: 'Dropdown Selection',
      type: 'select',
      required: true,
      options: [
        { value: 'test1', label: 'Test 1' },
        { value: 'test2', label: 'Test 2' },
        { value: 'test3', label: 'Test 3' },
      ],
    },
    {
      name: 'textareaInput',
      label: 'Textarea Input',
      type: 'textarea',
      placeholder: 'Write something here...',
      rows: 3,
    },
    {
      name: 'checkboxInput',
      label: 'Wanna Click the checkbox?',
      type: 'checkbox',
    },
  ];

  const handleFormSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 800));
    setFormSubmissions((prev) => [data, ...prev]);
  };

  // Footer data
  const footerColumns = [
    {
      title: 'Resources',
      links: [
        { label: 'React Documentation', href: 'https://react.dev', isExternal: true },
        { label: 'SkillNexis', href: 'https://skillnexis.in', isExternal: true },
      ],
    },
  ];

  const footerSocials = [
    { name: 'GitHub', href: 'https://github.com/ansh-code398', icon: <svg role="img" viewBox="-3 -2 30 30" fill="#fff" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
    { name: 'Portfolio', href: 'https://anshsharma.vercel.app', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe preview-icon"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg> },
    { name: 'Email', href: 'mailto:anshsharma.code@gmail.com', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail preview-icon"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg> },
  ];

  return (
    <div className="app-shell">
      {/* 1. REUSABLE HEADER */}
      <Header
        brand={{ name: 'AS', href: '#' }}
        navItems={navItems}
        activeId={activeTab}
        onNavClick={(id) => setActiveTab(id)}
      />

      <main className="app-main container">
        {/* Hero Section */}
        <section className="app-hero">
          <h1 className="hero-headline">React Components Practice</h1>
        </section>

          {/* 2. BUTTON COMPONENTS */}
          <section className="demo-section" id="button-demo">
            <div className="demo-section-header">
              <div>
                <h2 className="demo-title">1. Button Component</h2>
                
              </div>
              <div className="state-badge">
                Click Counter: <strong>{clickCount}</strong>
              </div>
            </div>

            <div className="demo-box">
              <h3 className="demo-subtitle">Variants & States</h3>
              <div className="button-wrap-grid">
                <Button
                  variant="primary"
                  onClick={() => setClickCount((c) => c + 1)}
                >
                  Primary Action (+1)
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => setClickCount(0)}
                >
                  Reset Count
                </Button>

                <Button variant="outline">Outline</Button>
                <Button variant="danger">Destructive</Button>
                <Button variant="success">Success State</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button
                  variant="primary"
                  isLoading={buttonLoading}
                  loadingText="Processing..."
                  onClick={() => {
                    setButtonLoading(true);
                    setTimeout(() => setButtonLoading(false), 2000);
                  }}
                >
                  {buttonLoading ? 'Loading' : 'Trigger Async Loading'}
                </Button>
                <Button variant="secondary" disabled>
                  Disabled State
                </Button>
              </div>

              <h3 className="demo-subtitle" style={{ marginTop: '1.5rem' }}>Sizes</h3>
              <div className="button-wrap-grid">
                <Button size="sm" variant="primary">Small (sm)</Button>
                <Button size="md" variant="primary">Medium (md)</Button>
                <Button size="lg" variant="primary">Large (lg)</Button>
              </div>
            </div>
          </section>

        {/* 3. CARD COMPONENT PLAYGROUND */}
          <section className="demo-section" id="card-demo">
            <div className="demo-section-header">
              <div>
                <h2 className="demo-title">2. Card Component & Dynamic State</h2>
              </div>
              <span className="state-badge">
                Active Cards: <strong>{cards.length}</strong>
              </span>
            </div>

            {/* Dynamic Card Adder Form */}
            <form className="card-adder-panel" onSubmit={handleAddCard}>
              <div className="adder-inputs">
                <input
                  type="text"
                  placeholder="Card Title (e.g. Microservices Gateway)"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  className="field-input"
                  required
                />
                <input
                  type="text"
                  placeholder="Short Description..."
                  value={newCardDesc}
                  onChange={(e) => setNewCardDesc(e.target.value)}
                  className="field-input"
                />
                <select
                  value={newCardVariant}
                  onChange={(e) => setNewCardVariant(e.target.value)}
                  className="field-input"
                >
                  <option value="default">Default Variant</option>
                  <option value="elevated">Elevated Variant</option>
                  <option value="glass">Glass Variant</option>
                </select>
              </div>
              <Button type="submit" variant="success" size="md">
                + Add Card
              </Button>
            </form>

            {/* Cards Grid */}
            <div className="cards-demo-grid">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  title={card.title}
                  subtitle={card.subtitle}
                  badge={card.badge}
                  badgeVariant={card.badgeVariant}
                  description={card.description}
                  tags={card.tags}
                  variant={card.variant}
                  footer={
                    <span className="likes-counter">
                      ❤️ {card.likes} {card.likes === 1 ? 'like' : 'likes'}
                    </span>
                  }
                  actions={
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleLikeCard(card.id)}
                      >
                        Like
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        Remove
                      </Button>
                    </>
                  }
                />
              ))}
            </div>
          </section>

        {/* 4. FORM COMPONENT PLAYGROUND */}
          <section className="demo-section" id="form-demo">
            <div className="demo-section-header">
              <div>
                <h2 className="demo-title">3. Form Component (Schema-Driven)</h2>
                <p className="demo-desc">
                  Generates form controls dynamically from schema arrays, handles state, validation, and async submit.
                </p>
              </div>
            </div>

            <div className="form-demo-grid">
              <Form
                title="Engineering Profile Submission"
                subtitle="Fill out this dynamic schema-driven form to test state reconciliation."
                fields={userRegistrationFields}
                onSubmit={handleFormSubmit}
                submitText="Submit Profile Data"
                resetText="Reset Fields"
              />

              {/* Submissions State Inspector */}
              <div className="state-inspector-card">
                <h3 className="inspector-title">Submissions Inspector</h3>

                {formSubmissions.length === 0 ? (
                  <div className="empty-inspector">
                    No submissions yet. Submit the form on the left to see live state.
                  </div>
                ) : (
                  <div className="submissions-list">
                    {formSubmissions.map((sub, idx) => (
                      <div key={idx} className="submission-item">
                        <div className="submission-header">
                          <span className="submission-badge">Submission #{formSubmissions.length - idx}</span>
                          <span className="submission-time">Just now</span>
                        </div>
                        <pre className="submission-json">{JSON.stringify(sub, null, 2)}</pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
      </main>

      {/* 5. REUSABLE FOOTER */}
      <Footer
        brand={{
          name: 'Ansh Sharma',
          description: 'Full Stack Developer',
        }}
        columns={footerColumns}
        socials={footerSocials}
        bottomLinks={[
          { label: 'GitHub Repository', href: 'https://github.com/ansh-code398' },
        ]}
      />
    </div>
  );
}

export default App;
