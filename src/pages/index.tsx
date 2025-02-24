import DefaultLayout from "@/layouts/default";
import { useTranslation } from "react-i18next";
import { Image } from "@heroui/image";
import { ReactTyped } from "react-typed";

export default function IndexPage() {
  const { t } = useTranslation();
  const strings: string[] = [t("home.typed.0"), t("home.typed.1"), t("home.typed.2"), t("home.typed.3")];
  return (
    <DefaultLayout>
      <section className="flex flex-col md:flex-row items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex justify-center">
          <Image
            alt="Alexandre Tavares"
            src="https://avatars.githubusercontent.com/u/71346377?v=4"
            width={300}
          />
        </div>

        <div className="text-center">
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
      </section>
    </DefaultLayout>
  );
}
