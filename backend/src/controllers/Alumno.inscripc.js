const Alumno = require('../models/alumno');

exports.alumnos_inscribir_curso = (req, res, next) => {
  const idCurso = req.params.idCurso;
  const idAlumno = req.params.idAlumno;

  Curso.findById(idCurso)
    .exec()
    .then(curso => {
      if (!curso.habilitado) {
        return res.status(400).json({
          message:
            'El curso no está habilitado para inscripciones en este momento'
        });
      }
      Alumno.findById(idAlumno)
        .exec()
        .then(alumno => {
          alumno.cursosInscritos.push(curso);
          alumno.save().then(result => {
            res.status(200).json({
              message:
                'El alumno ha sido inscrito correctamente en el curso',
              inscripcionCreada: {
                _id: result._id,
                nombreAlumno:
                  result.nombre + ' ' + result.apellido,
                cursoInscrito:
                  result.cursosInscritos[result.cursosInscritos.length - 1]
              }
            });
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error:
              'No se pudo encontrar al alumno con el ID proporcionado'
          });
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:
          'No se pudo encontrar el curso con el ID proporcionado'
      });
    });
};