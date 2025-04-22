import { useTranslation } from "react-i18next";

export default function MyLovePage() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center gap-4 py-6 md:py-10 px-4">
            <iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/track/5fVl28RgREvxVtGSf9OsbK?utm_source=generator" width="20%" height="100" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <h1 className="text-3xl md:text-4xl font-bold">{t("my_love.title")}</h1>
            <p className="text-xl md:text-2xl mt-2">{t("my_love.subtitle")}</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {Array.from({ length: 5 }, (_, index) => (
                    <img
                        key={index}
                        src={`/assets/my_love/${index + 1}.jpg`}
                        alt={`Imagem ${index + 1}`}
                        className="w-32 h-32 md:w-48 md:h-48 rounded-lg shadow-lg"
                    />
                ))}
            </div>
            <p className="text-md italic text-center max-w-2xl mt-4">{t("my_love.description")}</p>
        </div>
    );
} 