import { connection, NextResponse } from 'next/server'

export function generateStaticParams() {
  return [{ slug: 'first' }]
}

export async function GET(req, { params }) {
  await connection()

  const data = await fetch(
    'https://next-data-api-endpoint.vercel.app/api/random',
    {
      next: {
        tags: ['ssr-page'],
      },
    }
  ).then((res) => res.text())

  return NextResponse.json({
    now: Date.now(),
    params,
    data,
  })
}
