import Image from "../components/ui/Image";
import volver from "../assets/volver.png";
import AlimentoForm from "../components/form/AlimentoForm";
import ListaAlimentos from "../components/list/ListaAlimentos";

type Props = {
  onClose: () => void;
  onAdded: () => void;
  dayMoment: "DESAYUNO" | "COMIDA" | "APERITIVO" | "CENA";
};

function ModalAddFood({ onClose, dayMoment, onAdded }: Props) {
  const handleFoodAdded = () => {
    onAdded();
  };

  return (
    <>
      <div className="fixed inset-0 min-h-screen bg-gradient-to-b from-green-100 via-green-200 to-green-300 font-poppins bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg w-170 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-end">
            <button onClick={onClose}>
              <Image src={volver} alt="volver" />
            </button>
          </div>
          <ListaAlimentos dayMoment={dayMoment} onAdded={handleFoodAdded} />
          <AlimentoForm />
        </div>
      </div>
    </>
  );
}

export default ModalAddFood;
