import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { crearAviso } from '../../data/avisosData';
import { getUserId } from '../../data/auth';

const CrearAvisoPage = () => {
  const router = useRouter();
  const [contenido, setContenido] = useState('');
  const [profesorId, setProfesorId] = useState(null);
  const [cursoId, setCursoId] = useState(null);

  useEffect(() => {
    const profesorId = getUserId();
    setProfesorId(profesorId);

    const { cursoId } = router.query;
    setCursoId(cursoId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearAviso(cursoId, profesorId, contenido);
      // Resto del código para redireccionar a la página de avisos después de crear el aviso...
    } catch (error) {
      console.error('Error al crear el aviso:', error);
      // Lógica para manejar errores
    }
  };

  return (
    <div>
      <h1>Crear Aviso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contenido:</label>
          <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} />
        </div>
        <button type="submit">Crear Aviso</button>
      </form>
    </div>
  );
};

export default CrearAvisoPage;