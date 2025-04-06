import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import { useState } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  DiscordIcon,
} from "@/components/icons";
import i18n from "@/i18n";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMenuOpen(false); // Fecha o menu após selecionar o idioma
  };

  return (
    <HeroUINavbar position="static">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <p className="font-bold text-inherit">Alexandre Tavares</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig().navItems.map((item) => (
            <NavbarItem key={item.href}>
              <a
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </a>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <button
            className="text-default-500"
            onClick={() => handleLanguageChange("en")}
          >
            EN
          </button>
          <button
            className="text-default-500"
            onClick={() => handleLanguageChange("pt")}
          >
            PT
          </button>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig().links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig().links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Menu para mobile */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig().navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <a
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
                onClick={() => setIsMenuOpen(false)} // Fecha o menu após clicar em um item
                title={item.label} // Adiciona o título ao link
              >
                {item.label}
              </a>
            </NavbarMenuItem>
          ))}

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4">
              <button
                className="text-default-500"
                onClick={() => handleLanguageChange("en")}
              >
                EN
              </button>
              <button
                className="text-default-500"
                onClick={() => handleLanguageChange("pt")}
              >
                PT
              </button>
            </div>

            <div className="flex gap-4 items-center">
              <Link isExternal href={siteConfig().links.discord} title="Discord">
                <DiscordIcon className="text-default-500 text-2xl" />
              </Link>
              <Link isExternal href={siteConfig().links.github} title="GitHub">
                <GithubIcon className="text-default-500 text-2xl" />
              </Link>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};