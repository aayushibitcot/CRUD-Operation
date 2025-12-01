"use client"

import type { Todo } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react"

interface TodoTableProps {
  todos: Todo[]
  onEdit: (todo: Todo) => void
  onDelete: (id: string) => void
  totalTodos: number
  currentPage: number
  totalPages: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

const statusColors = {
  pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  "in-progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  completed: "bg-green-500/10 text-green-700 dark:text-green-400",
}

const priorityColors = {
  low: "text-slate-600 dark:text-slate-400",
  medium: "text-orange-600 dark:text-orange-400",
  high: "text-red-600 dark:text-red-400",
}

export default function TodoTable({
  todos,
  onEdit,
  onDelete,
  totalTodos,
  currentPage,
  totalPages,
  onPageChange,
}: TodoTableProps) {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-4 text-left font-semibold text-foreground">Title</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Description</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Priority</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Created</th>
                <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No todos found. Create one to get started!
                  </td>
                </tr>
              ) : (
                todos.map((todo) => (
                  <tr key={todo.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{todo.title}</td>
                    <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">{todo.description}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[todo.status]}`}>
                        {todo.status.charAt(0).toUpperCase() + todo.status.slice(1).replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold uppercase ${priorityColors[todo.priority]}`}>
                        {todo.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-xs">{todo.createdAt.toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onEdit(todo)} className="h-8 w-8 p-0">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(todo.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {totalTodos > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold">{(currentPage - 1) * 5 + 1}</span> to{" "}
            <span className="font-semibold">{Math.min(currentPage * 5, totalTodos)}</span> of{" "}
            <span className="font-semibold">{totalTodos}</span> todos
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalTodos > 0 ? Math.ceil(totalTodos / 5) : 1 }).map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalTodos / 5) || totalTodos === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
