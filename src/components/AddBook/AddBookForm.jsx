import React, { useState } from "react";
import "./AddBookForm.css";
import { FaBook, FaUser, FaCalendar, FaBuilding } from "react-icons/fa";
import LibroService from "../../services/LibroService";
import { useNavigate } from "react-router-dom";

const AddBookForm = () => {
    const [bookData, setBookData] = useState({
        titulo: "",
        autor: "",
        anio: "",
        editorial: "",
        estado: "DISPONIBLE",   // estado por defecto
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Validaciones corregidas
    const validarTitulo = (titulo) => {
        return titulo.trim().length > 0 && titulo.length <= 50;
    };

    const validarAutor = (autor) => {
        return autor.trim().length > 0 && autor.length <= 70;
    };

    const validarAnio = (anio) => {
        const year = parseInt(anio, 10);
        const currentYear = new Date().getFullYear();
        return !isNaN(year) && year >= 1000 && year <= currentYear;
    };

    const validarEditorial = (editorial) => {
        return editorial.trim().length > 0 && editorial.length <= 70;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
        setErrorMsg("");
        setSuccessMsg("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (!validarTitulo(bookData.titulo)) {
            setErrorMsg("El título es obligatorio y debe tener máximo 50 caracteres");
            return;
        }
        if (!validarAutor(bookData.autor)) {
            setErrorMsg("El autor es obligatorio y debe tener máximo 70 caracteres");
            return;
        }
        if (!validarAnio(bookData.anio)) {
            setErrorMsg("El año debe ser válido y no mayor al año actual");
            return;
        }
        if (!validarEditorial(bookData.editorial)) {
            setErrorMsg("La editorial es obligatoria y debe tener máximo 70 caracteres");
            return;
        }

        setIsLoading(true);

        try {
            const bookToSave = {
                ...bookData,
                anio: parseInt(bookData.anio, 10),
                estado: "DISPONIBLE", // aseguramos el valor al enviar
            };

            const response = await LibroService.saveBook(bookToSave);
            console.log("Libro guardado:", response.data);

            setSuccessMsg("El libro ha sido insertado exitosamente");

            setTimeout(() => {
                setBookData({
                    titulo: "",
                    autor: "",
                    anio: "",
                    editorial: "",
                    estado: "DISPONIBLE", // estado por defecto al limpiar
                });
                setSuccessMsg("");
            }, 1500);

        } catch (error) {
            console.error("Error al guardar el libro:", error);
            setErrorMsg(
                error.response?.data?.message ||
                "Error al agregar el libro. Por favor, intente nuevamente"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="add-book-wrapper">
            <form onSubmit={handleSubmit} className="add-book-form">
                <h1>Agregar Nuevo Libro</h1>

                {errorMsg && <div className="error-message">{errorMsg}</div>}
                {successMsg && <div className="success-message">{successMsg}</div>}

                <div className="input-box">
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título del libro"
                        value={bookData.titulo}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />
                    <FaBook className="icon" />
                </div>

                <div className="input-box">
                    <input
                        type="text"
                        name="autor"
                        placeholder="Autor"
                        value={bookData.autor}
                        onChange={handleChange}
                        maxLength={70}
                        required
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-box">
                    <input
                        type="number"
                        name="anio"
                        placeholder="Año de publicación"
                        value={bookData.anio}
                        onChange={handleChange}
                        min="1000"
                        max={new Date().getFullYear()}
                        required
                    />
                    <FaCalendar className="icon" />
                </div>

                <div className="input-box">
                    <input
                        type="text"
                        name="editorial"
                        placeholder="Editorial"
                        value={bookData.editorial}
                        onChange={handleChange}
                        maxLength={70}
                        required
                    />
                    <FaBuilding className="icon" />
                </div>

                <div className="button-group">
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? "Guardando..." : "Agregar Libro"}
                    </button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={handleCancel}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBookForm;
