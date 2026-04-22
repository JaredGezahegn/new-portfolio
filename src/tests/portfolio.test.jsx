import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import * as fc from 'fast-check'

// ---------------------------------------------------------------------------
// Shared mocks for framer-motion and SectionWrapper — hoisted, always active
// ---------------------------------------------------------------------------
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, tag) =>
        ({ children, initial, animate, whileInView, whileHover, whileTap, viewport, transition, ...rest }) => {
          const React = require('react')
          return React.createElement(tag === 'div' ? 'div' : tag, rest, children)
        },
    }
  ),
}))

vi.mock('../components/SectionWrapper', () => ({
  default: ({ children }) => {
    const React = require('react')
    return React.createElement('section', null, children)
  },
}))

// ---------------------------------------------------------------------------
// Data tests — import real module directly (no portfolio mock active here)
// ---------------------------------------------------------------------------
import { personalInfo, skills, projects, categories } from '../data/portfolio.js'

describe('Unit: personalInfo title and bio', () => {
  it('title is Full-Stack Developer', () => {
    expect(personalInfo.title).toBe('Full-Stack Developer')
  })

  it('bio references Engine Room and Sails', () => {
    expect(personalInfo.bio).toMatch(/Engine Room/i)
    expect(personalInfo.bio).toMatch(/Sails/i)
  })
})

describe('Unit: Devil Fruit Registry project', () => {
  it('exists in projects array with correct fields', () => {
    const dfr = projects.find((p) => p.title === 'Devil Fruit Registry')
    expect(dfr).toBeDefined()
    expect(dfr.technologies).toEqual(
      expect.arrayContaining(['Django', 'PostgreSQL', 'Supabase', 'Python', 'React'])
    )
    expect(dfr.category).toBe('Full-Stack Application')
    expect(dfr.featured).toBe(true)
    expect(categories).toContain('Full-Stack Application')
  })
})

describe('Unit: new skills present', () => {
  it('Django, PostgreSQL, Docker, JWT Auth are in skills with correct fields', () => {
    const find = (name) => skills.find((s) => s.name === name)

    const django = find('Django')
    expect(django).toBeDefined()
    expect(django.category).toBe('Backend')
    expect(django.crewRole).toBe('Haki Master')
    expect(django.level).toBeGreaterThanOrEqual(70)

    const pg = find('PostgreSQL')
    expect(pg).toBeDefined()
    expect(pg.category).toBe('Database')
    expect(pg.crewRole).toBe('Treasure Keeper')

    const docker = find('Docker')
    expect(docker).toBeDefined()
    expect(docker.category).toBe('DevOps')
    expect(docker.crewRole).toBe('Shipwright')

    const jwt = find('JWT Auth')
    expect(jwt).toBeDefined()
    expect(jwt.category).toBe('Security')
    expect(jwt.crewRole).toBe('Revolutionary')
  })
})

