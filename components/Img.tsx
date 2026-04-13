import Image from "next/image";

interface Props {
  imageSrc: string;
  imageAlt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function Img({ imageSrc, imageAlt, width = 140, height = 40, className, priority }: Props) {
  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={width}
      height={height}
      className={className}
      style={{ width, height: "auto" }}
      priority={priority}
    />
  );
}