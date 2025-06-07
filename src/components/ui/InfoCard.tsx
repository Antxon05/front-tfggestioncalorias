type Props = {
  title: string;
  description: string;
  goal: number;
  consumed: number;
};

function InfoCard({ title, goal, consumed, description }: Props) {
  const remaining = goal - consumed;

  return (
    <>
      <div className="bg-white p-4 text-center rounded-xl w-full max-w-lg m-auto shadow-md text-lg">
        <p className="font-bold text-green-700">{title}</p>
        <p className="text-xs">{description}</p>
        <p>
          <span className="text-orange-400 font-semibold">{goal} </span> -{" "}
          {consumed} ={" "}
          <span className="font-semibold text-green-700">{remaining}</span>
        </p>
      </div>
    </>
  );
}

export default InfoCard;
