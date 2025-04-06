import { useTranslation } from "react-i18next";

export type SiteConfig = typeof siteConfig;

export const siteConfig = () => {
  const { t } = useTranslation();
  const name = t("site.name");
  const description = t("site.description");
  const navItems = [
    { label: t("site.nav.home"), href: "#header" },
    { label: t("site.nav.experience"), href: "#experience" },
    { label: t("site.nav.projects"), href: "#projects" },
    { label: t("site.nav.contact"), href: "#contact" },
    
  ];
  const links = {
    github: "https://github.com/alexandre-tvrs",
    discord: "https://discord.gg/fR8NjnGy3v",
  };

  return {
    name,
    description,
    navItems,
    links,
  };
};
