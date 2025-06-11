function NextButton({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <button
        type="button"
        className="transition-all duration-300 ease-out hover:scale-105 cursor-pointer w-16 h-16 shadow-md rounded-full bg-green-700 text-white text-lg font-bold flex items-center justify-center hover:bg-green-600 focus:outline-none"
        onClick={onClick}
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </>
  );
}

export default NextButton;
