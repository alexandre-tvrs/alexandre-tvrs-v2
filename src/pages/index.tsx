import DefaultLayout from "@/layouts/default";
import { useTranslation } from "react-i18next";
import { Image } from "@heroui/image";
import { ReactTyped } from "react-typed";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Footer } from "@/components/footer";
import { Contact } from "@/components/contact";

export default function IndexPage() {
  const { t } = useTranslation();
  const strings: string[] = [
    t("home.typed.0"),
    t("home.typed.1"),
    t("home.typed.2"),
    t("home.typed.3"),
  ];
  return (
    <DefaultLayout>
      <section className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 md:py-10" id="header">
        <div className="grid grid-cols-2">
          <div className="flex justify-center col-span-1">
            <Image
              alt="Alexandre Tavares"
              src="https://avatars.githubusercontent.com/u/71346377?v=4"
              width={300}
              isBlurred
            />
          </div>

          <div className="md:text-left self-center col-span-1">
            <h1 className="text-4xl font-bold">{t("home.title")}</h1>
            <p className="text-2xl">{t("home.subtitle")}</p>
            <ReactTyped
              strings={strings}
              typeSpeed={40}
              backSpeed={50}
              loop
              className="text-3xl font-bold"
            />
          </div>
        </div>
      </section>

    {/* aumentar o espaçamento a seção de quote */}
      <section className="flex flex-col items-center justify-center gap-2 py-8 md:py-72" id="quote">
        <p className="text-3xl font-bold italic text-center max-w-2xl">
          {t("home.quote.text")}
        </p>
        <p className="text-md italic text-center max-w-2xl">
          {t("home.quote.author")}
        </p>
      </section>

      <Experience />

      <Projects />

      <Contact />
      
      <Footer />

    </DefaultLayout>
  );
}
