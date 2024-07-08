interface ImageProps {
  src: string;
  alt: string;
  onClick: () => void;
}

const Image: React.FC<ImageProps> = ({ src, alt, onClick }) => {
  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={onClick}
        className="w-64 h-64 rounded-full"
      />
    </>
  );
};

export default Image;
