import Navbar from "../components/layout/Navbar";
import Button from "../components/ui/Button";

function Login() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-evenly px-4">
        <form className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
            Iniciar Sesión
          </h2>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-5">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="flex justify-center m-5">
              <Button>Entrar</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
