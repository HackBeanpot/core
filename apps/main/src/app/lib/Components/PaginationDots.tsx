import clsx from "clsx";
import React from "react";
// Pagination Dots Component
type PaginationDotsProps = {
  currentPage: number;
  totalPages: number;
  color: string;
  handleClick: (index: number) => void;
};

const PaginationDots: React.FC<PaginationDotsProps> = ({
  currentPage,
  totalPages,
  color,
  handleClick,
}) => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <div
          key={index}
          className={clsx(
            `w-4 h-4 rounded-full cursor-pointer hover:scale-110`,
            currentPage === index
              ? `bg-${color}` // Highlight current page
              : `bg-${color} opacity-40`,
          )}
          onClick={() => {
            handleClick(index);
          }}
        />
      ))}
    </div>
  );
};

export default PaginationDots;
