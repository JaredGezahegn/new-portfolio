# Requirements Document

## Introduction

This feature upgrades Yared Gezahegn's One Piece-themed developer portfolio from a Frontend Developer identity to a Full-Stack Developer identity. The upgrade covers four areas: updating the headline and bio copy, adding a new full-stack project entry, expanding the skills section with backend/DevOps technologies, and surfacing authentication knowledge — all while preserving the pirate theme and keeping the site performant.

The portfolio is built with React, Tailwind CSS, and Vite. Data lives in `src/data/portfolio.js`; the About section is rendered by `src/sections/About.jsx`.

---

## Glossary

- **Portfolio**: The React + Tailwind CSS + Vite single-page application being modified.
- **personalInfo**: The exported object in `src/data/portfolio.js` that holds name, title, bio, and other identity fields.
- **Skills**: The exported `skills` array in `src/data/portfolio.js`, each entry having `name`, `level`, `icon`, `crewRole`, and `category` fields.
- **Projects**: The exported `projects` array in `src/data/portfolio.js`, each entry having `id`, `title`, `description`, `longDescription`, `image`, `technologies`, `category`, `liveUrl`, `githubUrl`, and `featured` fields.
- **About_Section**: The React component at `src/sections/About.jsx` that renders the developer bio.
- **Hero_Section**: The React component at `src/sections/Hero.jsx` that displays `personalInfo.title`.
- **Skill_Card**: The `src/components/SkillCard.jsx` component that renders a single skill entry.
- **Project_Card**: The `src/components/ProjectCard.jsx` component that renders a single project entry.
- **Devil_Fruit_Registry**: The new full-stack demo project to be added, themed as a One Piece Devil Fruit CRUD application backed by Django and PostgreSQL/Supabase.
- **JWT**: JSON Web Token — a standard for stateless authentication between client and server.
- **Haki**: In-universe One Piece power; used as a thematic label for backend/advanced skills.
- **Grand_Line**: Thematic metaphor for the developer's coding journey used throughout the portfolio copy.

---

## Requirements

### Requirement 1: Update Developer Identity — Title and Bio

**User Story:** As a visitor to the portfolio, I want to see "Full-Stack Developer" (or "Full-Stack Pirate") as the headline role, so that I immediately understand the developer's current skill identity.

#### Acceptance Criteria

1. THE Portfolio SHALL display the value `"Full-Stack Developer"` (or `"Full-Stack Pirate"`) in `personalInfo.title` in place of `"Frontend Developer"`.
2. WHEN the Hero_Section renders, THE Hero_Section SHALL display the updated `personalInfo.title` value without any additional code changes to the component.
3. THE Portfolio SHALL update `personalInfo.bio` to reflect a full-stack identity, referencing the transition from the "Sails" (Frontend) to the "Engine Room" (Backend/Python/Django) in One Piece pirate metaphor language.
4. WHEN the About_Section renders, THE About_Section SHALL display bio copy that mentions both frontend ("Sails") and backend ("Engine Room") expertise.
5. THE About_Section SHALL retain all existing Framer Motion animation wrappers and Tailwind CSS class names so that visual style and animation behaviour are unchanged.

---

### Requirement 2: Update About Section Bio Copy

**User Story:** As a visitor, I want to read an About section that tells the story of a full-stack developer, so that I understand the breadth of skills beyond just frontend work.

#### Acceptance Criteria

1. THE About_Section SHALL render three paragraphs of bio copy that together cover: (a) the developer's full-stack identity and One Piece theme, (b) the journey from frontend "Sails" to backend "Engine Room" including Python and Django, and (c) authentication/security knowledge framed as "Secure Communications for the Revolutionary Army."
2. WHEN the About_Section renders, THE About_Section SHALL display the developer's name using `personalInfo.name` from the data file, not as a hardcoded string.
3. THE About_Section SHALL preserve the existing "View My Resume" call-to-action button with its current styling and `personalInfo.resume` href.
4. IF the `personalInfo.bio` field is empty or undefined, THEN THE About_Section SHALL render a fallback paragraph so the section is never visually empty.

---

### Requirement 3: Add New Full-Stack Project — Devil Fruit Registry

**User Story:** As a recruiter or technical reviewer, I want to see a project that demonstrates Django + PostgreSQL/Supabase CRUD functionality, so that I can verify the developer's backend and data management skills.

