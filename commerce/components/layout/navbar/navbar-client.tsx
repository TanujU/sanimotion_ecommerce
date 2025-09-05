"use client";

import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";

// Type-safe components for React 19 compatibility
const SafeLink = ({
  href,
  className,
  children,
  ...props
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) => {
  const LinkComponent = Link as any;
  return (
    <LinkComponent href={href} className={className} {...props}>
      {children}
    </LinkComponent>
  );
};

const SafeSuspense = ({
  children,
  fallback,
  ...props
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  [key: string]: any;
}) => {
  const SuspenseComponent = Suspense as any;
  return (
    <SuspenseComponent fallback={fallback} {...props}>
      {children}
    </SuspenseComponent>
  );
};
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";
import { MarqueeAnnouncement } from "components/marquee-announcement";

interface NavbarClientProps {
  menu: Menu[];
  siteName?: string;
}

export function NavbarClient({ menu, siteName }: NavbarClientProps) {
  // Filter out "all" and "mediziner" menu items
  const filteredMenu = menu.filter(
    (item) =>
      !item.title.toLowerCase().includes("all") &&
      !item.title.toLowerCase().includes("mediziner")
  );

  return (
    <>
      <MarqueeAnnouncement text="PREMIUM MEDICAL EQUIPMENT & HEALTHCARE SUPPLIES - TRUSTED BY PROFESSIONALS WORLDWIDE" />
     
    </>
  );
}
