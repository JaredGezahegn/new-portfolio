import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as fc from 'fast-check'

// ---------------------------------------------------------------------------
// Shared mock setup for framer-motion and SectionWrapper
// ---------------------------------------------------------------------------
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_, tag) =>
        // eslint-disable-next-line react/display-name
        ({ children, ...props }) => {
          const { initial, animate, whileInView, whileHover, whileTap, viewport, transition, ...rest } = props
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
// Property 1 — Name data binding
// Tag: Feature: portfolio-fullstack-upgrade, Property 1: For any name string, About renders it
// Validates: Requirements 2.2
// ---------------------------------------------------------------------------
describe('Property 1: For any name string, About renders it', () => {
  it('renders personalInfo.name in the About section for 100 arbitrary non-empty strings', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string({ minLength: 1 }),
        async (arbitraryName) => {
          // Mock the data module with the generated name
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

          // Dynamically import About after mock is set so it picks up the mock
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
