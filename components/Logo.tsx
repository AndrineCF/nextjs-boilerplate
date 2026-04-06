import Image from "next/image";
import Link from "next/link";

interface Props {
    imageSrc: string;
    imageAlt: string;
    width?: number;
}

export default function Logo({ width = 140, imageSrc, imageAlt}: Props) {
  return (
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={width}
        height={0}
        style={{ height: "auto" }}
      />
  );
}