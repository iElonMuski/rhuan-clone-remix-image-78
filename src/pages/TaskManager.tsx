
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Edit, Trash2, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

// Define Task type
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

const TaskManager = () => {
  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    description: '',
    dueDate: new Date(),
    priority: 'medium',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        // Parse dates correctly
        const parsedTasks = JSON.parse(savedTasks, (key, value) => {
          if (key === 'dueDate') return new Date(value);
          return value;
        });
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
        setTasks([]);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add new task
  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      toast.error('O título da tarefa é obrigatório');
      return;
    }

    // Validate due date
    if (newTask.dueDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      toast.error('A data de vencimento não pode ser no passado');
      return;
    }

    const task: Task = {
      id: crypto.randomUUID(),
      ...newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date(),
      priority: 'medium',
    });

    toast.success('Tarefa adicionada com sucesso!');
  };

  // Update task
  const handleUpdateTask = () => {
    if (!editingTask) return;

    // Validate due date
    if (editingTask.dueDate < new Date(new Date().setHours(0, 0, 0, 0))) {
      toast.error('A data de vencimento não pode ser no passado');
      return;
    }

    setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)));
    setEditingTask(null);
    toast.success('Tarefa atualizada com sucesso!');
  };

  // Toggle task completion
  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success('Status da tarefa atualizado!');
  };

  // Delete task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success('Tarefa excluída com sucesso!');
  };

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filterStatus === 'pending' && task.completed) return false;
    if (filterStatus === 'completed' && !task.completed) return false;

    // Filter by priority
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;

    return true;
  });

  // Sort tasks by priority and due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Priority order: high (3) > medium (2) > low (1)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    
    // First sort by completion status
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1; // Pending tasks first
    }
    
    // Then sort by priority
    const priorityDiff = 
      priorityOrder[b.priority as keyof typeof priorityOrder] - 
      priorityOrder[a.priority as keyof typeof priorityOrder];
    
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then sort by due date
    return a.dueDate.getTime() - b.dueDate.getTime();
  });

  // Define priority colors
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  // Converts "low", "medium", "high" to "Baixa", "Média", "Alta"
  const priorityLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
  };

  return (
    <div className="min-h-screen bg-[#151515] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <Link to="/" className="text-2xl font-bold hover:text-purple-500 transition-colors">
            Sistema de Tarefas
          </Link>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-purple-500 transition-colors">
              Voltar ao Portfólio
            </Link>
          </div>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Task Input Form */}
          <div className="bg-[#1C1C1C] p-8 rounded-3xl lg:col-span-1">
            <h2 className="text-2xl font-bold mb-6">
              {editingTask ? 'Editar Tarefa' : 'Adicionar Tarefa'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={editingTask ? editingTask.title : newTask.title}
                  onChange={(e) => {
                    if (editingTask) {
                      setEditingTask({ ...editingTask, title: e.target.value });
                    } else {
                      setNewTask({ ...newTask, title: e.target.value });
                    }
                  }}
                  className="bg-[#252525] border-[#333] text-white"
                  placeholder="Título da tarefa"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  value={editingTask ? editingTask.description : newTask.description}
                  onChange={(e) => {
                    if (editingTask) {
                      setEditingTask({ ...editingTask, description: e.target.value });
                    } else {
                      setNewTask({ ...newTask, description: e.target.value });
                    }
                  }}
                  className="bg-[#252525] border-[#333] text-white"
                  placeholder="Descrição da tarefa"
                />
              </div>
              
              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select
                  value={editingTask ? editingTask.priority : newTask.priority}
                  onValueChange={(value: 'low' | 'medium' | 'high') => {
                    if (editingTask) {
                      setEditingTask({ ...editingTask, priority: value });
                    } else {
                      setNewTask({ ...newTask, priority: value });
                    }
                  }}
                >
                  <SelectTrigger className="bg-[#252525] border-[#333] text-white">
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252525] border-[#333] text-white">
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="dueDate">Data de Vencimento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-[#252525] border-[#333] text-white"
                    >
                      {editingTask
                        ? format(editingTask.dueDate, 'PPP')
                        : format(newTask.dueDate, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#252525] border-[#333]">
                    <Calendar
                      mode="single"
                      selected={editingTask ? editingTask.dueDate : newTask.dueDate}
                      onSelect={(date) => {
                        if (!date) return;
                        if (editingTask) {
                          setEditingTask({ ...editingTask, dueDate: date });
                        } else {
                          setNewTask({ ...newTask, dueDate: date });
                        }
                      }}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={editingTask ? handleUpdateTask : handleAddTask}
              >
                {editingTask ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
              </Button>
              
              {editingTask && (
                <Button
                  className="w-full bg-gray-600 hover:bg-gray-700 mt-2"
                  onClick={() => setEditingTask(null)}
                >
                  Cancelar Edição
                </Button>
              )}
            </div>
          </div>

          {/* Task List */}
          <div className="bg-[#1C1C1C] p-8 rounded-3xl lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Suas Tarefas</h2>
              
              <div className="flex gap-4">
                {/* Status Filter */}
                <Select
                  value={filterStatus}
                  onValueChange={(value: 'all' | 'pending' | 'completed') => setFilterStatus(value)}
                >
                  <SelectTrigger className="bg-[#252525] border-[#333] text-white w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252525] border-[#333] text-white">
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="completed">Concluídas</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Priority Filter */}
                <Select
                  value={filterPriority}
                  onValueChange={(value: 'all' | 'low' | 'medium' | 'high') => setFilterPriority(value)}
                >
                  <SelectTrigger className="bg-[#252525] border-[#333] text-white w-40">
                    <SelectValue placeholder="Prioridade" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#252525] border-[#333] text-white">
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {sortedTasks.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <p className="text-xl">Nenhuma tarefa encontrada</p>
                <p className="mt-2">Adicione sua primeira tarefa ou ajuste os filtros</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className={`bg-[#252525] border-[#333] ${task.completed ? 'opacity-70' : ''}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </CardTitle>
                          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                            {priorityLabels[task.priority]}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-gray-300 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                          {task.description}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Vencimento: {format(task.dueDate, 'dd/MM/yyyy')}
                        </p>
                      </CardContent>
                      <CardFooter className="justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleComplete(task.id)}
                          title={task.completed ? "Marcar como pendente" : "Marcar como concluída"}
                        >
                          <Check className={task.completed ? "text-green-500" : "text-gray-400"} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingTask(task)}
                          disabled={task.completed}
                          title="Editar tarefa"
                        >
                          <Edit className="text-blue-500" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteTask(task.id)}
                          title="Excluir tarefa"
                        >
                          <Trash2 className="text-red-500" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
