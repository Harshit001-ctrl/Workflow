"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Jan", tasks: 40 },
  { name: "Feb", tasks: 30 },
  { name: "Mar", tasks: 20 },
  { name: "Apr", tasks: 27 },
  { name: "May", tasks: 18 },
  { name: "Jun", tasks: 23 },
  { name: "Jul", tasks: 34 },
]

export default function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Tasks</CardTitle>
          <CardDescription>Task overview for the current month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">192</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Completed Tasks</CardTitle>
          <CardDescription>Tasks completed this month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">156</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Workflows</CardTitle>
          <CardDescription>Currently running workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">7</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Total number of team members</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">12</p>
        </CardContent>
      </Card>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Task Completion Trend</CardTitle>
          <CardDescription>Number of tasks completed per month</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="tasks" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

