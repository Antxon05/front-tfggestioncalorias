type UsuarioCompleto = {
  name: string;
  email: string;
  password: string;
  age: number;
  genre: string;
  weight: number;
  height: number;
  phisicalActivity: string;
  goal: string;
};

//Fetch para realizar un registro, pasadole los datos de UsuarioCompleto
async function register(usuario: UsuarioCompleto) {
  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Ya existe un usuario con este correo!");
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return null;
}

export default register;
