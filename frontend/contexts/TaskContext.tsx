"use client"

import React, { createContext, useState, useContext, type ReactNode } from "react"

export interface Task {
  id: string
  title: string
  description: string
  assignee: string
  deadline: string
}

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Task) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task])
  }

  return <TaskContext.Provider value={{ tasks, addTask }}>{children}</TaskContext.Provider>
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}

