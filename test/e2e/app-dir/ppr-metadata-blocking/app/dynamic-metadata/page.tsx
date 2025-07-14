import { connection } from 'next/server'
import { Suspense } from 'react'

async function DynamicMarker() {
  // This component renders nothing, but it will always
  // be dynamic because it waits for an actual connection.

  await connection()
  return null
}

export default async function Home() {
  return (
    <div>
      <h1>Dynamic Metadata</h1>
      <Suspense>
        <DynamicMarker />
      </Suspense>
    </div>
  )
}

export async function generateMetadata() {
  await connection()

  return {
    title: `dynamic metadata`,
    description: `dynamic metadata - ${Math.random()}`,
  }
}
