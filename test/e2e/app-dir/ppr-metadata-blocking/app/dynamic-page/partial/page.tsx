import { connection } from 'next/server'

/// Page is suspended and being caught by the layout Suspense boundary
export default function Page() {
  return (
    <div className="container">
      <SuspendedComponent />
    </div>
  )
}

async function SuspendedComponent() {
  await connection()
  return (
    <div>
      <div>suspended component</div>
      <NestedSuspendedComponent />
    </div>
  )
}

async function NestedSuspendedComponent() {
  await connection()
  return <div>nested suspended component</div>
}

export async function generateMetadata() {
  return {
    title: 'dynamic-page - partial',
  }
}
