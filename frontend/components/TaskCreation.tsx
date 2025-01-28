"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTaskContext } from "../contexts/TaskContext"
import { v4 as uuidv4 } from "uuid"

export default function TaskCreation() {
  const [task, setTask] = useState({ title: "", description: "", assignee: "", deadline: "" })
  const { addTask } = useTaskContext()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newTask = {
      ...task,
      id: uuidv4(),
    }
    addTask(newTask)
    console.log("Submitting task:", newTask)
    // Reset form after submission
    setTask({ title: "", description: "", assignee: "", deadline: "" })
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Create a New Task</h3>
        <div className="mt-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                rows={3}
                value={task.description}
                onChange={(e) => setTask({ ...task, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <Select onValueChange={(value) => setTask({ ...task, assignee: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an assignee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Doe</SelectItem>
                  <SelectItem value="jane">Jane Smith</SelectItem>
                  <SelectItem value="bob">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                type="date"
                name="deadline"
                id="deadline"
                value={task.deadline}
                onChange={(e) => setTask({ ...task, deadline: e.target.value })}
              />
            </div>
            <div>
              <Button type="submit">Create Task</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

