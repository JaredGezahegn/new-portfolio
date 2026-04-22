# Implementation Plan: portfolio-fullstack-upgrade

## Overview

Upgrade the portfolio from a Frontend Developer identity to Full-Stack Developer by editing two source files (`src/data/portfolio.js` and `src/sections/About.jsx`), one component (`src/components/ProjectCard.jsx`), and adding property-based tests with fast-check. All changes are additive or in-place edits — no new components or routes.

## Tasks

- [x] 1. Update `personalInfo` in `src/data/portfolio.js`
  - Change `personalInfo.title` from `"Frontend Developer"` to `"Full-Stack Developer"`
  - Update `personalInfo.bio` to reference the transition from frontend "Sails" to backend "Engine Room" (Python/Django) in pirate-theme language
  - _Requirements: 1.1, 1.3_

- [x] 2. Rewrite bio paragraphs in `src/sections/About.jsx`
  - [x] 2.1 Add bio fallback guard before the JSX return
    - Add `const bioContent = personalInfo.bio || "A full-stack developer sailing the Grand Line of code. 🏴‍☠️";`
    - _Requirements: 2.4_
  - [x] 2.2 Rewrite the three `<p>` paragraphs
    - Paragraph 1: full-stack identity + One Piece theme, uses `personalInfo.name` (not hardcoded)
    - Paragraph 2: journey from frontend "Sails" to backend "Engine Room", mentions Python and Django
    - Paragraph 3: JWT/security knowledge framed as "Secure Communications for the Revolutionary Army"
    - Preserve all existing Framer Motion wrappers and Tailwind class names unchanged
    - _Requirements: 2.1, 2.2, 2.3, 5.1, 5.3, 5.4_
  - [x] 2.3 Write property test for name data binding (Property 1)
    - **Property 1: For any name string, About renders it**
    - Generate arbitrary non-empty strings for `personalInfo.name`, render `About` with mocked `personalInfo`, assert rendered output contains the generated name
    - **Validates: Requirements 2.2**

- [x] 3. Add new skill entries to `src/data/portfolio.js`
  - Append four entries to the `skills` array (do not modify existing entries):
    - `{ name: "Django", category: "Backend", icon: "🦄", crewRole: "Haki Master", level: 80 }`
    - `{ name: "PostgreSQL", category: "Database", icon: "🐘", crewRole: "Treasure Keeper", level: 75 }`
    - `{ name: "Docker", category: "DevOps", icon: "🐳", crewRole: "Shipwright", level: 70 }`
    - `{ name: "JWT Auth", category: "Security", icon: "🔐", crewRole: "Revolutionary", level: 75 }`
  - _Requirements: 4.1, 4.2, 4.3, 4.5, 5.2_
  - [ ]* 3.1 Write property test for existing skills preservation (Property 2)
    - **Property 2: For any original skill name, it remains in the updated array**
    - Baseline list: all skill names present before this upgrade; assert `skills.some(s => s.name === originalName)` is true for every name in the baseline
    - **Validates: Requirements 4.5**
  - [ ]* 3.2 Write property test for category filter completeness (Property 3)
    - **Property 3: For any skill with a category, filtering by that category includes it**
    - Pick any skill object from the `skills` array; filter `skills` where `s.category === skill.category`; assert the picked skill is in the result
    - **Validates: Requirements 4.6**

- [x] 4. Add Devil Fruit Registry project and update categories in `src/data/portfolio.js`
  - Append to `projects[]`:
    ```js
    {
      id: 9,
      title: "Devil Fruit Registry",
      description: "A CRUD application for cataloguing Devil Fruits — Create, Read, Update, and Delete entries in a One Piece-themed database backed by Django and PostgreSQL.",
      longDescription: "Django REST Framework backend with PostgreSQL via Supabase, secured with JWT authentication. React frontend consumes the REST API to display and manage Devil Fruit entries.",
      image: "/img/devil-fruit-registry.png",
      technologies: ["Django", "PostgreSQL", "Supabase", "Python", "React", "JWT Auth"],
      category: "Full-Stack Application",
      liveUrl: null,
      githubUrl: "https://github.com/JaredGezahegn/devil-fruit-registry",
      featured: true
    }
    ```
  - Append `"Full-Stack Application"` to the `categories` array
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [x] 5. Add `loading="lazy"` to `<img>` in `src/components/ProjectCard.jsx`
  - Add `loading="lazy"` attribute to the existing `<img>` tag
  - _Requirements: 6.1_
  - [ ]* 5.1 Write property test for image lazy-loading (Property 4)
    - **Property 4: For any project object, ProjectCard renders `<img>` with `loading="lazy"`**
    - Generate arbitrary valid project objects (any image path, any title); render `ProjectCard`; assert the rendered `<img>` has `loading="lazy"`
    - **Validates: Requirements 6.1**

- [x] 6. Set up testing infrastructure and write all property-based tests
  - Install `fast-check`, `vitest`, `@testing-library/react`, and `@testing-library/jest-dom` as dev dependencies
  - Configure `vitest` in `vite.config.js` (add `test` block with `environment: "jsdom"` and `setupFiles`)
  - Create `src/tests/setup.js` importing `@testing-library/jest-dom`
  - Create `src/tests/portfolio.test.js` containing all four property tests (Properties 1–4) and the unit/example assertions
  - Each property test runs a minimum of 100 iterations via `fc.assert(fc.property(...))`
  - _Requirements: 1.1, 2.2, 3.1–3.8, 4.1–4.5, 5.2, 6.1_

- [x] 7. Final checkpoint — Ensure all tests pass
  - Run `npx vitest --run` and confirm all tests pass
  - Ask the user if any questions arise before closing out.
