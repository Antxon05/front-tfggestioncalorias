interface LoginResponse {
  token: string;
}

//Fetch para realizar el login, con email y password pasado
async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Correo o contraseña incorrectos");
  }

  return response.json();
}

export default login;
