import { useRef, useState } from "react";

const NoControlado = () => {
    const formulario = useRef(null);
    const [error, setError] = useState(null);

    // Formulario no controlado
    const handleSubmit = (e) => {
        console.log("Formulario enviado");
        //console.log(formulario.current);
        e.preventDefault();
        setError(null);

        //?Capturar datos del formulario
        // El método FormData() crea un objeto FormData que representa un conjunto de pares clave/valor.
        const datos = new FormData(formulario.current);

        // spread operator: permite a un elemento iterable ser expandido
        // copia cada uno de sus elementos
        console.log([...datos.entries()]);

        // El método Object.fromEntries() transforma una lista de pares con [clave-valor] en un objeto.
        const objetoDatos = Object.fromEntries([...datos.entries()]);
        console.log(objetoDatos);

        //?Validaciones
        if (!objetoDatos.todoNombre.trim()) {
            return console.log("Campo vacío");
        }

        if (!objetoDatos.todoNombre.trim() || !objetoDatos.todoDescripcion.trim() || !objetoDatos.todoEstado.trim()) {
            return setError("* Llena todos los campos");
        }

        console.log("Pasó las validaciones!");
        formulario.current.reset();
    };

    /* document.addEventListener("submit", (evento) => {
        evento.preventDefault();
    }); */

    return (
        <div className="col-sm-6">
            <h2 className="text-info">Formulario No Controlado</h2>
            <form
                onSubmit={handleSubmit}
                //onSubmit={(e) => handleSubmit(e)}
                ref={formulario}
            >
                <input
                    className="form-control mb-2"
                    type="text"
                    placeholder="Ingrese un TODO"
                    name="todoNombre"
                    defaultValue="Tarea #01"
                />
                <textarea
                    className="form-control mb-2"
                    type="text"
                    placeholder="Ingrese un TODO"
                    name="todoDescripcion"
                    defaultValue="Descripción tarea #01"
                />
                <select
                    className="form-select mb-2"
                    name="todoEstado"
                    defaultValue="pendiente"
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
                {error !== "" &&
                    <>
                        <hr></hr>
                        <span className="text-warning">{error}</span>
                    </>
                }
            </form>
        </div>
    );
};

export default NoControlado;
