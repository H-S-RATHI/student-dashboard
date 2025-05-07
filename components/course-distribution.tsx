"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"

const data = [
  { name: "Computer Science", value: 40, color: "#8884d8" },
  { name: "Mathematics", value: 20, color: "#82ca9d" },
  { name: "Physics", value: 15, color: "#ffc658" },
  { name: "Chemistry", value: 10, color: "#ff8042" },
  { name: "Biology", value: 8, color: "#0088fe" },
  { name: "Engineering", value: 7, color: "#00C49F" },
]

export function CourseDistribution() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
