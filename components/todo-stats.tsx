"use client"

import type { Todo } from "@/app/page"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface TodoStatsProps {
  todos: Todo[]
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.status === "completed").length,
    inProgress: todos.filter((t) => t.status === "in-progress").length,
    pending: todos.filter((t) => t.status === "pending").length,
  }

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-4">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Todos</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="rounded-lg bg-blue-500/10 p-3">
            <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.completed}</p>
          </div>
          <div className="rounded-lg bg-green-500/10 p-3">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">In Progress</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.inProgress}</p>
          </div>
          <div className="rounded-lg bg-orange-500/10 p-3">
            <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.pending}</p>
          </div>
          <div className="rounded-lg bg-amber-500/10 p-3">
            <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
        </div>
      </Card>
    </div>
  )
}
