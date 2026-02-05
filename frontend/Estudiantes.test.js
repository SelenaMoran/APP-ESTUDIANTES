import { render, screen, fireEvent } from '@testing-library/react';
import Estudiantes from './Estudiantes';

describe('Componente Estudiantes', () => {

  test('Renderiza lista de estudiantes inicial', () => {
    render(<Estudiantes />);
    // Verifica que un estudiante inicial exista
    expect(screen.getByText(/Juan Carlos/i)).toBeInTheDocument();
    expect(screen.getByText(/María/i)).toBeInTheDocument();
  });

  test('Agregar un nuevo estudiante', () => {
    render(<Estudiantes />);
    
    // Click en botón Insertar
    fireEvent.click(screen.getByText(/Insertar/i));

    // Cambiar valores de input
    fireEvent.change(screen.getByLabelText(/Cedula/i), { target: { value: '0950101010' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Andres' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Jaramillo' } });

    // Click en Guardar
    fireEvent.click(screen.getByText(/^Guardar$/i));

    // Verificar que se agregó
    expect(screen.getByText(/Andres/i)).toBeInTheDocument();
    expect(screen.getByText(/Jaramillo/i)).toBeInTheDocument();
  });

  test('Editar un estudiante', () => {
    render(<Estudiantes />);

    // Click en Editar del primer estudiante
    fireEvent.click(screen.getAllByText(/Editar/i)[0]);

    // Cambiar nombre
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juanito' } });

    // Guardar
    fireEvent.click(screen.getByText(/^Guardar$/i));

    // Verificar cambio
    expect(screen.getByText(/Juanito/i)).toBeInTheDocument();
  });

  test('Eliminar un estudiante', () => {
    render(<Estudiantes />);

    // Click en Eliminar del primer estudiante
    fireEvent.click(screen.getAllByText(/Eliminar/i)[0]);

    // Confirmar eliminación
    fireEvent.click(screen.getByText(/^Si$/i));

    // Verificar que desapareció
    expect(screen.queryByText(/Juan Carlos/i)).not.toBeInTheDocument();
  });
});
