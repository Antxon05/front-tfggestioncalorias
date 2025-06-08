import { useState } from "react";
import Button from "../ui/Button";
import H3 from "../ui/H3";
import Input from "../ui/Input";
import { toast } from "react-toastify";

function AlimentoForm() {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name.trim() || !calories || !protein || !carbs || !fats) {
      setErrorMessage("No se puede dejar ningún valor vacío");
      return;
    }

    setErrorMessage("");

    const tokenUser = localStorage.getItem("token");

    if (!tokenUser) {
      alert("Sesión expirada. Inicia sesión de nuevo");
      return;
    }

    const newFood = {
      name,
      calories: Number(calories),
      protein: Number(protein),
      carbohydrates: Number(carbs),
      fats: Number(fats),
    };

    console.log(newFood);

    try {
      const response = await fetch("http://localhost:8080/api/food/saveFood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenUser}`,
        },
        body: JSON.stringify(newFood),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Error al guardar la comida:", data);
        return;
      }

      setName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFats("");
      setErrorMessage("");

      toast.success("Se ha creado un nuevo alimento.");
      console.log("Comida guardada correctamente", data);
    } catch (error) {
      toast.error("ha ocurrido un error al crear un alimento nuevo.");
      setErrorMessage("Error en la petición. Inténtalo de nuevo");
    }
  };
  return (
    <div className="mt-5 border border-gray-300 p-6">
      <H3>Crear Alimento (Basado en 100gm)</H3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <div className="p-5 max-w-md">
            <Input
              className="w-100"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre alimento..."
            />
          </div>
          <div className="flex gap-4 p-2">
            <div className="flex flex-col items-center">
              <p className="mb-1 font-medium">Kcal:</p>
              <Input
                className="w-25 p-2 text-center"
                name="calories"
                type="number"
                min="0"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Kcal."
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-1 font-medium">Prote:</p>
              <Input
                className="w-25 p-2 text-center"
                name="protein"
                type="number"
                min="0"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="Prot."
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-1 font-medium">Carbs:</p>
              <Input
                className="w-25 p-2 text-center"
                name="carbs"
                type="number"
                min="0"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="Carbs."
              />
            </div>
            <div className="flex flex-col items-center">
              <p className="mb-1 font-medium">Grasas:</p>
              <Input
                className="w-25 m-0 text-center"
                name="fats"
                type="number"
                min="0"
                value={fats}
                onChange={(e) => setFats(e.target.value)}
                placeholder="Gras."
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button type="submit">CREAR</Button>
          {errorMessage && (
            <p className="text-red-600 text-center mt-4 font-semibold">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default AlimentoForm;
