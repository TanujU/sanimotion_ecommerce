import { getFooterMenu } from 'lib/shopify';
import FooterMenu from './footer-menu';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const footerMenu = await getFooterMenu();

  return (
    <footer className="text-sm text-gray-600 bg-white">
      <div className="border-t border-gray-200 py-8">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-4 min-[1320px]:px-0">
          {/* Footer Navigation */}
          <div className="mb-6">
            <FooterMenu menu={footerMenu} />
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-center text-gray-800">
              &copy; {copyrightDate} Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
