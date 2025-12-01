"use client"

import { useState, useMemo } from "react"
import TodoTable from "@/components/todo-table"
import TodoModal from "@/components/todo-modal"
import TodoStats from "@/components/todo-stats"
import TodoFilter from "@/components/todo-filter"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export interface Todo {
  id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  createdAt: Date
  priority: "low" | "medium" | "high"
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "Learn Next.js",
      description: "Complete Next.js tutorial and build a project",
      status: "in-progress",
      createdAt: new Date("2025-01-15"),
      priority: "high",
    },
    {
      id: "2",
      title: "Design Database Schema",
      description: "Create database schema for the application",
      status: "completed",
      createdAt: new Date("2025-01-10"),
      priority: "high",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter and search logic
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || todo.status === statusFilter

      const matchesPriority = priorityFilter === "all" || todo.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [todos, searchTerm, statusFilter, priorityFilter])

  // Pagination
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedTodos = filteredTodos.slice(startIdx, startIdx + itemsPerPage)

  const handleAddTodo = (todo: Omit<Todo, "id" | "createdAt">) => {
    if (editingTodo) {
      setTodos(todos.map((t) => (t.id === editingTodo.id ? { ...editingTodo, ...todo } : t)))
      setEditingTodo(null)
    } else {
      const newTodo: Todo = {
        ...todo,
        id: Date.now().toString(),
        createdAt: new Date(),
      }
      setTodos([newTodo, ...todos])
    }
    setIsModalOpen(false)
    setCurrentPage(1)
  }

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTodo(null)
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Todo Manager</h1>
            <p className="mt-1 text-muted-foreground">Manage your tasks efficiently with full CRUD operations</p>
          </div>
          <Button
            onClick={() => {
              setEditingTodo(null)
              setIsModalOpen(true)
            }}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Todo
          </Button>
        </div>

        {/* Stats */}
        <TodoStats todos={todos} />

        {/* Filter and Search */}
        <TodoFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
        />

        {/* Todo Table */}
        <TodoTable
          todos={paginatedTodos}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          totalTodos={filteredTodos.length}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />

        {/* Modal */}
        <TodoModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleAddTodo} initialData={editingTodo} />
      </div>
    </div>
  )
}
