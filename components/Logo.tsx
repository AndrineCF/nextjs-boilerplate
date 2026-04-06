import Image from "next/image";

interface Props {
  imageSrc: string;
  imageAlt: string;
  width?: number;
}

export default function Logo({ width = 140, imageSrc, imageAlt }: Props) {
  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      width={width}
      height={40}
      style={{ width: `${width}px`, height: "auto" }}
    />
  );
}