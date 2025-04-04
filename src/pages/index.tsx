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
      <section
        className="flex flex-col items-center justify-center gap-4 py-6 md:py-10 px-4"
        id="header"
      >
        <div className="flex flex-col md:grid md:grid-cols-2 w-full max-w-6xl">
          <div className="flex justify-center md:col-span-1 mb-6 md:mb-0">
            <Image
              alt="Alexandre Tavares"
              src="https://avatars.githubusercontent.com/u/71346377?v=4"
              width={200}
              height={200}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72"
              isBlurred
            />
          </div>

          <div className="text-center md:text-left self-center md:col-span-1">
            <h1 className="text-3xl md:text-4xl font-bold">
              {t("home.title")}
            </h1>
            <p className="text-xl md:text-2xl mt-2">{t("home.subtitle")}</p>
            <ReactTyped
              strings={strings}
              typeSpeed={40}
              backSpeed={50}
              loop
              className="text-2xl md:text-3xl font-bold mt-4"
            />
          </div>
        </div>
      </section>
      <section
        className="flex flex-col items-center justify-center gap-2 py-8 md:py-72"
        id="quote"
      >
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
