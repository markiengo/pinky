import Image from "next/image";

interface LogoImageProps {
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function LogoImage({ width, height, className = "", priority }: LogoImageProps) {
  return (
    <div
      className={`relative flex-shrink-0 overflow-hidden ${className}`}
      style={{
        width,
        height,
        borderRadius: "22%",
        background: "linear-gradient(135deg, #F4899A 0%, #9F7AEA 100%)",
      }}
    >
      <Image
        src="/logo.png"
        alt="Crambox logo"
        width={width}
        height={height}
        priority={priority}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ mixBlendMode: "multiply" }}
      />
    </div>
  );
}
