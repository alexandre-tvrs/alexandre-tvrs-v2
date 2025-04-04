import { useTranslation } from "react-i18next";
import { Mail, Linkedin } from "lucide-react";

export const Contact = () => {
    const { t } = useTranslation();
    
    return (
        <section id="contact" className="flex flex-col items-center justify-center gap-8 py-12">
        <h2 className="text-3xl font-bold">{t("contact.title")}</h2>
        <p className="text-lg text-center">{t("contact.description")}</p>
        <div className="flex gap-4 mt-6">
            <a
            href={`mailto:${t("contact.email")}`}
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
            <Mail size={20} />
            {t("contact.email")}
            </a>
            <a
            href={t("contact.linkedin")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
            <Linkedin size={20} />
            {t("contact.linkedin")}
            </a>
        </div>
        </section>
    );
};