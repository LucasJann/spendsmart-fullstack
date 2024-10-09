interface ImageProps {
  id?: string;
  src: string;
  alt: string;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const Image: React.FC<ImageProps> = ({ id, src, alt, onClick, className }) => {
  return (
    <>
      <img
        id={id}
        src={src}
        alt={alt}
        onClick={onClick}
        className={className}
      />
    </>
  );
};

export default Image;
