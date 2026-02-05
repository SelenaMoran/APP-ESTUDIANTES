import 'bootstrap/dist/css/bootstrap.min.css';
import {React, useState} from 'react';

import {Modal, ModalBody, ModalFooter, ModalHeader, Button, Alert} from 'reactstrap';


function Estudiantes(){

    const datos_estudiantes = [
        {id: 1, cedula: "0910101010", nombre: "Juan Carlos", apellido: "Cedeño"},
        {id: 2, cedula: "0920101010", nombre: "María", apellido: "Lopez"},
        {id: 3, cedula: "0930101010", nombre: "Esteban", apellido: "Riofrío"},
        {id: 4, cedula: "0940101010", nombre: "Manuela", apellido: "Ordoñez"}
    ]
    //hook para manejar el estado de los datos de los estudiantes
    const [data, setData] = useState(datos_estudiantes);
    //hook para manejar el estado del estudiante seleccionado
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState({id: 0, cedula: "", nombre: "", apellido: ""});
    //hook para manejar el estado de la ventana modal editar
    const [banderaEditar, setBanderaEditar] = useState(false);
    //hook para manejar el estado de la ventana modal Eliminar
    const [banderaEliminar, setBanderaEliminar] = useState(false);
    //hook para manejar el estado de la ventana modal Insertar
    const [banderaInsertar, setBanderaInsertar] = useState(false);
    //hook para manejar el cambio de estado de los maensajes del alert
    const [mensajeAlerta, setMensajeAlerta] = useState("");
    
    const seleccionarEstudiante = (elemento, tipo) => {
        //cambio de estado de estudiante seleccionado
        setEstudianteSeleccionado(elemento);
        //primero debo abrir el modal segun el tipo
        (tipo === 'Editar') &&  setBanderaEditar(true);
        (tipo === 'Eliminar') && setBanderaEliminar(true);
        (tipo === 'Insertar') && setBanderaInsertar(true);
    
    }
    // controlar los cambios de las cajas de texto
    const handleChangeInput = e => {
        const {name, value} = e.target;
        setEstudianteSeleccionado((prevState) => (
            { ...prevState, [name]: value }
        ))
        console.log(estudianteSeleccionado);
    }

    const editarEstudiante = () =>{
        var datos_nuevos = data;
        datos_nuevos.map(estudiante => {
            if (estudiante.id === estudianteSeleccionado.id){
                estudiante.cedula = estudianteSeleccionado.cedula;
                estudiante.nombre = estudianteSeleccionado.nombre;
                estudiante.apellido = estudianteSeleccionado.apellido;
            }
        })
        // seteo mi variable de estado de los estudiantes
        setData(datos_nuevos);
        // cerrar el modal de Editar
        setBanderaEditar(false);
        setMensajeAlerta(`Estudiante ${estudianteSeleccionado.nombre} ${estudianteSeleccionado.apellido} actualizado con éxito`);
    }

    const eliminarEstudiante = () => {
        // filtramos los datos con todos los registros de data a excepcion de el estgudiante seleccionado
        var nuevos_datos = data.filter(
            estudiante => estudiante.id !== estudianteSeleccionado.id
        );
        // seteamos el hook con el estado de los estudiantes
        setData(nuevos_datos);
        // cerrar el modal de eliminar
        setBanderaEliminar(false);
        setMensajeAlerta(`Estudiante ${estudianteSeleccionado.nombre} ${estudianteSeleccionado.apellido} eliminado con éxito`);
    }

    const crearEstudiante = () => {
        var estudiante_a_ingresar = estudianteSeleccionado; //datos del nuevo estudiante
        var nuevos_datos = data; // los datos actuales de estudiantes
        estudiante_a_ingresar.id = nuevos_datos[nuevos_datos.length - 1].id + 1;
        nuevos_datos.push(estudiante_a_ingresar); // agregamos el nuevo estudiante
        setData(nuevos_datos); // seteo el hook del estado de los estudiantes
        setBanderaInsertar(false);
        setMensajeAlerta(`Estudiante ${estudianteSeleccionado.nombre} ${estudianteSeleccionado.apellido} ingresado con éxito`);
    }

    return(      
        <div>
            <h3>Listado de Estudiantes</h3>
            <Button
                color='success'
                large = 'lg'
                onClick={()=> seleccionarEstudiante(null, 'Insertar')}>
                Insertar
            </Button>
            <p>    </p>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Cédula</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(elemento =>(
                            <tr>
                                <td>{elemento.id}</td>
                                <td>{elemento.cedula}</td>
                                <td>{elemento.nombre}</td>
                                <td>{elemento.apellido}</td>
                                <td>
                                    <button className='btn btn-primary'
                                    onClick={()=>seleccionarEstudiante(elemento, 'Editar')}>
                                        Editar
                                    </button>
                                    <button className='btn btn-danger'
                                    onClick={()=>seleccionarEstudiante(elemento, 'Eliminar')}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Modal isOpen={banderaEditar}>
                <ModalHeader>
                    <div>
                        <h3>Edición de Estudiante</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>Id</label>
                        <input className='form-control'
                            readOnly
                            type='text'
                            name='id'
                            value={estudianteSeleccionado && estudianteSeleccionado.id} 
                        />
                        <br/>
                        <label>Cedula</label>
                        <input className='form-control'
                            type='text'
                            name='cedula'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado && estudianteSeleccionado.cedula} 
                        />
                        <br/>
                        <label>Nombre</label>
                        <input className='form-control'
                            type='text'
                            name='nombre'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado && estudianteSeleccionado.nombre} 
                        />
                        <br/>
                        <label>Apellido</label>
                        <input className='form-control'
                            type='text'
                            name='apellido'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado && estudianteSeleccionado.apellido} 
                        />
                        <br/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary'
                        onClick={()=>editarEstudiante()}>
                        Guardar
                    </button>
                    <button className='btn btn-danger'
                        onClick={()=>setBanderaEditar(false)}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={banderaEliminar}>
                <ModalBody>
                    ¿Está seguro de querer eliminar el resgistro del estudiante?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary'
                        onClick={()=>eliminarEstudiante()}>
                        Si
                    </button>
                    <button className='btn btn-secondary'
                        onClick={()=>setBanderaEliminar(false)}>
                        No
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={banderaInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Ingreso de Estudiante</h3>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='form-group'>
                        <label>Id</label>
                        <input className='form-control'
                            readOnly
                            type='text'
                            name='id'
                            value={data[data.length -1].id + 1} 
                        />
                        <br/>
                        <label>Cedula</label>
                        <input className='form-control'
                            type='text'
                            name='cedula'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado ? estudianteSeleccionado.cedula: ''} 
                        />
                        <br/>
                        <label>Nombre</label>
                        <input className='form-control'
                            type='text'
                            name='nombre'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado ? estudianteSeleccionado.nombre: ''} 
                        />
                        <br/>
                        <label>Apellido</label>
                        <input className='form-control'
                            type='text'
                            name='apellido'
                            onChange={handleChangeInput}
                            value={estudianteSeleccionado ? estudianteSeleccionado.apellido: ''} 
                        />
                        <br/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary'
                        onClick={()=>crearEstudiante()}>
                        Guardar
                    </button>
                    <button className='btn btn-danger'
                        onClick={()=>setBanderaInsertar(false)}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
            <Alert color='primary'>
                {mensajeAlerta}
            </Alert>
        </div>
    );
}

export default Estudiantes;