import type { Student } from "@/types"

// Mock student data
const mockStudents: Student[] = [
  { id: "1", name: "John Doe", email: "john.doe@example.com", course: "Computer Science" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com", course: "Mathematics" },
  { id: "3", name: "Bob Johnson", email: "bob.johnson@example.com", course: "Physics" },
  { id: "4", name: "Alice Brown", email: "alice.brown@example.com", course: "Chemistry" },
  { id: "5", name: "Charlie Davis", email: "charlie.davis@example.com", course: "Biology" },
  { id: "6", name: "Eva Wilson", email: "eva.wilson@example.com", course: "Engineering" },
  { id: "7", name: "Frank Miller", email: "frank.miller@example.com", course: "Computer Science" },
  { id: "8", name: "Grace Taylor", email: "grace.taylor@example.com", course: "Mathematics" },
  { id: "9", name: "Henry Clark", email: "henry.clark@example.com", course: "Physics" },
  { id: "10", name: "Ivy Martin", email: "ivy.martin@example.com", course: "Chemistry" },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch all students
export async function fetchStudents(): Promise<Student[]> {
  await delay(1000) // Simulate network delay
  return [...mockStudents]
}

// Fetch a student by ID
export async function fetchStudentById(id: string): Promise<Student> {
  await delay(800)
  const student = mockStudents.find((s) => s.id === id)
  if (!student) {
    throw new Error("Student not found")
  }
  return { ...student }
}

// Add a new student
export async function addStudent(student: Omit<Student, "id">): Promise<Student> {
  await delay(1000)
  const newStudent = {
    id: String(mockStudents.length + 1),
    ...student,
  }
  mockStudents.push(newStudent)
  return newStudent
}

// Update a student
export async function updateStudent(id: string, student: Partial<Omit<Student, "id">>): Promise<Student> {
  await delay(1000)
  const index = mockStudents.findIndex((s) => s.id === id)
  if (index === -1) {
    throw new Error("Student not found")
  }

  mockStudents[index] = {
    ...mockStudents[index],
    ...student,
  }

  return { ...mockStudents[index] }
}

// Delete a student
export async function deleteStudent(id: string): Promise<void> {
  await delay(1000)
  const index = mockStudents.findIndex((s) => s.id === id)
  if (index === -1) {
    throw new Error("Student not found")
  }

  mockStudents.splice(index, 1)
}

// Fetch recent students
export async function fetchRecentStudents(): Promise<Student[]> {
  await delay(800)
  return mockStudents.slice(0, 5)
}
