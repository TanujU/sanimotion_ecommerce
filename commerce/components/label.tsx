import clsx from "clsx";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  dosage,
  position = "bottom",
}: {
  title: string;
  amount: string;
  currencyCode: string;
  dosage?: string;
  position?: "bottom" | "center";
}) => {
  return (
    <div className="flex flex-col p-4 bg-white w-full border-t border-gray-100">
      {/* Product Title */}
      <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 min-h-[2.5rem]">
        {title}
      </h3>
      
      {/* Dosage */}
      {dosage && (
        <p className="text-xs text-gray-500 mb-3">
          {dosage}
        </p>
      )}
      
      {/* Price and Add to Cart space */}
      <div className="flex items-center justify-between mt-auto">
        <Price
          className="text-lg font-bold text-blue-600"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden"
        />
        {/* Space reserved for Add to Cart button */}
        <div className="add-to-cart-slot"></div>
      </div>
    </div>
  );
};

export default Label;
