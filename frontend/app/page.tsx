"use client"

import { useState } from "react"
import Dashboard from "../components/Dashboard"
import TaskCreation from "../components/TaskCreation"
import WorkflowBuilder from "../components/WorkflowBuilder"
import { Button } from "@/components/ui/button"
import { TaskProvider } from "../contexts/TaskContext"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Workflow Automation</h1>
          </div>
        </header>
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  onClick={() => setActiveTab("dashboard")}
                  className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "tasks" ? "default" : "ghost"}
                  onClick={() => setActiveTab("tasks")}
                  className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Tasks
                </Button>
                <Button
                  variant={activeTab === "workflows" ? "default" : "ghost"}
                  onClick={() => setActiveTab("workflows")}
                  className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Workflows
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "tasks" && <TaskCreation />}
            {activeTab === "workflows" && <WorkflowBuilder />}
          </div>
        </main>
      </div>
    </TaskProvider>
  )
}

