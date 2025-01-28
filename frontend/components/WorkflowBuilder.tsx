"use client"

import { useState, useCallback, useEffect } from "react"
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  type Connection,
  type Edge,
  type Node,
  type NodeChange,
  type EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow"
import "reactflow/dist/style.css"
import { Button } from "@/components/ui/button"
import { useTaskContext } from "../contexts/TaskContext"

const initialNodes: Node[] = [
  { id: "start", position: { x: 0, y: 0 }, data: { label: "Start" }, type: "input" },
  { id: "end", position: { x: 0, y: 400 }, data: { label: "End" }, type: "output" },
]

export default function WorkflowBuilder() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>([])
  const { tasks } = useTaskContext()

  useEffect(() => {
    const newNodes = tasks.map((task, index) => ({
      id: task.id,
      position: { x: 0, y: (index + 1) * 100 },
      data: { label: `${task.title}\nAssigned to: ${task.assignee}\n${task.description}` },
    }))

    setNodes([...initialNodes, ...newNodes])

    // Create edges connecting all nodes in sequence
    const newEdges = [
      { id: "e-start", source: "start", target: newNodes[0]?.id || "end" },
      ...newNodes.slice(0, -1).map((node, index) => ({
        id: `e-${node.id}`,
        source: node.id,
        target: newNodes[index + 1].id,
      })),
      { id: "e-end", source: newNodes[newNodes.length - 1]?.id || "start", target: "end" },
    ]

    setEdges(newEdges)
  }, [tasks])

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [])

  return (
    <div className="bg-white shadow sm:rounded-lg p-4" style={{ height: "600px" }}>
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Workflow Builder</h3>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

