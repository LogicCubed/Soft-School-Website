import Image from "next/image";

type UnitVisualProps = {
    imageSrc: string;
    alt?: string;
};

export const UnitVisual = ({ imageSrc, alt }: UnitVisualProps) => {
    return (
        <div className="mr-6 w-32 flex-shrink-0">
            <Image
                src={imageSrc}
                alt={alt || "Unit image"}
                className="rounded-lg"
                width={128}
                height={128}
            />
        </div>
    );
};