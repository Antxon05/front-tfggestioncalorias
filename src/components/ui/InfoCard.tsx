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
          {goal} - {consumed} ={" "}
          <span className="font-semibold">{remaining}</span>
        </p>
      </div>
    </>
  );
}

export default InfoCard;
