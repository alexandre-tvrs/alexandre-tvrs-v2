import DefaultLayout from "@/layouts/default";
import { useTranslation } from "react-i18next";
import { Image } from "@heroui/image";
import { ReactTyped } from "react-typed";

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

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" id="about">
        <h2 className="text-3xl font-bold">{t("home.about.title")}</h2>
        <p className="text-lg">{t("home.about.description")}</p>
      </section>

    </DefaultLayout>
  );
}
