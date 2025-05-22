import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import fetchUserData from "../services/userService";

function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      <div>
        <h1>Bienvenido, {userData.name}</h1>
        <p>Email: {userData.email}</p>
        <p>Altura (cm): {userData.height}</p>
      </div>
    </>
  );
}

export default Dashboard;
