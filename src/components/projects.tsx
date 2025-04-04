import { useTranslation } from "react-i18next";
import { Image } from "@heroui/image";
import { ExternalLink } from "lucide-react";

export const Projects = () => {
  const { t } = useTranslation();

  const projects = t("projects.projects", { returnObjects: true }) as {
    title: string;
    media: string;
    description: string;
    technologies: string[];
    links: { link: string; text: string }[];
  }[];

  return (
    <section id="projects" className="flex flex-col items-center justify-center gap-8 py-12">
      <h2 className="text-3xl font-bold">{t("projects.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {projects.map((project, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-md">
            {project.media && (
              <Image
                src={project.media}
                alt={project.title}
                className="w-full h-40 object-cover rounded-lg"
              />
            )}
            <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {project.description}
            </p>

            {/* 🔹 Lista dinâmica de tecnologias */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* 🔗 Links dinâmicos */}
            <div className="mt-4 flex gap-4">
              {project.links.map((link, i) => (
                <a
                  key={i}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  {link.text} <ExternalLink size={16} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
