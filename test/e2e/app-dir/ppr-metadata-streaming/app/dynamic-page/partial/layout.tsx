import { Suspense } from 'react'

export default function Layout({ children }) {
  return (
    <div data-date={Number(performance.now())}>
      <h2>Suspenseful Layout</h2>
      <Suspense>{children}</Suspense>
    </div>
  )
}
