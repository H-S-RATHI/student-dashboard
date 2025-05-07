"use client"

import { useState, useEffect } from "react"
import { fetchRecentStudents } from "@/lib/api"
import type { Student } from "@/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export function RecentStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getRecentStudents = async () => {
      try {
        setIsLoading(true)
        const data = await fetchRecentStudents()
        setStudents(data)
      } catch (error) {
        console.error("Failed to fetch recent students:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getRecentStudents()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {students.map((student) => (
        <div key={student.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>
              {student.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <Link href={`/students/${student.id}`} className="font-medium hover:underline">
              {student.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {student.course} • Added {formatDistanceToNow(new Date(), { addSuffix: true })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
