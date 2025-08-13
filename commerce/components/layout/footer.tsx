import { getFooterMenu } from 'lib/shopify';
import FooterMenu from './footer-menu';
import LogoSquare from 'components/logo-square';
import Link from 'next/link';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const footerMenu = await getFooterMenu();

  return (
    <footer className="text-sm bg-white text-gray-600">
      <div className="py-8">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-4 min-[1320px]:px-0">
          {/* Logo, Store Name, and Navigation */}
          <div className="mb-8 flex flex-col md:flex-row md:items-start md:gap-8">
            {/* Footer Logo and Store Name */}
            <div className="mb-4 md:mb-0">
              <Link href="/" className="flex items-center">
                <LogoSquare size="sm" />
                <span className="ml-2 text-lg font-medium text-black">
                  {SITE_NAME}
                </span>
              </Link>
            </div>
            
            {/* Footer Navigation */}
            <div>
              <FooterMenu menu={footerMenu} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright at the very bottom */}
      <div className="border-t border-gray-200 py-4">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-4 min-[1320px]:px-0">
          <p className="text-center text-gray-800">
            &copy; {copyrightDate} Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
