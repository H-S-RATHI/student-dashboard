import type React from "react"
interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return <div className="flex-1 w-full space-y-4 p-2 pt-6 md:p-4">{children}</div>
}
