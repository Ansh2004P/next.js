import { nextTestSetup } from 'e2e-utils'
import path from 'path'

describe('build-output-tree-view', () => {
  describe('with mixed static and dynamic pages and app router routes', () => {
    const { next } = nextTestSetup({
      files: path.join(__dirname, 'fixtures/mixed'),
      skipStart: true,
      env: {
        __NEXT_PRIVATE_DETERMINISTIC_BUILD_OUTPUT: '1',
      },
    })

    beforeAll(() => next.build())

    it('should show info about prerendered and dynamic routes in a tree view', async () => {
      expect(getTreeView(next.cliOutput)).toMatchInlineSnapshot(`
       "Route (app)                      Size  First Load JS  Revalidate  Expire
       ┌ ○ /_not-found                N/A kB         N/A kB
       ├ ○ /api                       N/A kB         N/A kB
       ├ ○ /api/force-static          N/A kB         N/A kB
       ├ ○ /app-static                N/A kB         N/A kB
       ├ ○ /cache-life-custom         N/A kB         N/A kB         ≈7m     ≈2h
       ├ ○ /cache-life-hours          N/A kB         N/A kB          1h      1d
       ├ ◐ /dynamic                   N/A kB         N/A kB
       └ ◐ /ppr/[slug]                N/A kB         N/A kB          1w     30d
           ├ /ppr/[slug]                                             1w     30d
           ├ /ppr/days                                               1d      1w
           └ /ppr/weeks                                              1w     30d
       + First Load JS shared by all  N/A kB

       Route (pages)                    Size  First Load JS  Revalidate  Expire
       ┌ ○ /api/hello                 N/A kB         N/A kB
       ├ ○ /gsp-revalidate            N/A kB         N/A kB          5m      1y
       ├ ○ /gssp                      N/A kB         N/A kB
       └ ○ /static                    N/A kB         N/A kB
       + First Load JS shared by all  N/A kB

       ○  (Static)             prerendered as static content
       ◐  (Partial Prerender)  prerendered as static HTML with dynamic server-streamed content"
      `)
    })
  })

  describe('with only a few static routes', () => {
    const { next } = nextTestSetup({
      files: path.join(__dirname, 'fixtures/minimal-static'),
      skipStart: true,
      env: {
        __NEXT_PRIVATE_DETERMINISTIC_BUILD_OUTPUT: '1',
      },
    })

    beforeAll(() => next.build())

    it('should show info about prerendered routes in a compact tree view', async () => {
      expect(getTreeView(next.cliOutput)).toMatchInlineSnapshot(`
       "Route (app)                      Size  First Load JS
       ┌ ○ /                          N/A kB         N/A kB
       └ ○ /_not-found                N/A kB         N/A kB
       + First Load JS shared by all  N/A kB

       Route (pages)                    Size  First Load JS
       ─ ○ /static                    N/A kB         N/A kB
       + First Load JS shared by all  N/A kB

       ○  (Static)  prerendered as static content"
      `)
    })
  })
})

function getTreeView(cliOutput: string): string {
  let foundBuildTracesLine = false
  const lines: string[] = []

  for (const line of cliOutput.split('\n')) {
    if (foundBuildTracesLine) {
      lines.push(line)
    }

    foundBuildTracesLine ||= line.includes('Collecting build traces')
  }

  return lines.join('\n').trim()
}
