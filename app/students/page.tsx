"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { StudentList } from "@/components/student-list"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { fetchStudents } from "@/lib/api"
import type { Student } from "@/types"
import { PlusCircle, Search } from "lucide-react"
import Link from "next/link"

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [courseFilter, setCourseFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    const getStudents = async () => {
      try {
        setIsLoading(true)
        const data = await fetchStudents()
        setStudents(data)
        setFilteredStudents(data)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to fetch students")
        setIsLoading(false)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch students. Please try again later.",
        })
      }
    }

    getStudents()
  }, [toast])

  useEffect(() => {
    let result = [...students]

    // Apply course filter
    if (courseFilter !== "all") {
      result = result.filter((student) => student.course === courseFilter)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (student) => student.name.toLowerCase().includes(query) || student.email.toLowerCase().includes(query),
      )
    }

    setFilteredStudents(result)
  }, [courseFilter, searchQuery, students])

  // Get unique courses for filter dropdown
  const courses = students.length > 0 ? ["all", ...new Set(students.map((student) => student.course))] : ["all"]

  return (
    <DashboardShell>
      <DashboardHeader heading="Students" text="Manage your students and their information.">
        <Link href="/students/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </Link>
      </DashboardHeader>

      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0 w-full mb-4">
        <div className="flex w-full items-center space-x-2">
          <div className="relative w-full md:w-2/3 lg:w-3/4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-full md:w-1/3 lg:w-1/4">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course === "all" ? "All Courses" : course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <StudentList students={filteredStudents} isLoading={isLoading} error={error} />
    </DashboardShell>
  )
}
