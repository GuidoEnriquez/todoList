import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';

const Task = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre es obligatorio' },
        notNull: { msg: 'El nombre es obligatorio' },
        len: {
          args: [1, 120],
          msg: 'El nombre debe tener entre 1 y 120 caracteres',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La descripción es obligatoria' },
        notNull: { msg: 'La descripción es obligatoria' },
        len: {
          args: [1, 2000],
          msg: 'La descripción debe tener entre 1 y 2000 caracteres',
        },
      },
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: 'tasks',
    underscored: true,
    timestamps: true,
  }
);

export default Task;
