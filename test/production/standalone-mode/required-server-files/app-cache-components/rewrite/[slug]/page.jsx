import { connection } from 'next/server'

export function generateStaticParams() {
  return [{ slug: 'first-cookie' }]
}

export default async function Page(props) {
  await connection()
  const params = await props.params

  return (
    <>
      <p id="page">/rewrite/[slug]</p>
      <p id="params">{JSON.stringify(params)}</p>
      <p id="now">{Date.now()}</p>
    </>
  )
}
