//Fetch para obtener los datos de usuario según el token de localStorage
async function fetchUserData() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No se ha encontrado un token");

  const response = await fetch("http://localhost:8080/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al intentar conseguir los datos del usuario");
  }

  return response.json();
}

export default fetchUserData;
