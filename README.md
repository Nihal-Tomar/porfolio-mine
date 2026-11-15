# 🌐 Nihal Singh Tomar — Developer Portfolio

> Modern, high-performance developer portfolio built with clean semantic HTML5, modular CSS architecture, and ES6+ JavaScript modules.

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-blue?style=for-the-badge&logo=vercel)](https://porfolio-mine-fawn.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 👨‍💻 Overview

Portfolio website for **Nihal Singh Tomar**, Full Stack Developer specializing in the MERN stack. Designed with an editorial, architectural light-first aesthetic, fluid micro-interactions, dark mode support, and responsive layouts across all device viewports.

- **Live URL**: [https://porfolio-mine-fawn.vercel.app/](https://porfolio-mine-fawn.vercel.app/)
- **Author**: Nihal Singh Tomar
- **Email**: [nihaltomar95@gmail.com](mailto:nihaltomar95@gmail.com)
- **LinkedIn**: [Nihal Singh Tomar](https://www.linkedin.com/in/nihal-singh-tomar-5385462ba)
- **GitHub**: [@Nihal-Tomar](https://github.com/Nihal-Tomar)

---

## ⚙️ Tech Stack & Dependencies

- **Markup**: Semantic HTML5 with accessibility attributes (`aria-*`, `role`)
- **Styling**: Modular CSS3 using CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, and responsive clamp scaling
- **Scripting**: Native ES6+ JavaScript modules (`import` / `export`) with zero framework bloat
- **Animations & Effects**:
  - [Particles.js](https://vincentgarreau.com/particles.js/) — Ambient particle field
  - [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/) — Scroll-triggered reveals
  - Custom pure JS typewriter and 3D card tilt calculations
  - SVG progress ring & mathematical clamping preloader
- **Forms**: [EmailJS](https://www.emailjs.com/) browser SDK integration
- **Icons**: [Font Awesome 6](https://fontawesome.com/) & [Devicon](https://devicon.dev/)
- **Typography**: Instrument Serif & DM Sans (via Google Fonts)

---

## 🏛️ Architecture & Folder Structure

The repository follows an industry-standard frontend architectural structure emphasizing separation of concerns, modularity, and maintainability:

```text
porfolio-mine/
├── index.html                  # Semantic entry point with critical path styling
├── package.json                # Lightweight package manifest with local dev scripts
├── .gitignore                  # Standard environment and OS exclusion rules
├── README.md                   # Technical documentation
│
├── assets/                     # Static media and assets
│   └── images/
│       ├── icons/              # Site icons & favicons
│       │   └── favicon.png
│       ├── profile/            # Author portrait and bio photography
│       │   ├── ns1.png
│       │   ├── ns2.png
│       │   ├── ns4.png
│       │   └── nst3.png
│       └── projects/           # Featured project showcase previews
│           ├── apnakartpreview.png
│           ├── studentportal.png
│           ├── todolist.png
│           └── weather.png
│
└── src/                        # Core source code
    ├── css/                    # Modular 7-1 inspired CSS architecture
    │   ├── main.css            # Central stylesheet orchestrator
    │   ├── base/               # Global foundational styles
    │   │   ├── reset.css       # Box model resets, document base, ambient canvas
    │   │   ├── typography.css  # Editorial typography, headings, serif accents
    │   │   └── variables.css   # CSS Custom Properties (design tokens & dark theme)
    │   ├── components/         # Reusable UI components
    │   │   ├── buttons.css     # Buttons, badges, and interactive controls
    │   │   └── preloader.css   # Self-contained architectural preloader overlay
    │   ├── layout/             # Structural site scaffolding
    │   │   ├── chrome.css      # Progress indicator, side nav dots, cursor, particles
    │   │   ├── footer.css      # Closing rhythm band & footer socials
    │   │   └── navbar.css      # Floating pill navigation & responsive drawer
    │   ├── sections/           # Isolated styles per page section
    │   │   ├── about.css       # Bio, photo framing, and credential stats
    │   │   ├── contact.css     # Contact form, direct links, and WhatsApp CTA
    │   │   ├── experience.css  # Timeline tabs, milestones, and education
    │   │   ├── hero.css        # Hero layout, orbital portrait, and floating badges
    │   │   ├── projects.css    # Featured project grid, cards, and tags
    │   │   ├── services.css    # Service offering cards & icon highlights
    │   │   └── skills.css      # Categorized skill pill badges & architecture cards
    │   └── utilities/          # Utility helpers & accessibility overrides
    │       └── animations.css  # Viewport reveal animations & prefers-reduced-motion
    │
    └── js/                     # Modular JavaScript architecture
        ├── main.js             # Application entry point & lifecycle bootstrapper
        ├── components/         # Self-contained component scripts
        │   └── preloader.js    # Preloader rAF animation loop & curtain exit
        ├── modules/            # Discrete feature modules
        │   ├── animations.js   # Particles, AOS scroll animations, and lazy loading
        │   ├── contact.js      # Form validation, status alerts, and EmailJS handler
        │   ├── counters.js     # IntersectionObserver stat number counters
        │   ├── cursor.js       # Custom interactive trailing cursor
        │   ├── navigation.js   # Sticky navbar and mobile navigation drawer
        │   ├── scroll.js       # Top progress bar, side-nav dots, and back-to-top
        │   ├── theme.js        # Light / Dark theme toggling & persistence
        │   ├── tilt.js         # Interactive 3D mouse parallax on cards
        │   ├── timeline.js     # Experience / Education tab switcher
        │   └── typewriter.js   # Multi-role typewriter animation
        └── utils/              # Reusable functional helpers
            └── helpers.js      # Clamping, email validation, and async delay
```

---

## 🚀 Running Locally

Because the project leverages standard ES6 JavaScript modules, it should be served through a local HTTP server:

### Option 1: Using Node.js (Recommended)

```bash
# Start local development server via npx
npm start
# or
npx serve .
```

### Option 2: Using Python 3

```bash
# Start built-in Python HTTP server on port 8000
python -m http.server 8000
```

Open `http://localhost:8000` (or `http://localhost:3000` for `serve`) in your browser.

### Option 3: VS Code Live Server

Right-click `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🎨 Design System & Theming

- **Tokens & Colors**: Defined in `src/css/base/variables.css`.
  - Light Editorial Canvas: `#FAF7F2`
  - High Contrast Rhythm Bands: `#161D3D`
  - Brand Primary Accent: `#243B80`
  - Soft Lavender Pill Accent: `#C9B8FF`
- **Dark Mode**: Applied automatically via `[data-theme="dark"]` on `<html>`.
- **Accessibility**:
  - Full keyboard navigation and tab indexing.
  - ARIA attributes on modal menus, preloaders, and state toggles.
  - Strict `prefers-reduced-motion` overrides in `src/css/utilities/animations.css`.

---

## 🛠️ Development Guidelines

1. **Modular CSS**:
   - Place section-specific styles strictly within `src/css/sections/`.
   - Never write inline styles in HTML.
   - Use design tokens (`var(--...)`) for colors, shadows, and spacing.
2. **Modular JavaScript**:
   - Keep `src/js/main.js` purely as an entry orchestrator.
   - Add new features as isolated modules in `src/js/modules/`.
   - Use explicit `.js` extensions for all ES6 relative imports.
3. **Asset Management**:
   - Place project screenshots in `assets/images/projects/`.
   - Place headshots and avatars in `assets/images/profile/`.
   - Keep filenames lowercase and kebab-case or descriptive.

---

## 📄 License

This repository is open source and available under the [MIT License](LICENSE).
