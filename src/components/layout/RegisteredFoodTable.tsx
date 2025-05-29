// src/components/ui/RegisteredFoodTable.tsx
import { useState } from "react";
import Image from "../ui/Image";
import Button from "../ui/Button";
import papelera from "../../assets/papelera-de-reciclaje.png";
import editar from "../../assets/boton-editar.png";

const tabs = ["Desayuno", "Comida", "Aperitivo", "Cena"];

function RegisteredFoodTable() {
  const [activeTab, setActiveTab] = useState("Desayuno");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
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
          <div className="bg-white border border-gray-300 p-3 rounded-lg flex justify-between">
            <div>
              <p className="font-medium">Plátano</p>
              <p className="text-sm text-gray-600">105 kcal, 300g</p>
            </div>
            <div className="flex gap-2">
              <button>
                <Image src={papelera} alt="Eliminar" />
              </button>
              <button>
                <Image src={editar} alt="Editar" />
              </button>
            </div>
          </div>
        </div>

        <Button small>Añadir Elemento +</Button>
      </div>
    </div>
  );
}

export default RegisteredFoodTable;
