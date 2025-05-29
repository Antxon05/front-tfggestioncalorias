// src/components/ui/RegisteredFoodTable.tsx
import { useState } from "react";
import Image from "../ui/Image";
import Button from "../ui/Button";
import papelera from "../../assets/papelera-de-reciclaje.png";
import editar from "../../assets/boton-editar.png";
import ModalAddFood from "./ModalAddFood";

const tabs = ["Desayuno", "Comida", "Aperitivo", "Cena"];

type Food = {
  id: number;
  name: string;
  calories: number;
  weight: number;
};

function RegisteredFoodTable() {
  const [activeTab, setActiveTab] = useState("Desayuno");
  const [showModal, setShowModal] = useState(false);
  const [foods, setFoods] = useState<Food[]>([
    { id: 1, name: "Plátano", calories: 105, weight: 300 },
    { id: 2, name: "Manzana", calories: 95, weight: 200 },
  ]);

  const handleAddClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleDelete = (id: number) => {
    setFoods((prev) => prev.filter((food) => food.id !== id));
  };

  const handleAddFood = (newFood: Food) => {
    setFoods((prev) => [...prev, newFood]);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="w-full lg:w-3/4">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`cursor-pointer hover:bg-green-700 hover:text-white flex-1 px-4 py-2 font-semibold rounded-t-xl transition-colors duration-300 ${
                activeTab === tab ? "bg-green-700 text-white" : "bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-b-xl p-4 shadow-md">
          <div className="overflow-y-auto max-h-64 space-y-2">
            {foods.length === 0 ? (
              <p className="text-center text-gray-500">No hay alimentos</p>
            ) : (
              foods.map(({ id, name, calories, weight }) => (
                <div
                  key={id}
                  className="bg-white border border-gray-300 p-3 rounded-lg flex justify-between"
                >
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-gray-600">
                      {calories} kcal, {weight}g
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(id)}
                      aria-label={`Eliminar ${name}`}
                    >
                      <Image src={papelera} alt="Eliminar" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <Button small onClick={handleAddClick}>
            Añadir Elemento +
          </Button>
        </div>
      </div>

      {showModal && <ModalAddFood onClose={() => setShowModal(false)} />}
    </>
  );
}

export default RegisteredFoodTable;
