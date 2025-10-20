import Footer from "components/layout/footer";
import FilterList from "components/layout/search/filter";
import Breadcrumbs from "components/breadcrumbs";
import { sorting } from "lib/constants";
import ChildrenWrapper from "./children-wrapper";
import { Suspense } from "react";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto max-w-(--breakpoint-2xl) px-4 pt-16 pb-4 text-black dark:text-white lg:pl-24">
        <Breadcrumbs items={[{ label: "Search", href: "/search" }]} />
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="order-last min-h-screen w-full md:order-none">
            <Suspense fallback={null}>
              <ChildrenWrapper>{children}</ChildrenWrapper>
            </Suspense>
          </div>
          <div className="order-none flex-none md:order-last md:w-[125px]">
            <FilterList list={sorting} title="Sort by" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
