type UnitVisualProps = {
    imageSrc: string;
    alt?: string;
};

export const UnitVisual = ({ imageSrc, alt }: UnitVisualProps) => {
    return (
        <div className="mr-6 w-32 flex-shrink-0">
            <img
                src={imageSrc}
                alt={alt || "Unit image"}
                className="w-full h-auto rounded-lg"
            />
        </div>
    );
};