"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { fetchStudentById, deleteStudent } from "@/lib/api"
import type { Student } from "@/types"
import { ArrowLeft, Edit, Trash } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { redirect } from "next/navigation"

export default function StudentDetailsPage({ params }: { params: { id: string } }) {
  // Use React.use() to unwrap the params
  const unwrappedParams = React.use(params as any);
  const studentId = unwrappedParams.id;
  
  const [student, setStudent] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  // Redirect if not authenticated
  if (!user) {
    redirect("/login")
  }

  useEffect(() => {
    const getStudent = async () => {
      try {
        setIsLoading(true)
        const data = await fetchStudentById(studentId)
        setStudent(data)
      } catch (err) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch student details.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    getStudent()
  }, [studentId, toast])

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        setIsDeleting(true)
        await deleteStudent(studentId)
        toast({
          title: "Success",
          description: "Student has been deleted successfully.",
        })
        router.push("/students")
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete student.",
        })
      } finally {
        setIsDeleting(false)
      }
    }
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Student Details" text="Loading student information..." />
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  if (!student) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Student Not Found" text="The requested student could not be found." />
        <Card>
          <CardContent className="pt-6">
            <p>The student you are looking for does not exist or has been removed.</p>
            <Button asChild className="mt-4">
              <Link href="/students">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Students
              </Link>
            </Button>
          </CardContent>
        </Card>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Student Details" text="View detailed information about this student.">
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/students">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/students/${studentId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            <Trash className="mr-2 h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>{student.name}</CardTitle>
          <CardDescription>Student ID: {student.id}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Email</h3>
            <p className="text-sm text-muted-foreground">{student.email}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Course</h3>
            <p className="text-sm text-muted-foreground">{student.course}</p>
          </div>
          <div className="grid gap-2">
            <h3 className="text-sm font-medium">Enrollment Date</h3>
            <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}
