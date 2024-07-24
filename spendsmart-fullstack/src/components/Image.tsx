interface ImageProps {
  src: string;
  alt: string;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const Image: React.FC<ImageProps> = ({ src, alt, onClick, className }) => {
  return (
    <>
      <img src={src} alt={alt} onClick={onClick} className={className} />
    </>
  );
};

export default Image;
