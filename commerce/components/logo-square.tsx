import clsx from "clsx";
import LogoIcon from "./icons/logo";

interface LogoSquareProps {
  size?: "sm" | undefined;
  siteName?: string;
}

export default function LogoSquare({ size, siteName }: LogoSquareProps) {
  return (
    <div
      className={clsx("flex flex-none items-center justify-center", {
        "h-[50px]": !size,
        "h-[40px]": size === "sm",
      })}
    >
      <LogoIcon
        siteName={siteName}
        className={clsx({
          "": !size,
          "scale-75": size === "sm",
        })}
      />
    </div>
  );
}
