interface ImageProps {
  src: string;
  alt: string;
}

const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <>
      <img src={src} alt={alt} className='w-64 h-64 rounded-full'/>
    </>
  );
};

export default Image;
