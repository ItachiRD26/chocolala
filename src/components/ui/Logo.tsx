import Image from "next/image";

type LogoProps = {
  variant?: "brown" | "white";
  className?: string;
};

const SRC = {
  brown: "/images/logo-chocolala-nofondo.webp",
  white: "/images/logo-blanco.webp",
};

export default function Logo({
  variant = "brown",
  className = "h-10 w-auto sm:h-12",
}: LogoProps) {
  return (
    <Image
      src={SRC[variant]}
      alt="Chocolala"
      width={160}
      height={160}
      priority
      className={`w-auto object-contain ${className}`}
    />
  );
}
