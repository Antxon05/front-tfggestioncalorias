import { useState } from "react";
import H3 from "../ui/H3";
import Image from "../ui/Image";
import papelera from "../../assets/papelera-de-reciclaje.png";
import añadir from "../../assets/anadir.png";
import Input from "../ui/Input";
import volver from "../../assets/volver.png";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

function ModalAddFood({ onClose }: any) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newFood = {
      name,
      calories: Number(calories),
      protein: Number(protein),
      carbs: Number(carbs),
      fats: Number(fats),
    };

    await fetch("http://localhost:8080/api/food/saveFood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFood),
    });

    onClose();
  };
  return (
    <>
      <div className="fixed inset-0 min-h-screen bg-gradient-to-b from-green-100 via-green-200 to-green-300 font-poppins bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-170 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-end">
            <button onClick={onClose}>
              <Image src={volver} alt="volver" />
            </button>
          </div>
          <div className="p-5 border border-gray-300">
            <H3>Lista de alimentos</H3>
            <ul className="mt-3 max-h-64 overflow-y-auto p-5 space-y-3 text-sm">
              <li className="flex justify-between gap-x-6 py-5">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold text-gray-900">
                    Pechuga de pollo
                  </p>
                  <div className="flex justify-between mr-20">
                    <div>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        Calorías
                      </p>
                      <p>165</p>
                    </div>
                    <div>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        Protein
                      </p>
                      <p>31.0</p>
                    </div>
                    <div>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        Carbs
                      </p>
                      <p>0.0</p>
                    </div>
                    <div>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        Fats
                      </p>
                      <p>3.6</p>
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex gap-2">
                  <button>
                    <Image src={papelera} alt="papelera" />
                  </button>
                  <button>
                    <Image src={añadir} alt="añadir" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
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
                  <Input
                    className="w-25 p-2 text-center"
                    name="calories"
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="Kcal."
                  />
                  <Input
                    className="w-25 p-2 text-center"
                    name="protein"
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    placeholder="Prot."
                  />
                  <Input
                    className="w-25 p-2 text-center"
                    name="carbs"
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    placeholder="Carbs."
                  />
                  <Input
                    className="w-25 m-0 text-center"
                    name="fats"
                    type="number"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    placeholder="Gras."
                  />
                </div>
              </div>
              <div className="text-center">
                <Button>CREAR</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalAddFood;
