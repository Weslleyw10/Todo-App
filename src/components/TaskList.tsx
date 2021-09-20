import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
}

export function TaskList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    function handleCreateNewTask(task: string) {
    if (!newTaskTitle) return

    setTasks([
      ...tasks,
      {
        id: new Date().getTime().toString(),
        description: newTaskTitle,
        isCompleted: false
      }
    ])

    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: string) {
    let taskIsCompleted = tasks.map(item => item.id === id
      ? {
        ...item,
        isCompleted: !item.isCompleted
      } : item)

      setTasks(taskIsCompleted)
  }

  function handleRemoveTask(id: string) {
    let filteredTask = tasks.filter(item => item.id !== id)
    setTasks(filteredTask)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            value={newTaskTitle}
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value,)}            
          />
          <button 
            type="submit" 
            data-testid="add-task-button" 
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isCompleted ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isCompleted}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.description}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}