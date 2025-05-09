"use client"

import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/auth-context"
import { BookOpen, GraduationCap, Home, LogOut, PlusCircle, User } from "lucide-react"
import Link from "next/link"

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <>
      <Sidebar className={className}>
        <SidebarHeader className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-6 w-6" />
            <span>Student Dashboard</span>
          </Link>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/"}>
                <Link href="/">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={pathname === "/students" || (pathname.startsWith("/students/") && !pathname.includes("/add"))}
              >
                <Link href="/students">
                  <BookOpen className="h-4 w-4" />
                  <span>Students</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/students/add"}>
                <Link href="/students/add">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Student</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex flex-col gap-4">
            {/* User Email with truncation */}
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium truncate">
                {user ? user.email : "Not logged in"}
              </span>
            </div>
            
            {/* Logout Button with Theme Toggle before it */}
            {user && (
              <>
                <div className="flex w-full items-center justify-between rounded-md text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4" />
                    <span>Theme</span>
                  </div>
                  <ModeToggle />
                </div>
                
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  )
}