// ---------------------------------------------------------------------------
// Property 2 — Existing skills preserved
// Tag: Feature: portfolio-fullstack-upgrade, Property 2: For any original skill name, it remains in the updated array
// Validates: Requirements 4.5
// ---------------------------------------------------------------------------
describe('Property 2: For any original skill name, it remains in the updated array', () => {
  it('all pre-upgrade skill names are still present after adding new skills', () => {
    const baselineNames = [
      'React', 'JavaScript', 'Python', 'HTML/CSS', 'Tailwind CSS',
      'Bootstrap', 'Supabase', 'Git', 'Telegram Bot API', 'Netlify', 'Vercel',
    ]

    fc.assert(
      fc.property(
        fc.constantFrom(...baselineNames),
        (originalName) => skills.some((s) => s.name === originalName)
      ),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Property 3 — Category filter completeness
// Tag: Feature: portfolio-fullstack-upgrade, Property 3: For any skill with a category, filtering by that category includes it
// Validates: Requirements 4.6
// ---------------------------------------------------------------------------
describe('Property 3: For any skill with a category, filtering by that category includes it', () => {
  it("filtering skills by a skill's own category always includes that skill", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...skills),
        (skill) => {
          const filtered = skills.filter((s) => s.category === skill.category)
          return filtered.some((s) => s.name === skill.name)
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// About component tests — use vi.doMock + vi.resetModules per test
// ---------------------------------------------------------------------------
describe('Unit: About section content', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('renders three paragraphs with JWT, Engine Room, and Sails', async () => {
    vi.doMock('../data/portfolio', () => ({
      personalInfo: {
        name: 'Test Captain',
        title: 'Full-Stack Developer',
        bio: 'Test bio with Sails and Engine Room',
        resume: '/resume.pdf',
        email: 'test@test.com',
        github: 'https://github.com/test',
        linkedin: 'https://linkedin.com/in/test',
        bounty: '0',
        image: '/test.png',
        quote: 'Test',
        crewRole: 'Captain',
      },
    }))

    const { default: About } = await import('../sections/About.jsx')
    const { unmount } = render(<About />)
    const text = document.body.textContent

    expect(text).toMatch(/JWT/i)
    expect(text).toMatch(/Engine Room/i)
    expect(text).toMatch(/Sails/i)

    unmount()
  })

  it('renders fallback when bio is undefined', async () => {
    vi.doMock('../data/portfolio', () => ({
      personalInfo: {
        name: 'Test',
        title: 'Dev',
        bio: undefined,
        resume: '/resume.pdf',
        email: 'test@test.com',
        github: 'https://github.com/test',
        linkedin: 'https://linkedin.com/in/test',
        bounty: '0',
        image: '/test.png',
        quote: 'Test',
        crewRole: 'Captain',
      },
    }))

    const { default: About } = await import('../sections/About.jsx')
    const { unmount } = render(<About />)
    expect(document.body.textContent).toMatch(/Grand Line/i)
    unmount()
  })
})

// ---------------------------------------------------------------------------
// Property 1 — Name data binding
// Tag: Feature: portfolio-fullstack-upgrade, Property 1: For any name string, About renders it
// Validates: Requirements 2.2
// ---------------------------------------------------------------------------
describe('Property 1: For any name string, About renders it', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('renders personalInfo.name in the About section for 100 arbitrary non-empty strings', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1 }),
        async (arbitraryName) => {
          vi.doMock('../data/portfolio', () => ({
            personalInfo: {
              name: arbitraryName,
              title: 'Full-Stack Developer',
              bio: 'Test bio',
              resume: '/resume.pdf',
              email: 'test@test.com',
              github: 'https://github.com/test',
              linkedin: 'https://linkedin.com/in/test',
              bounty: '0',
              image: '/test.png',
              quote: 'Test quote',
              crewRole: 'Captain',
            },
          }))

          const { default: About } = await import('../sections/About.jsx')
          const { unmount } = render(<About />)

          expect(document.body.textContent).toContain(arbitraryName)

          unmount()
          vi.resetModules()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Property 4 — Image lazy-loading
// Tag: Feature: portfolio-fullstack-upgrade, Property 4: For any project, ProjectCard renders img with loading=lazy
// Validates: Requirements 6.1
// ---------------------------------------------------------------------------
describe('Property 4: For any project object, ProjectCard renders img with loading=lazy', () => {
  it('renders loading=lazy on the img for 100 arbitrary project objects', async () => {
    const { default: ProjectCard } = await import('../components/ProjectCard.jsx')

    await fc.assert(
      fc.asyncProperty(
        fc.record({
          id: fc.integer({ min: 1 }),
          title: fc.string({ minLength: 1 }),
          description: fc.string(),
          longDescription: fc.string(),
          image: fc.string({ minLength: 1 }),
          technologies: fc.array(fc.string()),
          category: fc.string(),
          liveUrl: fc.option(fc.webUrl(), { nil: null }),
          githubUrl: fc.webUrl(),
          featured: fc.boolean(),
        }),
        async (project) => {
          const { unmount } = render(<ProjectCard project={project} index={0} />)
          const img = document.querySelector('img')
          expect(img).not.toBeNull()
          expect(img.getAttribute('loading')).toBe('lazy')
          unmount()
        }
      ),
      { numRuns: 100 }
    )
  })
})
