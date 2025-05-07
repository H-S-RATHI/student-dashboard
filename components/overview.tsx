"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    total: 12,
  },
  {
    name: "Feb",
    total: 18,
  },
  {
    name: "Mar",
    total: 24,
  },
  {
    name: "Apr",
    total: 30,
  },
  {
    name: "May",
    total: 42,
  },
  {
    name: "Jun",
    total: 48,
  },
  {
    name: "Jul",
    total: 52,
  },
  {
    name: "Aug",
    total: 61,
  },
  {
    name: "Sep",
    total: 67,
  },
  {
    name: "Oct",
    total: 78,
  },
  {
    name: "Nov",
    total: 89,
  },
  {
    name: "Dec",
    total: 100,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}
