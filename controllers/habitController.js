const Habit = require("../models/Habit");

// Crear hábito
const createHabit = async (req, res) => {
  const habit = await Habit.create({
    name: req.body.name
  });

  res.json(habit);
};

// Obtener hábitos
const getHabits = async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
};

// Actualizar hábito
const updateHabit = async (req, res) => {
  const habit = await Habit.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(habit);
};

// Eliminar hábito
const deleteHabit = async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado" });
};

// marcar habito como completado

const marcarHabitComoDone = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ msg: "Hábito no encontrado" });
    }

    const today = new Date();

    if (!habit.lastCompleted) {
      habit.streak = 1;
    } else {
      const last = new Date(habit.lastCompleted);

      const diff = Math.floor(
        (today - last) / (1000 * 60 * 60 * 24) 
      );

      if (diff === 0) {
        return res.json({ msg: "Ya completado hoy", habit });
      }

      // condicionales para sumar streak, si pasan 2 dias sin marcar, racha se vera reflejada, y al presionar done, reinicia a 1
      if (diff === 1) {
        habit.streak += 1;
      } else if (diff > 1) {
        habit.streak = 1;
      }
    }

    habit.lastCompleted = today;

    await habit.save();

    res.json(habit);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  marcarHabitComoDone
};