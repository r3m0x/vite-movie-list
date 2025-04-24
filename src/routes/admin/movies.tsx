import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/movies')({
  component: RouteComponent,
  staticData: {
    label: 'Manage Movies'
}
})

function RouteComponent() {
  return <div>Hello "/admin/movies"!</div>
}
