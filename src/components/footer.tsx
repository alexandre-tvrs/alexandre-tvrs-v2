import { useTranslation } from "react-i18next";
import { Image } from "@heroui/image";

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="flex items-center gap-4">
                <Image
                    alt="Alexandre Tavares"
                    src="https://avatars.githubusercontent.com/u/71346377?v=4"
                    width={50}
                />
                <span className="text-lg font-bold">{t("footer.name")}</span>
            </div>
            <p className="text-sm">{t("footer.description")}</p>
        </footer>
    );
};