"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelRight } from "lucide-react"

export function SidebarToggleWrapper() {
  const { toggleSidebar, state } = useSidebar()
  
  return (
    <>
      {state === "collapsed" && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-50 h-8 w-8 rounded-full shadow-md border bg-background"
          onClick={toggleSidebar}
        >
          <PanelRight className="h-4 w-4" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      )}
    </>
  )
}