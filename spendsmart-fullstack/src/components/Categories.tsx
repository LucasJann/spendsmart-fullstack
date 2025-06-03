import { useState } from "react";
import { categoryExpenseItems, categoryIncomeItems } from "./Categories.types";

import Category from "./Category";

interface CategoriesProps {
  isSelected: boolean;
  onCategorySelected: (categoryId: string, iconPath: string, alt: string, ) => void;
}

const Categories: React.FC<CategoriesProps> = ({
  isSelected,
  onCategorySelected,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleCategorySelected = (
    categoryId: string,
    iconPath: string,
    alt: string
  ) => {
    onCategorySelected(categoryId, iconPath, alt);
    setSelectedCategoryId(categoryId);
  };

  const categoriesToRender = isSelected
    ? categoryExpenseItems
    : categoryIncomeItems;

  return (
    <div>
      <label className="ml-1 caret-transparent">Categories:</label>
      <div className="mt-1 p-2 bg-black bg-opacity-40 rounded-md caret-transparent grid grid-cols-3 gap-4">
        {categoriesToRender.map((category) => (
          <Category
            id={category.id}
            key={category.id}
            alt={category.alt}
            src={category.src}
            name={category.name}
            isCategorySelected={selectedCategoryId === category.id}
            onCategorySelected={handleCategorySelected}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
