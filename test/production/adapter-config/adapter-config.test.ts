import { nextTestSetup } from 'e2e-utils'

describe('adapter-config', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('should apply modifyConfig from adapter', async () => {
    // we apply basePath of "/docs" to ensure modify was called
    const res = await next.fetch('/')
    expect(res.status).toBe(404)

    const res2 = await next.fetch('/docs/node-pages')
    expect(res2.status).toBe(200)
    expect(await res2.text()).toContain('hello world')

    expect(next.cliOutput).toContain('called modify config in adapter')
  })
})
