# Design Document

## Feature: portfolio-fullstack-upgrade

---

## Overview

This design covers the upgrade of Yared Gezahegn's One Piece-themed portfolio from a Frontend Developer identity to a Full-Stack Developer identity. All changes are purely additive or in-place edits to two files: `src/data/portfolio.js` (data layer) and `src/sections/About.jsx` (presentation layer). No new components, routes, or external dependencies are introduced.

The approach is deliberately minimal: the data file is the single source of truth, and all existing components (`Hero`, `Skills`, `Projects`, `ProjectCard`, `SkillCard`) already consume that data generically — so adding entries to arrays and updating fields is sufficient to surface new content everywhere.

---

## Architecture

The portfolio follows a flat, data-driven architecture:

```
src/data/portfolio.js          ← single source of truth (plain JS exports)
        │
        ├── personalInfo       → Hero.jsx, About.jsx
        ├── skills[]           → Skills.jsx → SkillCard.jsx
        ├── projects[]         → Projects.jsx → ProjectCard.jsx
        └── categories[]       → Projects.jsx (filter buttons)
```

No state management library is used. Components import directly from the data file. Framer Motion handles all animations at the component level; no animation logic lives in the data file.

**Change surface for this upgrade:**

| File | Change Type |
|---|---|
| `src/data/portfolio.js` | Edit `personalInfo`, append to `skills[]`, append to `projects[]`, append to `categories[]` |
| `src/sections/About.jsx` | Rewrite three bio paragraphs; add bio fallback guard |

No other files require modification.

---

## Components and Interfaces

### `personalInfo` object (data layer)

Current shape — fields being changed are marked:

```js
{
  name: string,
  title: string,          // CHANGE: "Frontend Developer" → "Full-Stack Developer"
  bio: string,            // CHANGE: updated copy referencing Sails + Engine Room
  bounty: string,
  image: string,
  email: string,
  github: string,
  linkedin: string,
  resume: string,
  quote: string,
  crewRole: string
}
```

`Hero.jsx` renders `personalInfo.title` directly — no component changes needed.

### `About.jsx` (presentation layer)

Current structure: one `<motion.div>` wrapper → `paper-texture` card → three `<p>` tags → CTA button.

After upgrade, the structure is identical; only the text content of the three `<p>` tags changes. A fallback guard is added:

```jsx
// Fallback guard (new)
const bioContent = personalInfo.bio || "A full-stack developer sailing the Grand Line of code.";
```

The three paragraphs will cover:
1. Full-stack identity + One Piece theme (uses `personalInfo.name`)
2. Journey from frontend "Sails" to backend "Engine Room" (Python, Django)
3. JWT/security knowledge framed as "Revolutionary Army secure comms"

All existing Framer Motion wrappers (`initial`, `whileInView`, `viewport`, `transition`) and Tailwind class names (`paper-texture`, `rounded-lg`, `p-8`, `border-2`, `border-ink-black`, `space-y-6`, `text-ink-black`) are preserved unchanged.

### `skills[]` array — new entries

Four entries appended (existing entries untouched):

| name | category | icon | crewRole | level |
|---|---|---|---|---|
| Django | Backend | 🦄 | Haki Master | 80 |
| PostgreSQL | Database | 🐘 | Treasure Keeper | 75 |
| Docker | DevOps | 🐳 | Shipwright | 70 |
| JWT Auth | Security | 🔐 | Revolutionary | 75 |

`Skills.jsx` iterates `skills` with `skills.map()` — new entries render automatically via the existing `SkillCard` inline template. No component changes needed.

### `projects[]` array — new entry

One entry appended:

```js
{
  id: 9,
  title: "Devil Fruit Registry",
  description: "A CRUD application for cataloguing Devil Fruits...",
  longDescription: "Django REST Framework backend with PostgreSQL via Supabase...",
  image: "/img/devil-fruit-registry.png",   // placeholder path
  technologies: ["Django", "PostgreSQL", "Supabase", "Python", "React", "JWT Auth"],
  category: "Full-Stack Application",
  liveUrl: null,          // in-progress; ProjectCard renders "🚧 In Progress"
  githubUrl: "https://github.com/JaredGezahegn/devil-fruit-registry",
  featured: true
}
```

`ProjectCard` already handles `liveUrl: null` with the "🚧 In Progress" fallback. The `onError` handler on the `<img>` tag already provides a placeholder if the image asset is missing.

### `categories[]` array

`"Full-Stack Application"` appended. `Projects.jsx` renders filter buttons by mapping over `categories` — no component changes needed.

### `ProjectCard.jsx` — image lazy-loading

The `<img>` tag in `ProjectCard` needs `loading="lazy"` added. This is the only component-level change outside the two primary files:

```jsx
// Before
<img src={project.image} alt={project.title} className="w-full h-full object-cover" onError={...} />

// After
<img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" onError={...} />
```

---

## Data Models

### Skill entry schema

```ts
{
  name: string          // display name
  level: number         // 0–100, used for progress bar width
  icon: string          // emoji
  crewRole: string      // One Piece crew role label
  category: string      // "Frontend" | "Backend" | "Database" | "DevOps" | "Security" | "Tools" | ...
}
```

### Project entry schema

```ts
{
  id: number            // unique, sequential
  title: string
  description: string   // short (1–2 sentences)
  longDescription: string  // full architecture description
  image: string         // path relative to /public
  technologies: string[]
  category: string      // must match an entry in categories[]
  liveUrl: string | null   // null → "In Progress" state in ProjectCard
  githubUrl: string
  featured: boolean     // true → appears in "All" filter view
}
```

