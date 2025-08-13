const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');

  return (
    <footer className="text-sm text-gray-600 bg-white">
      <div className="border-t border-gray-200 py-6 text-sm">
        <div className="mx-auto flex w-full max-w-7xl justify-center px-4 md:px-4 min-[1320px]:px-0">
          <p className="text-gray-800">
            &copy; {copyrightDate} Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
