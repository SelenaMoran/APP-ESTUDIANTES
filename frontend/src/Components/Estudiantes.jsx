import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const Estudiantes = () => {
  const [data, setData] = useState([
    { id: 1, cedula: "0910101010", nombre: "Juan Carlos", apellido: "Cedeño" },
    { id: 2, cedula: "0920101010", nombre: "María", apellido: "Lopez" },
    { id: 3, cedula: "0930101010", nombre: "Esteban", apellido: "Riofrío" },
    { id: 4, cedula: "0940101010", nombre: "Manuela", apellido: "Ordoñez" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState({ id: "", cedula: "", nombre: "", apellido: "" });

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrent({ ...current, [name]: value });
  };

  const handleSave = () => {
    if (current.id) {
      // Editar estudiante
      setData(data.map((d) => (d.id === current.id ? current : d)));
    } else {
      // Nuevo estudiante
      setData([...data, { ...current, id: Date.now() }]);
    }
    toggleModal();
  };

  const handleEdit = (est) => {
    setCurrent(est);
    toggleModal();
  };

  const handleDelete = (id) => {
    setData(data.filter((d) => d.id !== id));
  };

  return (
    <div>
      <h3>Listado de Estudiantes</h3>
      <Button color="success" onClick={() => { setCurrent({ id: "", cedula: "", nombre: "", apellido: "" }); toggleModal(); }}>Insertar</Button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((est) => (
            <tr key={est.id}>
              <td>{est.id}</td>
              <td>{est.cedula}</td>
              <td>{est.nombre}</td>
              <td>{est.apellido}</td>
              <td>
                <Button color="primary" onClick={() => handleEdit(est)}>Editar</Button>
                <Button color="danger" onClick={() => handleDelete(est.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{current.id ? "Edición de Estudiante" : "Ingreso de Estudiante"}</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="cedula">Cédula</label>
            <input id="cedula" name="cedula" type="text" className="form-control" value={current.cedula} onChange={handleInputChange} />
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" name="nombre" type="text" className="form-control" value={current.nombre} onChange={handleInputChange} />
            <label htmlFor="apellido">Apellido</label>
            <input id="apellido" name="apellido" type="text" className="form-control" value={current.apellido} onChange={handleInputChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>Guardar</Button>
          <Button color="danger" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Estudiantes;