#### Acceptance Criteria

1. THE Portfolio SHALL include a new entry in the `projects` array with `title: "Devil Fruit Registry"`.
2. THE Devil_Fruit_Registry project entry SHALL list `technologies` that include at minimum: `"Django"`, `"PostgreSQL"`, `"Supabase"`, `"Python"`, and `"React"`.
3. THE Devil_Fruit_Registry project entry SHALL have `category: "Full-Stack Application"` so it is distinguishable from existing categories.
4. THE Devil_Fruit_Registry project entry SHALL have `featured: true` so it appears in the featured projects view.
5. THE Devil_Fruit_Registry project entry SHALL include a `description` that references CRUD operations (Create, Read, Update, Delete) and the One Piece Devil Fruit theme.
6. THE Devil_Fruit_Registry project entry SHALL include a `longDescription` that explains the Django REST backend, Supabase/PostgreSQL database, and React frontend architecture.
7. WHEN the Projects section renders, THE Project_Card SHALL display the Devil_Fruit_Registry entry using the same card layout as existing projects.
8. THE Portfolio SHALL add `"Full-Stack Application"` to the `categories` array so the filter UI includes the new category.

---

### Requirement 4: Expand Skills Section — Django, PostgreSQL, Docker

**User Story:** As a technical reviewer, I want to see Django, PostgreSQL, and Docker listed as skills, so that I can assess the developer's backend and DevOps capabilities.

#### Acceptance Criteria

1. THE Portfolio SHALL add a skill entry for `"Django"` with `category: "Backend"`, `icon: "🦄"` (or a suitable alternative), `crewRole: "Haki Master"`, and a `level` value between 70 and 85.
2. THE Portfolio SHALL add a skill entry for `"PostgreSQL"` with `category: "Database"`, `crewRole: "Treasure Keeper"`, and a `level` value between 70 and 80.
3. THE Portfolio SHALL add a skill entry for `"Docker"` with `category: "DevOps"`, `crewRole: "Shipwright"` (or a unique crew role), and a `level` value between 65 and 75.
4. WHEN the Skills section renders, THE Skill_Card SHALL display each new skill entry using the same card layout and animation as existing skills.
5. THE Portfolio SHALL not remove or modify any existing skill entries when adding the new ones.
6. WHERE the skills data includes a `category` field, THE Skills section SHALL be capable of filtering or grouping by the new `"Backend"` and `"DevOps"` categories without breaking existing filter behaviour.

---

### Requirement 5: Surface Authentication / Security Knowledge

**User Story:** As a recruiter, I want to see that the developer understands JWT-based authentication, so that I know they can build secure full-stack applications.

#### Acceptance Criteria

1. THE About_Section SHALL include a paragraph or highlighted callout that references JWT authentication knowledge, framed in One Piece theme as "Secure Communications for the Revolutionary Army."
2. THE Portfolio SHALL add a skill entry for `"JWT Auth"` with `category: "Security"`, `crewRole: "Revolutionary"`, and a `level` value between 70 and 80.
3. WHEN the About_Section renders, THE About_Section SHALL display the authentication reference without breaking the existing paper-texture card layout or Tailwind CSS classes.
4. IF a visitor reads only the About section, THEN THE About_Section SHALL convey both the existence of authentication knowledge and its practical application (securing APIs / user sessions).

---

### Requirement 6: Performance — Animation-Heavy Site Remains Fast

**User Story:** As a visitor on a mid-range device, I want the portfolio to load and animate smoothly after the new content is added, so that the user experience is not degraded.

#### Acceptance Criteria

1. THE Portfolio SHALL lazy-load any new project images using the HTML `loading="lazy"` attribute (or React equivalent) so that initial page load time is not increased by new image assets.
2. WHEN new skill or project entries are added to the data arrays, THE Portfolio SHALL not introduce additional Framer Motion animation instances beyond what is already used per card component, so that animation overhead scales linearly with card count.
3. THE Portfolio SHALL keep all new data additions within `src/data/portfolio.js` as plain JavaScript objects, with no new external network requests introduced at the data layer.
4. IF a new project has no `image` asset available, THEN THE Project_Card SHALL render a themed placeholder (e.g., a pirate flag emoji or a solid colour block) so the layout does not break.
