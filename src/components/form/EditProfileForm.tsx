import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { toast } from "react-toastify";

function EditProfileForm() {
  //Inicializamos el formulario
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    genre: "",
    goal: "",
    phisicalActivity: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  //Obtiene la información del usuario según el token
  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:8080/api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }

      const data = await response.json();

      setFormData({
        ...data,
        age: data.age.toString(),
        height: data.height.toString(),
        weight: data.weight.toString(),
        genre: data.genre || "",
        goal: data.goal || "",
        phisicalActivity: data.phisicalActivity || "",
      });
    } catch (error) {
      console.error("Error al cargar datos del usuario:", error);
      setError("No se pudieron cargar los datos del usuario.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center">Cargando datos...</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Función para actualizar usuario
  const updateUserInfo = async () => {
    const token = localStorage.getItem("token");

    const payload = {
      ...formData,
      age: parseInt(formData.age),
      height: parseInt(formData.height),
      weight: parseFloat(formData.weight),
    };

    const response = await fetch("http://localhost:8080/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Error al actualizar el usuario");
    }

    return await response.text();
  };

  //Función cuando le demos al botón "Guardar"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const edadNum = parseInt(formData.age);
    const alturaNum = parseInt(formData.height);
    const pesoNum = parseFloat(formData.weight);

    if (
      !formData.name ||
      isNaN(edadNum) ||
      isNaN(alturaNum) ||
      isNaN(pesoNum)
    ) {
      setError("Rellena todos los campos correctamente.");
      return;
    }

    if (
      isNaN(edadNum) ||
      edadNum < 14 ||
      edadNum > 120 ||
      isNaN(pesoNum) ||
      pesoNum < 30 ||
      pesoNum > 300 ||
      isNaN(alturaNum) ||
      alturaNum < 100 ||
      alturaNum > 250
    ) {
      setError("Introduce valores válidos");
      return;
    }

    try {
      await updateUserInfo();
      toast.success("Se ha actualizado correctamente el perfil");
    } catch (err: any) {
      setError(err.message || "Error al actualizar el perfil");
    }
  };

  //Función cuando le demos al botón de "Volver"
  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-green-50 p-6 rounded-xl shadow-md w-full max-w-2xl mb-10"
    >
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
        Editar Perfil
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <Input
          type="text"
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
        />
        <Input
          label="Edad"
          name="age"
          type="number"
          placeholder="Tu edad"
          min="14"
          max="100"
          value={formData.age}
          onChange={handleChange}
        />
        <Input
          label="Altura (cm)"
          placeholder="Tu altura"
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
        />
        <Input
          label="Peso (kg)"
          placeholder="Tu peso"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 font-semibold">Género</label>
        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">Selecciona tu género</option>
          <option value="HOMBRE">Hombre</option>
          <option value="MUJER">Mujer</option>
        </select>
      </div>

      <div className="flex mt-15 gap-x-6">
        <div className="mb-4">
          <label className="mb-1 font-semibold">Objetivo</label>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Selecciona tu objetivo</option>
            <option value="AUMENTAR">Ganar masa muscular</option>
            <option value="PERDER">Perder grasa</option>
            <option value="MANTENER">Mantener peso corporal</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="mb-1 font-semibold">Actividad física</label>
          <select
            name="phisicalActivity"
            value={formData.phisicalActivity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Selecciona tu actividad</option>
            <option value="SEDENTARIO">Sedentario</option>
            <option value="LIGERO">Ligero</option>
            <option value="MODERADO">Moderado</option>
            <option value="ACTIVO">Activo</option>
            <option value="MUY_ACTIVO">Muy Activo</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center h-20 px-4">
        <Button
          onClick={handleBack}
          type="button"
          className="bg-yellow-300 hover:bg-yellow-400"
        >
          Volver
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
      {error && (
        <p className="text-red-600 text-center mt-4 font-semibold">{error}</p>
      )}
    </form>
  );
}

export default EditProfileForm;
