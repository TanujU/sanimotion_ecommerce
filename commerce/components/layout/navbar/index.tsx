import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import ThemeToggle from "components/theme/theme-toggle";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import { NavbarClient } from "./navbar-client";

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return <NavbarClient menu={menu} siteName={SITE_NAME} />;
}
