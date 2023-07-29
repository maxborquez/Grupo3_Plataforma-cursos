// Importa los módulos necesarios
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAvisoPorId, actualizarAviso } from '../../data/avisosData';

const EditarAviso = () => {
  const router = useRouter();
  const { avisoId } = router.query;

  // Estado para almacenar los detalles del aviso
  const [aviso, setAviso] = useState({}); // Inicializa como un objeto vacío {}

  // Carga los detalles del aviso al cargar la página
  useEffect(() => {
    if (avisoId) {
      obtenerAviso();
    }
  }, [avisoId]);

  // Función para obtener los detalles del aviso por su ID
  const obtenerAviso = async () => {
    try {
      const avisoObtenido = await getAvisoPorId(avisoId);
      setAviso(avisoObtenido);
    } catch (error) {
      console.error('Error al obtener el aviso:', error);
    }
  };

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    setAviso({
      ...aviso,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar el envío del formulario de edición
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía la solicitud para actualizar el aviso
      await actualizarAviso(avisoId, aviso);
      // Redirige a la página anterior después de la edición exitosa
      router.back();
    } catch (error) {
      console.error('Error al editar el aviso:', error);
    }
  };

  return (
    <div>
      <h1>Editar Aviso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contenido del Aviso:</label>
          <textarea name="contenido" value={aviso.contenido || ''} onChange={handleChange} />
        </div>
        {/* Puedes agregar más campos del aviso aquí según tu modelo */}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarAviso;
