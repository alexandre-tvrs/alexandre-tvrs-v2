import { useTranslation } from "react-i18next";
import { Mail, Linkedin } from "lucide-react";

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center gap-6 py-8 px-4 md:py-12 md:px-0"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center">{t("contact.title")}</h2>
      <p className="text-base md:text-lg text-center max-w-md">{t("contact.description")}</p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center mt-4">
        <a
          href={`mailto:${t("contact.email")}`}
          className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm md:text-base w-full sm:w-auto"
        >
          <Mail size={18} className="flex-shrink-0" />
          <span className="truncate">{t("contact.email")}</span>
        </a>
        <a
          href={t("contact.linkedin")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm md:text-base w-full sm:w-auto"
        >
          <Linkedin size={18} className="flex-shrink-0" />
          <span className="truncate">{t("contact.linkedin")}</span>
        </a>
      </div>
    </section>
  );
};