import { connection } from 'next/server'
import { Suspense } from 'react'

async function DynamicMarker() {
  // This component renders nothing, but it will always
  // be dynamic because it waits for an actual connection.

  await connection()
  return null
}

// Dynamic usage in page, wrapped with Suspense boundary
export default function Page() {
  return (
    <div>
      <h1>Dynamic Page</h1>
      <Suspense>
        <DynamicMarker />
      </Suspense>
    </div>
  )
}

export async function generateMetadata() {
  return {
    title: `dynamic page`,
  }
}
