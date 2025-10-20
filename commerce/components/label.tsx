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
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        }
      )}
    >
      <div className="flex items-center bg-white/30 p-1 text-xs font-semibold text-black backdrop-blur-sm h-16 w-full">
        <div className="mr-4 flex-1 pl-2 min-w-0 max-w-[70%]">
          <h3 className="line-clamp-2 leading-tight tracking-tight h-8 flex items-center">
            {title}
          </h3>
          {dosage && (
            <p className="text-xs text-gray-600 mt-1 font-normal h-4 flex items-center">
              {dosage}
            </p>
          )}
        </div>
        <Price
          className="flex-shrink-0 rounded-full bg-blue-600 p-2 text-white min-w-[80px]"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
