export const emptyTask = {
  name: '',
  description: '',
};

export function validateTask(values) {
  const errors = {};
  const name = values?.name;
  const description = values?.description;

  if (typeof name !== 'string' || !name.trim()) {
    errors.name = 'Ingresá un nombre para la tarea.';
  } else if (name.trim().length > 120) {
    errors.name = 'El nombre no puede superar los 120 caracteres.';
  }

  if (typeof description !== 'string' || !description.trim()) {
    errors.description = 'Ingresá una descripción para la tarea.';
  } else if (description.trim().length > 2000) {
    errors.description = 'La descripción no puede superar los 2000 caracteres.';
  }

  return errors;
}

export function normalizeTask(values) {
  return {
    name: values.name.trim(),
    description: values.description.trim(),
  };
}
