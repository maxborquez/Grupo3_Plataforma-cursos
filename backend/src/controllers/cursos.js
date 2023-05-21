const Curso = require('../models/curso');
const Student = require('../models/student');
const Teacher = require('../models/teacher');

exports.getCursos = async (req, res) => {
  try {
    const cursos = await Curso.find({ enabled: true });
    res.json(cursos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addCurso = async (req, res) => {
  try {
    const curso = new Curso(req.body);
    await curso.save();
    res.json(curso);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const curso = await Curso.findByIdAndUpdate(id, req.body, { new: true });
    res.json(curso);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addFechaCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_inicio, fecha_fin } = req.body;
    const curso = await Curso.findByIdAndUpdate(
      id,
      { $set: { fecha_inicio, fecha_fin } },
      { new: true }
    );
    res.json(curso);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addTeacherToCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const { teacherId } = req.body;
      const course = await Course.findByIdAndUpdate(
        id,
        { $set: { teacher: teacherId } },
        { new: true }
      );
      res.json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

exports.addStudentToCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.body;
    const curso = await Curso.findByIdAndUpdate(
      id,
      { $push: { students: studentId } },
      { new: true }
    );
    res.json(curso);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addNameAndDescriptionToCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const curso = await Curso.findByIdAndUpdate(
      id,
      { $set: { name, description } },
      { new: true }
    );
    res.json(curso);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
