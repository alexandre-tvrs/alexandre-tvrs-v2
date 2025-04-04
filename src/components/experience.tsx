import { useTranslation } from "react-i18next";
import { Briefcase, CalendarDays, Building2 } from "lucide-react";

export const Experience = () => {
  const { t } = useTranslation();

  // É um array de objetos com as experiências
  // Cada objeto tem as propriedades: title, description, date, company
  const experiences: {
    title: string;
    description: string;
    date: string;
    company: string;
  }[] = [
    {
      title: t("experience.experiences.0.title"),
      description: t("experience.experiences.0.description"),
      date: t("experience.experiences.0.date"),
      company: t("experience.experiences.0.company"),
    },
    {
      title: t("experience.experiences.1.title"),
      description: t("experience.experiences.1.description"),
      date: t("experience.experiences.1.date"),
      company: t("experience.experiences.1.company"),
    },
    {
      title: t("experience.experiences.2.title"),
      description: t("experience.experiences.2.description"),
      date: t("experience.experiences.2.date"),
      company: t("experience.experiences.2.company"),
    },
  ];

  return (
    <section
      className="flex flex-col items-center justify-center gap-8 py-12"
      id="experience"
    >
      <h2 className="text-3xl font-bold">{t("experience.title")}</h2>

      <div className="grid gap-6 max-w-4xl w-full px-4">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border rounded-2xl p-6 shadow-lg transition hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" />
              {exp.title}
            </h3>

            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {exp.date}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {exp.company}
              </span>
            </div>

            <p className="mt-3">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
