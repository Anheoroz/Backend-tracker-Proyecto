const Habit = require("../models/Habit");

// Crear hábito
const createHabit = async (req, res) => {
  const { title } = req.body;

  const habit = await Habit.create({ title });

  res.status(201).json(habit);
};

// Obtener hábitos
const getHabits = async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
};

// Actualizar hábito
const updateHabit = async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (habit) {
    habit.completed = !habit.completed;
    await habit.save();
    res.json(habit);
  } else {
    res.status(404).json({ message: "No encontrado" });
  }
};

// Eliminar hábito
const deleteHabit = async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
};

module.exports = {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit
};