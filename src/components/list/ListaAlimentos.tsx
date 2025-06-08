import H3 from "../ui/H3";
import Image from "../ui/Image";
import papelera from "../../assets/papelera-de-reciclaje.png";
import añadir from "../../assets/anadir.png";
import { useEffect, useState } from "react";
import recharge from "../../assets/cargando-flechas.png";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function getUserIdFromToken(): number | null {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.userId ?? null;
  } catch {
    return null;
  }
}

type Food = {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
  createdByUser?: number;
};

type Props = {
  dayMoment: "DESAYUNO" | "COMIDA" | "APERITIVO" | "CENA";
  onAdded: () => void;
};

function ListaAlimentos({ dayMoment, onAdded }: Props) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const userId = getUserIdFromToken();
  const token = localStorage.getItem("token");

  const refrescList = () => {
    setSearch("");
    fetchFoods("");
  };

  //Consulta para obtener comidas a la base de datos
  const fetchFoods = async (query = "") => {
    if (!token) {
      setError("No estás autenticado");
      return;
    }

    try {
      const url = query
        ? `http://localhost:8080/api/food?name=${encodeURIComponent(query)}`
        : "http://localhost:8080/api/food";

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("No se pudieron cargar los alimentos.");
      }

      const data = await response.json();
      setFoods(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    }
  };

  //Consulta para eliminar alimento de la base de datos
  const deleteFood = async (id: number) => {
    if (!window.confirm("¿Seguro que quieres eliminar este alimento?")) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No estas autenticado");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/food/deleteFood/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Error al eliminar el alimento de la base de datos.");
        throw new Error("No se pudo eliminar el alimento");
      }

      toast.success(
        "Se ha eliminado el alimento correctamente de la base de datos."
      );
      setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
      setError(null);
    } catch (err: any) {
      console.log(err);
    }
  };

  //Consulta para añadir un registro a un momento del día
  const addFoodToRecord = async (foodId: number) => {
    const weightInput = prompt("¿Cuántos gramos quieres añadir?");
    if (!weightInput) return;

    const weight = parseFloat(weightInput);
    if (isNaN(weight) || weight <= 0) {
      alert("Introduce una cantidad válida en gramos.");
      return;
    }

    if (!token) {
      setError("No estas autenticado");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/foodrecord/saveFoodRecord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            foodId: foodId,
            weightgm: weight,
            dayMoment,
          }),
        }
      );

      if (!response.ok) {
        toast.error("Error al registrar el alimento.");
        throw new Error("Error al guardar el alimento en el registro.");
      }

      toast.success("Se ha registrado el alimento correctamente.");

      if (onAdded) {
        onAdded();
      }
    } catch (err: any) {
      alert(err.message || "Error desconocido");
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchFoods(search);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <div className="p-5 border border-gray-300">
      <H3>Lista de alimentos</H3>

      <form
        className="max-w-md mx-auto bg-white p-4 rounded-lg shadow"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
            placeholder="Search Mockups, Logos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </div>
      </form>

      <div className="flex justify-end">
        <button onClick={refrescList}>
          <Image src={recharge} alt="" />
        </button>
      </div>
      <ul className="mt-3 max-h-64 overflow-y-auto p-5 space-y-3 text-sm">
        {foods.length === 0 && !error ? (
          <p className="text-center text-gray-500">No hay alimentos</p>
        ) : (
          foods.map((food) => (
            <li key={food.id} className="flex justify-between gap-x-6 py-5">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold text-gray-900">
                  {food.name}
                </p>
                <div className="flex justify-between mr-20">
                  <div>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      Calorías
                    </p>
                    <p>{food.calories}</p>
                  </div>
                  <div>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      Protein
                    </p>
                    <p>{food.protein}</p>
                  </div>
                  <div>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      Carbs
                    </p>
                    <p>{food.carbohydrates}</p>
                  </div>
                  <div>
                    <p className="mt-1 truncate text-xs/5 text-gray-500">
                      Fats
                    </p>
                    <p>{food.fats}</p>
                  </div>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                {food.createdByUser === userId && (
                  <button onClick={() => deleteFood(food.id)}>
                    <Image src={papelera} alt="papelera" />
                  </button>
                )}
                <button onClick={() => addFoodToRecord(food.id)}>
                  <Image src={añadir} alt="añadir" />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default ListaAlimentos;
