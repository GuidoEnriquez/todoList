import { useEffect, useState } from 'react';
import { emptyTask, normalizeTask, validateTask } from '../../utils/taskValidation.js';

export default function TaskForm({ task, isSubmitting, onSubmit, onCancel }) {
  const [values, setValues] = useState(task ? { name: task.name, description: task.description } : emptyTask);
  const [errors, setErrors] = useState({});
  const isEditing = Boolean(task);

  useEffect(() => {
    setValues(task ? { name: task.name, description: task.description } : emptyTask);
    setErrors({});
  }, [task]);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateTask(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      await onSubmit(normalizeTask(values));
      if (!isEditing) {
        setValues(emptyTask);
        setErrors({});
      }
    } catch {
      // The page displays the request error and keeps the form values intact.
    }
  }

  return (
    <section className="form-panel" id="task-form" aria-labelledby="task-form-title">
      <div className="section-kicker">{isEditing ? 'Modo edición' : 'Nueva entrada'}</div>
      <h2 id="task-form-title">{isEditing ? 'Editar tarea' : 'Crear una tarea'}</h2>
      <p className="panel-intro">
        {isEditing ? 'Actualizá los datos y guardá los cambios.' : 'Anotá lo importante antes de que se te escape.'}
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <fieldset disabled={isSubmitting}>
          <div className="field-group">
            <label htmlFor="task-name">Nombre</label>
            <input
              id="task-name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              maxLength={120}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'task-name-error' : undefined}
              placeholder="Ej. Preparar presentación"
            />
            {errors.name ? <p className="field-error" id="task-name-error">{errors.name}</p> : null}
            <span className="character-count">{values.name.length}/120</span>
          </div>
          <div className="field-group">
            <label htmlFor="task-description">Descripción</label>
            <textarea
              id="task-description"
              name="description"
              value={values.description}
              onChange={handleChange}
              maxLength={2000}
              rows={6}
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? 'task-description-error' : undefined}
              placeholder="¿Qué necesitás hacer?"
            />
            {errors.description ? <p className="field-error" id="task-description-error">{errors.description}</p> : null}
            <span className="character-count">{values.description.length}/2000</span>
          </div>
          <div className="form-actions">
            <button type="submit" className="button button-primary">
              {isSubmitting ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear tarea'}
            </button>
            {isEditing ? (
              <button type="button" className="button button-secondary" onClick={onCancel}>
                Cancelar
              </button>
            ) : null}
          </div>
        </fieldset>
      </form>
    </section>
  );
}
