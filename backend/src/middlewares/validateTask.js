import ApiError from '../utils/ApiError.js';

export function validateTaskBody(req, _res, next) {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const { name, description, completed } = body;
  const errors = [];
  const normalizedBody = {};

  if (typeof name !== 'string') {
    errors.push('El nombre es obligatorio');
  } else {
    const trimmedName = name.trim();
    if (!trimmedName) {
      errors.push('El nombre no puede estar vacío');
    } else if (trimmedName.length > 120) {
      errors.push('El nombre debe tener como máximo 120 caracteres');
    }
    normalizedBody.name = trimmedName;
  }

  if (typeof description !== 'string') {
    errors.push('La descripción es obligatoria');
  } else {
    const trimmedDesc = description.trim();
    if (!trimmedDesc) {
      errors.push('La descripción no puede estar vacía');
    } else if (trimmedDesc.length > 2000) {
      errors.push('La descripción debe tener como máximo 2000 caracteres');
    }
    normalizedBody.description = trimmedDesc;
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      errors.push('El estado completado debe ser booleano');
    } else {
      normalizedBody.completed = completed;
    }
  }

  if (errors.length > 0) {
    throw ApiError.badRequest(errors.join('. '));
  }

  req.body = normalizedBody;
  next();
}

export function validateTaskId(req, _res, next) {
  const rawId = String(req.params.id);
  if (!/^[1-9]\d*$/.test(rawId)) {
    throw ApiError.badRequest('El ID debe ser un entero positivo');
  }
  const id = Number(rawId);
  if (!Number.isSafeInteger(id)) {
    throw ApiError.badRequest('El ID debe ser un entero positivo');
  }
  req.params.id = id;
  next();
}