### categories array

```ts
string[]   // first entry is always "All"; subsequent entries are category names
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Name data binding

*For any* string value assigned to `personalInfo.name`, the rendered `About` section SHALL contain that exact string in its output.

**Validates: Requirements 2.2**

### Property 2: Existing skills are preserved

*For any* skill name that existed in the `skills` array before this upgrade, that skill name SHALL still be present in the updated `skills` array.

**Validates: Requirements 4.5**

### Property 3: Category filter completeness

*For any* skill object in the `skills` array that has a `category` field, filtering the `skills` array by that category value SHALL include that skill in the result.

**Validates: Requirements 4.6**

### Property 4: Project images are lazy-loaded

*For any* project object rendered by `ProjectCard`, the resulting `<img>` element SHALL have the attribute `loading="lazy"`.

**Validates: Requirements 6.1**

---

## Error Handling

### Missing bio (`personalInfo.bio` empty or undefined)

`About.jsx` adds a fallback guard before rendering:

```jsx
const bioContent = personalInfo.bio || "A full-stack developer sailing the Grand Line of code. 🏴‍☠️";
```

The three paragraphs reference `bioContent` for the first paragraph so the section is never visually empty.

### Missing project image

`ProjectCard` already has an `onError` handler that falls back to a placeholder URL. The Devil Fruit Registry entry uses a local path (`/img/devil-fruit-registry.png`); if the asset is absent, the `onError` fires and renders a placeholder. No additional handling needed.

### `liveUrl: null` for in-progress projects

`ProjectCard` already handles this with a conditional render:

```jsx
{project.liveUrl ? (
  <a href={project.liveUrl}>🌊 Live Demo</a>
) : (
  <div className="cursor-not-allowed">🚧 In Progress</div>
)}
```

The Devil Fruit Registry sets `liveUrl: null` until the project is deployed.

### Category mismatch

If a project's `category` does not appear in the `categories` array, the filter button for that category will never be shown, but the project will still appear under "All" (featured projects). The design ensures `"Full-Stack Application"` is added to both `categories[]` and the Devil Fruit Registry entry simultaneously.

---

## Testing Strategy

This feature is primarily a data and copy update. The changes are:
- Plain JS object mutations (data layer)
- JSX text content changes (presentation layer)
- One HTML attribute addition (`loading="lazy"`)

**PBT applicability assessment:** Most acceptance criteria are concrete data-value checks (EXAMPLE classification) or structural checks (SMOKE). Four criteria yield universal properties suitable for property-based testing: name data binding, skills preservation, category filter completeness, and image lazy-loading.

### Unit / Example Tests

These cover the majority of acceptance criteria:

- Assert `personalInfo.title === "Full-Stack Developer"`
- Assert `personalInfo.bio` contains "Engine Room" and "Sails"
- Assert `projects` array contains an entry with `title: "Devil Fruit Registry"`
- Assert Devil Fruit Registry entry has `technologies` including Django, PostgreSQL, Supabase, Python, React
- Assert Devil Fruit Registry entry has `category: "Full-Stack Application"` and `featured: true`
- Assert `categories` array includes `"Full-Stack Application"`
- Assert skills array contains entries for Django, PostgreSQL, Docker, JWT Auth with correct category/level/crewRole values
- Render `About`, assert three `<p>` elements present, assert text contains "JWT", "Engine Room", "Sails"
- Render `About` with `personalInfo.bio = undefined`, assert fallback paragraph renders
- Render `About`, assert CTA button has `href` matching `personalInfo.resume`

### Property-Based Tests

Using a PBT library appropriate for the stack (e.g., [fast-check](https://github.com/dubzzz/fast-check) for JavaScript/React):

Each property test runs a minimum of **100 iterations**.

**Property 1 — Name data binding**
Tag: `Feature: portfolio-fullstack-upgrade, Property 1: For any name string, About renders it`
- Generator: arbitrary non-empty string for `personalInfo.name`
- Action: render `About` with mocked `personalInfo`
- Assert: rendered output contains the generated name string

**Property 2 — Existing skills preserved**
Tag: `Feature: portfolio-fullstack-upgrade, Property 2: For any original skill name, it remains in the updated array`
- Generator: pick any skill name from the pre-upgrade baseline list
- Action: check updated `skills` array
- Assert: `skills.some(s => s.name === originalName)` is true for every original name

**Property 3 — Category filter completeness**
Tag: `Feature: portfolio-fullstack-upgrade, Property 3: For any skill with a category, filtering by that category includes it`
- Generator: pick any skill object from the `skills` array
- Action: filter `skills` where `s.category === skill.category`
- Assert: the picked skill is in the filtered result

**Property 4 — Image lazy-loading**
Tag: `Feature: portfolio-fullstack-upgrade, Property 4: For any project, ProjectCard renders img with loading=lazy`
- Generator: arbitrary project object (valid shape, any image path)
- Action: render `ProjectCard` with the generated project
- Assert: the rendered `<img>` element has `loading="lazy"`

### Integration / Smoke Checks

- Visual review: confirm Framer Motion animations still trigger on scroll after changes
- Visual review: confirm `paper-texture` card layout in About is unchanged
- Visual review: confirm Skills grid renders new cards without layout overflow
- Visual review: confirm Projects filter shows "Full-Stack Application" button and filters correctly
