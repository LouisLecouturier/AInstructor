import clsx from "clsx";

export default function Input({
  placeholder,
  name,
  height,
  width,
  border,
  variant,
  type,
}: {
  placeholder: string;
  name: string;
  height?: string;
  width?: string;
  border?: boolean;
  variant?: "accent" | "primary" | "secondary" | "tertiary";
  type?: "text" | "password" | "email";

}) {
  return (
    <input
      className={clsx(
        "bg-white font-semibold rounded-lg px-4 text-dark-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-opacity-100",
        height ? height : "h-12",
        width ? width : "w-full",
        border ? "ring-2 ring-accent-500 ring-opacity-20" : ""
      )}
      placeholder={placeholder}
      name={name}
      type={type || "text"}
    />
  );
}
