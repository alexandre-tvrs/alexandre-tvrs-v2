import { useTranslation } from "react-i18next";

export type SiteConfig = typeof siteConfig;

export const siteConfig = () => {
  const { t } = useTranslation();
  const name = t("site.name");
  const description = t("site.description");
  const navItems = [
    { label: t("site.nav.home"), href: "/" },
    { label: t("site.nav.about"), href: "/#about" },
  ];
  const links = {
    github: "https://github.com/alexandre-tvrs",
    twitter: "https://twitter.com/4iexand",
    discord: "https://discord.gg/fR8NjnGy3v",
  };

  return {
    name,
    description,
    navItems,
    links,
  };
};
