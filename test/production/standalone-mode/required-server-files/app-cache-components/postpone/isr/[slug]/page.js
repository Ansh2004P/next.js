import { connection } from 'next/server'

export default async function Page({ params }) {
  await connection()

  return (
    <>
      <p id="page">/postpone/isr/[slug]</p>
      <p id="params">{JSON.stringify(params)}</p>
      <p id="now">{Date.now()}</p>
    </>
  )
}
