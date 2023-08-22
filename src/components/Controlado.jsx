import React, { useState, useEffect } from "react";

const Controlado = () => {
    const [todo, setTodo] = useState({
        todoNombre: "Tarea #01",
        todoDescripcion: "Descripción tarea #01",
        todoEstado: "pendiente",
    });

    const [todoList, setTodoList] = useState([]);
    // useEffect se utiliza para cargar y guardar datos en el almacenamiento local y manejar un formulario controlado. 
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
            setTodoList(storedTodos);
        }
    }, []);

    // Esta función se ocupa de cargar tareas guardadas al iniciar el componente, mostrarlas en una lista y actualizar el almacenamiento cuando se añade una nueva tarea
    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedList = [...todoList, todo];
        setTodoList(updatedList);
        setTodo({
            todoNombre: "",
            todoDescripcion: "",
            todoEstado: "pendiente",
        });
    
        localStorage.setItem("todos", JSON.stringify(updatedList));
    };
    

    const handleOnChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        // setTodo({ ...todo, [e.target.name]: e.target.value });
        // utilizando el callback
        setTodo((todo) => ({
            ...todo,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="Container">
            <div className="row">
            <div className="col-sm-6">
                <h2 className="text-info">Formulario Controlado</h2>
                <form
                    onSubmit={handleSubmit}
                >
                    <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese un TODO"
                        name="todoNombre"
                        value={todo.todoNombre}
                        onChange={handleOnChange}
                    />
                    <textarea
                        className="form-control mb-2"
                        type="text"
                        placeholder="Ingrese Descripción"
                        name="todoDescripcion"
                        value={todo.todoDescripcion}
                        onChange={handleOnChange}
                    />
                    <select
                        className="form-select mb-2"
                        name="todoEstado"
                        value={todo.todoEstado}
                        onChange={handleOnChange}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="completado">Completado</option>
                    </select>
                    <button
                        className="btn btn-info"
                        type="submit"
                    >
                        Agregar
                    </button>
                </form>
                <br>
                </br>
                
            </div>
            {/* Lista de las Tareas que se van a ir almacenando*/}
            <div className="col-sm-6">
                    <h4 className="text-info text-center">Tareas</h4>
                    <ul>
                        {todoList.map((task, index) => (
                            <li key={index}>
                                <strong className="text-info">{task.todoNombre}<br /></strong> 
                                <strong>Descripción: </strong>{task.todoDescripcion}<br />  
                                <strong>Estado: </strong>{task.todoEstado}<br />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
        
    );
};

export default Controlado;
