import { unstable_cacheTag } from 'next/cache'
import { NextResponse } from 'next/server'

export function generateStaticParams() {
  return [{ slug: 'first' }]
}

async function getData() {
  'use cache'

  unstable_cacheTag('isr-page')
  const data = await fetch(
    'https://next-data-api-endpoint.vercel.app/api/random'
  ).then((res) => res.text())

  return {
    data,
    now: Date.now(),
  }
}

export async function GET(req, { params }) {
  const { data, now } = await getData()

  return NextResponse.json({
    params,
    data,
    now,
  })
}
