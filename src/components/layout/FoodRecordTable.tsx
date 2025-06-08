// src/components/ui/RegisteredFoodTable.tsx
import { useEffect, useState } from "react";
import Image from "../ui/Image";
import Button from "../ui/Button";
import papelera from "../../assets/papelera-de-reciclaje.png";
import ModalAddFood from "../../pages/ModalAddFood";

const tabs = ["Desayuno", "Comida", "Aperitivo", "Cena"];
type Tab = (typeof tabs)[number];

const dayMomentMap: Record<Tab, "DESAYUNO" | "COMIDA" | "APERITIVO" | "CENA"> =
  {
    Desayuno: "DESAYUNO",
    Comida: "COMIDA",
    Aperitivo: "APERITIVO",
    Cena: "CENA",
  };

export type Food = {
  id: number;
  name: string;
  calories: number;
  weight: number;
};

function RegisteredFoodTable() {
  const [activeTab, setActiveTab] = useState("Desayuno");
  const [showModal, setShowModal] = useState(false);
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    fetchFoodRecords(activeTab);
  }, [activeTab]);

  const fetchFoodRecords = async (tab: string) => {
    const token = localStorage.getItem("token");
    const dayMoment = dayMomentMap[tab];

    try {
      const response = await fetch(
        `http://localhost:8080/api/foodrecord?dayMoment=${dayMoment}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los alimentos");
      }

      const data = await response.json();

      const mappedFoods: Food[] = data.map((item: any) => ({
        id: item.id,
        name: item.foodName,
        calories: item.calories,
        weight: item.weightgm,
      }));

      setFoods(mappedFoods);
    } catch (error) {
      console.error("Error al cargar alimentos:", error);
    }
  };

  const handleAddClick = () => setShowModal(true);

  const handleDelete = (id: number) => {
    setFoods((prev) => prev.filter((food) => food.id !== id));
  };

  const handleAddFood = (newFood: Food) => {
    setFoods((prev) => [...prev, newFood]);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleFoodAdded = () => {
    fetchFoodRecords(activeTab);
  };

  return (
    <>
      <div className="w-full">
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

      {showModal && (
        <ModalAddFood
          onClose={() => setShowModal(false)}
          onAdded={handleFoodAdded}
          dayMoment={dayMomentMap[activeTab]}
        />
      )}
    </>
  );
}

export default RegisteredFoodTable;
