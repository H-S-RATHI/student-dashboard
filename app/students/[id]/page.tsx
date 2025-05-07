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
  const unwrappedParams = React.use(params as any) as { id: string };
  // Get the student ID from unwrapped params
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
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Information Section */}
                <div className="space-y-4">
                  <Skeleton className="h-6 w-2/3" />
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                </div>
                
                {/* Academic Information Section */}
                <div className="space-y-4">
                  <Skeleton className="h-6 w-2/3" />
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t">
            <Skeleton className="h-4 w-40" />
          </CardFooter>
        </Card>
      </DashboardShell>
    )
  }

  if (!student) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Student Not Found" text="The requested student could not be found." />
        <Card>
          <CardHeader>
            <CardTitle>Student Not Found</CardTitle>
            <CardDescription>The requested student information is not available</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-muted-foreground">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No Student Record Found</h3>
              <p className="text-sm text-muted-foreground mb-6">The student you are looking for does not exist or has been removed.</p>
              <Button asChild>
                <Link href="/students">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Students List
                </Link>
              </Button>
            </div>
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
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-3 items-center">
                  <span className="font-medium text-sm">Full Name:</span>
                  <span className="col-span-2 text-sm">{student.name}</span>
                </div>
                
                <div className="grid grid-cols-3 items-center">
                  <span className="font-medium text-sm">Email:</span>
                  <span className="col-span-2 text-sm">{student.email}</span>
                </div>
              </div>
              
              {/* Academic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Academic Information</h3>
                
                <div className="grid grid-cols-3 items-center">
                  <span className="font-medium text-sm">Course:</span>
                  <span className="col-span-2 text-sm">{student.course}</span>
                </div>
                
                <div className="grid grid-cols-3 items-center">
                  <span className="font-medium text-sm">Enrollment Date:</span>
                  <span className="col-span-2 text-sm">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t">
          <p className="text-xs text-muted-foreground py-6">Last updated: {new Date().toLocaleDateString()}</p>
        </CardFooter>
      </Card>
    </DashboardShell>
  )
}
