"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();

  const handleSearchClick = () => {
    console.log(
      "Search clicked! Current search params:",
      searchParams?.get("q")
    );
  };

  const handleFormSubmit = (formData: FormData) => {
    const searchQuery = formData.get("q") as string;
    console.log("Search submitted with query:", searchQuery);
  };

  return (
    <Form className="relative w-full" action={handleFormSubmit}>
      <input
        key={searchParams?.get("q")}
        type="text"
        name="q"
        placeholder="Nach Produkten suchen..."
        autoComplete="off"
        defaultValue={searchParams?.get("q") || ""}
        className="text-md w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-1 text-black "
        onClick={handleSearchClick}
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-neutral-500" />
      </div>
    </Form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="relative w-full">
      <input
        placeholder="Nach Produkten suchen..."
        className="w-full rounded-lg border bg-white px-4 py-1 text-sm text-black "
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4 text-neutral-500" />
      </div>
    </form>
  );
}
