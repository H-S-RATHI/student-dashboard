import type { Student } from "@/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { GraduationCap } from "lucide-react"
import Link from "next/link"

interface StudentListProps {
  students: Student[]
  isLoading: boolean
  error: string | null
}

export function StudentList({ students, isLoading, error }: StudentListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-4">
              <Skeleton className="h-5 w-3/4" />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter className="p-4">
              <Skeleton className="h-8 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <p className="mb-2 text-center text-lg font-medium">Failed to load students</p>
          <p className="text-center text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (students.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <GraduationCap className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="mb-2 text-center text-lg font-medium">No students found</p>
          <p className="text-center text-sm text-muted-foreground">Try adjusting your filters or add a new student.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
      {students.map((student) => (
        <Link key={student.id} href={`/students/${student.id}`}>
          <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
            <CardHeader className="p-4">
              <CardTitle className="line-clamp-1">{student.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="line-clamp-1 text-sm text-muted-foreground">{student.email}</p>
            </CardContent>
            <CardFooter className="p-4">
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                {student.course}
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
