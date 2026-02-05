import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Estudiantes from './Components/Estudiantes';

describe('Componente Estudiantes', () => {

  test('Renderiza lista de estudiantes inicial', () => {
    render(<Estudiantes />);
    expect(screen.getByText(/Juan Carlos/i)).toBeInTheDocument();
    expect(screen.getByText(/María/i)).toBeInTheDocument();
  });

  test('Agregar un nuevo estudiante', () => {
    render(<Estudiantes />);
    fireEvent.click(screen.getByText(/Insertar/i));

    fireEvent.change(screen.getByLabelText(/Cédula/i), { target: { value: '0950101010' } });
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Andres' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Jaramillo' } });
    fireEvent.click(screen.getByText(/^Guardar$/i));

    expect(screen.getByText(/Andres/i)).toBeInTheDocument();
    expect(screen.getByText(/Jaramillo/i)).toBeInTheDocument();
  });

  test('Editar un estudiante', () => {
    render(<Estudiantes />);
    fireEvent.click(screen.getAllByText(/Editar/i)[0]);

    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juanito' } });
    fireEvent.click(screen.getByText(/^Guardar$/i));

    expect(screen.getByText(/Juanito/i)).toBeInTheDocument();
  });

  test('Eliminar un estudiante', () => {
    render(<Estudiantes />);
    const nombre = screen.getByText(/Juan Carlos/i);
    fireEvent.click(screen.getAllByText(/Eliminar/i)[0]);
    expect(nombre).not.toBeInTheDocument();
  });

});
