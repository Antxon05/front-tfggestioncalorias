// src/components/ui/RegisteredFoodTable.tsx
import { useEffect, useState } from "react";
import Image from "../ui/Image";
import Button from "../ui/Button";
import papelera from "../../assets/papelera-de-reciclaje.png";
import recharge from "../../assets/cargando-flechas.png";
import ModalAddFood from "../../pages/ModalAddFood";
import { toast } from "react-toastify";

const tabs = ["Desayuno", "Comida", "Aperitivo", "Cena"];
type Tab = (typeof tabs)[number];

//Definimos momentos del día
const dayMomentMap: Record<Tab, "DESAYUNO" | "COMIDA" | "APERITIVO" | "CENA"> =
  {
    Desayuno: "DESAYUNO",
    Comida: "COMIDA",
    Aperitivo: "APERITIVO",
    Cena: "CENA",
  };

//Estructura de datos que mostraremos en la tabla
export type Food = {
  id: number;
  name: string;
  calories: number;
  weight: number;
};

type Props = {
  onReload: () => void;
};

function RegisteredFoodTable({ onReload }: Props) {
  const [activeTab, setActiveTab] = useState("Desayuno");
  const [showModal, setShowModal] = useState(false);
  const [foods, setFoods] = useState<Food[]>([]);

  //Muestra la info de la pestaña "Desayuno" --> La default
  useEffect(() => {
    fetchFoodRecords(activeTab);
  }, [activeTab]);

  const fetchFoodRecords = async (tab: string) => {
    const token = localStorage.getItem("token");
    const dayMoment = dayMomentMap[tab];

    //Obtenemos los alimentos según el momento del día
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

  //Cuando le damos a Añadir Alimento muestra el modal
  const handleAddClick = () => setShowModal(true);

  //Si le damos a eliminar registro
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8080/api/foodrecord/deleteFoodRecord/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el alimento");
      }

      toast.success("Se ha eliminado el registro correctamente.");

      //Borra también el registro de la lista sin tener que actualizar la página
      setFoods((prev) => prev.filter((food) => food.id !== id));
    } catch (error) {
      toast.error("Ha ocurrido un error al eliminar el registro");
      console.error("Error al eliminar alimento:", error);
    }
    setFoods((prev) => prev.filter((food) => food.id !== id));
  };

  //Cambio de pestaña
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  //Botón cuando añadimos un nuevo foodRecord
  const handleFoodAdded = () => {
    fetchFoodRecords(activeTab);
  };

  return (
    <>
      <div className="w-full">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            //Imprimimos bucle de tabs (momentos del día)
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`cursor-pointer hover:bg-green-700 hover:text-white flex-1 px-4 py-2 font-semibold rounded-t-xl transition-colors duration-300 ${
                activeTab === tab ? "bg-green-700 text-white" : "bg-white"
              } rounded-xl sm:rounded-t-xl sm:rounded-b-none`}
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
              //Imprimimos foods records en caso de que haya
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

          <div className="flex items-center justify-between">
            <Button small onClick={handleAddClick}>
              Añadir Elemento +
            </Button>
            <button onClick={onReload}>
              <Image src={recharge} alt="" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        //Si le damos al botón nos aparece el modal creado
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
