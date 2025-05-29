type Props = {
  src: string;
  alt: string;
};

function Image({ src, alt }: Props) {
  return (
    <img
      src={src}
      className="mr-2 cursor-pointer w-7 hover:w-8 transition-all duration-200"
      alt={alt}
    />
  );
}

export default Image;
