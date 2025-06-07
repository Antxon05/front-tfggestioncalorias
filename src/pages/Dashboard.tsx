import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import fetchUserData from "../services/UserService";
import InfoCard from "../components/ui/InfoCard";
import RegisteredFoodTable from "../components/layout/FoodRecordTable";

function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData()
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      });
  }, []);

  if (loading) return <p>Cargando datos...</p>;

  return (
    <>
      <Navbar />
      <div className="mt-30 w-[90%] mx-auto px-4">
        <InfoCard
          title="Calorías Restantes"
          description="(kcal objetivo - kcal consumidas)"
          goal={2000}
          consumed={1300}
        />

        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          <div className="w-full lg:w-3/4">
            <RegisteredFoodTable />
          </div>

          <div className="w-full lg:w-1/5 flex flex-col gap-4">
            <InfoCard
              title="Proteínas Restantes"
              description="(prote. objetivo - prote. consumidas)"
              goal={150}
              consumed={90}
            />
            <InfoCard
              title="Carbohidratos Restantes"
              description="(carbs. objetivo - carbs. consumidas)"
              goal={250}
              consumed={180}
            />
            <InfoCard
              title="Grasas Restantes"
              description="(grasas objetivo - grasas consumidas)"
              goal={70}
              consumed={30}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
