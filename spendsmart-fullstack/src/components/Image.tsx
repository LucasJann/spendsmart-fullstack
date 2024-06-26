interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <>
      <img src={src} alt={alt} className="w-full mt-2 mb-8 rounded-md" />
    </>
  );
};

export default Image;
