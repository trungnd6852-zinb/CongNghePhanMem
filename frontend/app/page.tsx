import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { EntitiesTable } from '@/components/dashboard/entities-table'
import { StatCards } from '@/components/dashboard/stat-cards'

export default function OverviewPage() {
  return (
    <DashboardShell
      title="System Overview"
      subtitle="Live metrics from the Flask Clean Architecture backend"
    >
      <div className="flex flex-col gap-6">
        <StatCards />
        <EntitiesTable />
      </div>
    </DashboardShell>
  )
}
