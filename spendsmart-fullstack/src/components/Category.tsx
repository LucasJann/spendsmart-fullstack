interface CategoryProps {
  id: string;
  src: string;
  alt: string;
  name: string;
  isCategorySelected: boolean;
  onCategorySelected: (category: string, iconPath: string, alt: string) => void;
}

const Category: React.FC<CategoryProps> = ({
  id,
  src,
  alt,
  name,
  isCategorySelected,
  onCategorySelected,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const selectedCategoryId = e.currentTarget.id;
    const selectedIconPath = e.currentTarget.src;
    const selectedCategoryAlt = e.currentTarget.alt;

    onCategorySelected(
      selectedCategoryId,
      selectedIconPath,
      selectedCategoryAlt,
    );
  };

  return (
    <ul>
      <li className="text-center">
        <div
          className={`${
            isCategorySelected
              ? "bg-gray-300 rounded-sm flex p-2 h-16 w-16 mx-auto"
              : "bg-white rounded-sm flex h-16 w-16 mx-auto"
          }`}
        >
          <img
            id={id}
            src={src}
            alt={alt}
            onClick={handleClick}
            className="max-h-full max-w-full"
          />
        </div>
        <p className="mt-2">{name}</p>
      </li>
    </ul>
  );
};

export default Category;
