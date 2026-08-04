import { useEffect, useState } from 'react';
import ConfirmDialog from './components/ConfirmDialog/ConfirmDialog.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import Loading from './components/Loading/Loading.jsx';
import TaskDetails from './features/tasks/components/TaskDetails/TaskDetails.jsx';
import TaskList from './features/tasks/components/TaskList/TaskList.jsx';
import TaskModal from './features/tasks/components/TaskModal/TaskModal.jsx';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from './features/tasks/services/taskApi.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [viewingId, setViewingId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [error, setError] = useState('');

  async function loadTasks() {
    setIsLoading(true);
    setError('');
    try {
      const nextTasks = await getTasks();
      setTasks(nextTasks || []);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleTaskSubmit(data) {
    setIsSubmitting(true);
    setError('');
    try {
      if (editingTask) {
        const updatedTask = await updateTask(editingTask.id, data);
        setTasks((currentTasks) => currentTasks.map((task) => (
          task.id === updatedTask.id ? updatedTask : task
        )));
        setEditingTask(null);
        setIsFormOpen(false);
        return updatedTask;
      }

      const createdTask = await createTask(data);
      setTasks((currentTasks) => [createdTask, ...currentTasks]);
      setEditingTask(null);
      setIsFormOpen(false);
      return createdTask;
    } catch (requestError) {
      setError(requestError.message);
      throw requestError;
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleAddTask() {
    setSelectedTask(null);
    setEditingTask(null);
    setError('');
    setIsFormOpen(true);
  }

  function handleEdit(task) {
    setSelectedTask(null);
    setEditingTask(task);
    setError('');
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    if (!isSubmitting) {
      setIsFormOpen(false);
      setEditingTask(null);
    }
  }

  async function handleView(task) {
    setViewingId(task.id);
    setSelectedTask(null);
    setError('');
    try {
      const fullTask = await getTask(task.id);
      setSelectedTask(fullTask);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setViewingId(null);
    }
  }

  async function handleToggle(task) {
    setUpdatingId(task.id);
    setError('');
    try {
      const updatedTask = await updateTask(task.id, {
        name: task.name,
        description: task.description,
        completed: !task.completed,
      });
      setTasks((currentTasks) => currentTasks.map((currentTask) => (
        currentTask.id === updatedTask.id ? updatedTask : currentTask
      )));
      setSelectedTask((currentTask) => (
        currentTask?.id === updatedTask.id ? updatedTask : currentTask
      ));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete() {
    if (!taskToDelete) {
      return;
    }

    const taskId = taskToDelete.id;
    setDeletingId(taskId);
    setError('');
    try {
      await deleteTask(taskId);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
      setSelectedTask((currentTask) => (currentTask?.id === taskId ? null : currentTask));
      setTaskToDelete(null);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <div>
            <p className="eyebrow">Lista de tareas</p>
            <h1>TodoList</h1>
          </div>
        </div>
      </header>

      <main className="page-content">
        <section className="intro-block" aria-labelledby="page-title">
          <div>
            <p className="section-kicker">Organizá tu día</p>
            <h2 id="page-title">¿Qué tenés que hacer?</h2>
          </div>
          <p className="intro-copy">Marcá cada tarea cuando la termines.</p>
        </section>

        <ErrorMessage message={error} onRetry={!isLoading ? loadTasks : undefined} />

        <div className="content-grid">
          <section className="list-section" aria-labelledby="task-list-title">
            <div className="list-heading">
              <div>
                <p className="section-kicker">Tu lista</p>
                <h2 id="task-list-title">Tareas guardadas</h2>
              </div>
              <div className="list-heading-actions">
                <span className="task-count">{tasks.length} {tasks.length === 1 ? 'tarea' : 'tareas'}</span>
                <button type="button" className="button button-primary add-task-button" onClick={handleAddTask}>
                  <span className="plus-icon" aria-hidden="true">+</span>
                  Agregar tarea
                </button>
              </div>
            </div>

            {isLoading ? (
              <Loading />
            ) : (
              <TaskList
                tasks={tasks}
                deletingId={deletingId}
                updatingId={updatingId}
                onToggle={handleToggle}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={setTaskToDelete}
              />
            )}

            {viewingId ? <Loading label="Cargando detalle..." /> : null}
            <TaskDetails task={selectedTask} onClose={() => setSelectedTask(null)} />
          </section>
        </div>
      </main>

      <TaskModal
        isOpen={isFormOpen}
        task={editingTask}
        isSubmitting={isSubmitting}
        onSubmit={handleTaskSubmit}
        onClose={handleCloseForm}
      />

      <ConfirmDialog
        task={taskToDelete}
        isProcessing={deletingId !== null}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default App;
