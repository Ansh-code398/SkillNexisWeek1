# Assignment 2: Reusable React Components Practice

A modular component system featuring 5 reusable, production-ready React components demonstrating dynamic rendering via props and state.

## 5 Reusable Components
1. **Header (`src/components/Header`)**
   - Props: `brand`, `navItems`, `activeId`, `onNavClick`, `actions`, `user`, `sticky`.
   - Dynamic rendering: dynamically maps navigation links with active state styling, renders optional user profile/avatar, mobile drawer menu, and action slots.

2. **Footer (`src/components/Footer`)**
   - Props: `brand`, `columns`, `socials`, `copyright`, `bottomLinks`.
   - Dynamic rendering: renders multi-column grouped navigation links, social icons, and dynamic copyright year.

3. **Card (`src/components/Card`)**
   - Props: `title`, `subtitle`, `badge`, `badgeVariant`, `image`, `description`, `tags`, `variant`, `footer`, `actions`, `isHoverable`.
   - Dynamic rendering: handles image overlays, badge variants, dynamic tag clouds, and custom footer action buttons.

4. **Button (`src/components/Button`)**
   - Props: `variant`, `size`, `isLoading`, `loadingText`, `disabled`, `icon`, `iconPosition`, `onClick`.
   - Dynamic rendering: supports variants (`primary`, `secondary`, `outline`, `danger`, `success`, `ghost`), sizes (`sm`, `md`, `lg`), and animated async loading state spinner.

5. **Form (`src/components/Form`)**
   - Props: `title`, `subtitle`, `fields`, `onSubmit`, `submitText`, `resetText`, `initialValues`.
   - Dynamic rendering: schema-driven form field rendering (`text`, `email`, `select`, `textarea`, `checkbox`), integrated field validation, error states with `aria-invalid` and `aria-describedby`, and async submission handler.

## Dynamic Props & State Demonstration
- **Interactive Playground**: Switch between all components or isolate specific component groups.
- **Dynamic State Manipulation**: Add custom cards via live inputs, like cards to increment likes in state, and delete cards.
- **Form Schema & Submissions**: Submit schema-driven dynamic inputs and inspect real-time JSON payloads in the inspector panel.
- **Button State**: Live click counter and async loading state simulation.

## Build & Run
```bash
# Install dependencies
bun install   # or npm install

# Start development server
bun run dev   # or npm run dev

# Build for production
bun run build # or npm run build
```
