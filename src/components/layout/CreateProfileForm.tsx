import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { useNavigate } from "react-router-dom";
import register from "../../services/RegisterService";

function CreateProfileForm() {
  const [formData, setFormData] = useState({
    edad: "",
    genero: "",
    peso: "",
    altura: "",
    actividad: "",
    objetivo: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //esta parte sirve para cargar los datos de formPerfil si hay
  useEffect(() => {
    const datosGuardados = sessionStorage.getItem("formPerfil");
    if (datosGuardados) {
      setFormData(JSON.parse(datosGuardados));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.edad ||
      !formData.genero ||
      !formData.peso ||
      !formData.altura ||
      !formData.actividad ||
      !formData.objetivo
    ) {
      setError("Por favor rellena todos los campos.");
      return;
    }

    const parteRegistro = sessionStorage.getItem("parteRegistro");
    if (!parteRegistro) {
      setError("Faltan los datos del registro.");
      return;
    }

    const { name, email, password } = JSON.parse(parteRegistro);

    const usuarioCompleto = {
      name,
      email,
      password,
      age: parseInt(formData.edad),
      genre: formData.genero,
      weight: parseFloat(formData.peso),
      height: parseFloat(formData.altura),
      phisicalActivity: formData.actividad,
      goal: formData.objetivo,
    };

    try {
      const response = await register(usuarioCompleto);

      sessionStorage.setItem("token", response.token);
      sessionStorage.removeItem("parteRegistro");
      sessionStorage.setItem("registroCompletado", "true");
      navigate("/register/create-profile/target-calories");
    } catch (error: any) {
      setError(error.message || "Error al crear el usuario");
    }
  };

  const handleBack = () => {
    sessionStorage.setItem("formPerfil", JSON.stringify(formData));
    navigate("/register");
  };

  return (
    <div className="flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-green-50 p-6 rounded-xl shadow-md w-full max-w-2xl mb-10"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Crear Perfil
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input
            type="number"
            name="edad"
            placeholder="Introduce tu edad"
            value={formData.edad}
            onChange={handleChange}
            label="Edad"
          />
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Género</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Selecciona el género</option>
              <option value="HOMBRE">Hombre</option>
              <option value="MUJER">Mujer</option>
            </select>
          </div>
          <Input
            type="number"
            name="peso"
            placeholder="Introduce el peso en kg"
            value={formData.peso}
            onChange={handleChange}
            label="Peso"
          />
          <Input
            type="number"
            name="altura"
            placeholder="Introduce la altura en cm"
            value={formData.altura}
            onChange={handleChange}
            label="Altura"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-1 font-semibold">Actividad Física</label>
          <select
            name="actividad"
            value={formData.actividad}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Indica tu nivel de actividad física</option>
            <option value="SEDENTARIO">Sedentario</option>
            <option value="LIGERO">Ligero</option>
            <option value="MODERADO">Moderado</option>
            <option value="ACTIVO">Activo</option>
            <option value="MUY_ACTIVO">Muy Activo</option>
          </select>
        </div>

        <div className="flex flex-col mb-6">
          <label className="mb-1 font-semibold">Objetivo</label>
          <select
            name="objetivo"
            value={formData.objetivo}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">¿Cuál es tu objetivo?</option>
            <option value="AUMENTAR">Ganar masa muscular</option>
            <option value="PERDER">Perder grasa</option>
            <option value="MANTENER">Mantener peso corporal</option>
          </select>
        </div>

        <div className="flex justify-center">
          <Button
            type="button"
            className="bg-yellow-300 hover:bg-yellow-400"
            onClick={handleBack}
          >
            Volver
          </Button>
          <Button type="submit">Crear Perfil</Button>
        </div>
        {error && (
          <p className="text-red-600 text-center mt-4 font-semibold">{error}</p>
        )}
      </form>
    </div>
  );
}

export default CreateProfileForm;
