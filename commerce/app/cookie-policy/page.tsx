"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Type-safe Link component for React 19 compatibility
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

export default function CookiePolicyPage() {
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    // Set date on client side only to avoid hydration mismatch
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 lg:pl-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Cookie-Richtlinie
              </h1>
              <p className="text-gray-600">
                Zuletzt aktualisiert: {lastUpdated || "Lädt..."}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Was sind Cookies?
            </h2>
            <p className="text-gray-700 mb-6">
              Cookies sind kleine Textdateien, die auf Ihrem Computer oder
              Mobilgerät gespeichert werden, wenn Sie unsere Website besuchen.
              Sie werden weit verbreitet verwendet, um Websites effizienter zu
              machen und Informationen an Website-Betreiber zu liefern.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Wie wir Cookies verwenden
            </h2>
            <p className="text-gray-700 mb-4">
              Sanimotion verwendet Cookies für verschiedene Zwecke, um Ihre
              Erfahrung auf unserer Medizintechnik-E-Commerce-Plattform zu
              verbessern:
            </p>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Notwendige Cookies
                </h3>
                <p className="text-gray-700 mb-3">
                  Diese Cookies sind für das ordnungsgemäße Funktionieren der
                  Website erforderlich und können nicht deaktiviert werden.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Authentifizierung:</strong> Merken sich Ihren
                    Anmeldestatus und Sitzungsinformationen
                  </li>
                  <li>
                    <strong>Sicherheit:</strong> Schutz vor
                    Cross-Site-Request-Forgery (CSRF) Angriffen
                  </li>
                  <li>
                    <strong>Warenkorb-Verwaltung:</strong> Merken sich Artikel
                    in Ihrem Einkaufswagen
                  </li>
                  <li>
                    <strong>Formulardaten:</strong> Bewahren Formulardaten
                    während des Checkout-Prozesses auf
                  </li>
                </ul>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Funktionale Cookies
                </h3>
                <p className="text-gray-700 mb-3">
                  Diese Cookies verbessern Ihre Erfahrung, indem sie Ihre
                  Präferenzen und Einstellungen speichern.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Spracheinstellungen:</strong> Merken sich Ihre
                    bevorzugte Sprache
                  </li>
                  <li>
                    <strong>Währungseinstellungen:</strong> Zeigen Preise in
                    Ihrer bevorzugten Währung an
                  </li>
                  <li>
                    <strong>Benutzerpräferenzen:</strong> Merken sich Ihre
                    Anzeige- Präferenzen und Einstellungen
                  </li>
                  <li>
                    <strong>Willkommensnachrichten:</strong> Steuern die Anzeige
                    von Willkommens-Popups und Benachrichtigungen
                  </li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Analyse-Cookies
                </h3>
                <p className="text-gray-700 mb-3">
                  Diese Cookies helfen uns zu verstehen, wie Besucher mit
                  unserer Website interagieren.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Seitenaufrufe:</strong> Verfolgen, welche Seiten am
                    beliebtesten sind
                  </li>
                  <li>
                    <strong>Benutzerverhalten:</strong> Verstehen, wie Benutzer
                    unsere Website navigieren
                  </li>
                  <li>
                    <strong>Leistung:</strong> Überwachen der Website-Leistung
                    und Ladezeiten
                  </li>
                  <li>
                    <strong>Fehlerverfolgung:</strong> Technische Probleme
                    identifizieren und beheben
                  </li>
                </ul>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Marketing-Cookies
                </h3>
                <p className="text-gray-700 mb-3">
                  Diese Cookies werden verwendet, um relevante Werbung zu
                  liefern und Marketingkampagnen zu verfolgen.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Werbungszielung:</strong> Zeigen relevante
                    Medizintechnik-Werbung an
                  </li>
                  <li>
                    <strong>Kampagnenverfolgung:</strong> Messen der Wirksamkeit
                    von Marketingkampagnen
                  </li>
                  <li>
                    <strong>Retargeting:</strong> Zeigen Werbung für Benutzer
                    an, die unsere Website besucht haben
                  </li>
                  <li>
                    <strong>Soziale Medien:</strong> Ermöglichen das Teilen in
                    sozialen Medien-Plattformen
                  </li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              Cookie-Dauer
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Sitzungs-Cookies:</strong> Werden gelöscht, wenn Sie
                  Ihren Browser schließen
                </li>
                <li>
                  <strong>Persistente Cookies:</strong> Bleiben für einen
                  festgelegten Zeitraum auf Ihrem Gerät (typischerweise 30 Tage
                  bis 2 Jahre)
                </li>
                <li>
                  <strong>Authentifizierungs-Cookies:</strong> Laufen nach 7
                  Tagen Inaktivität ab
                </li>
                <li>
                  <strong>Präferenz-Cookies:</strong> Halten 1 Jahr
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Ihre Cookie-Einstellungen verwalten
            </h2>
            <p className="text-gray-700 mb-4">
              Sie haben mehrere Möglichkeiten, Cookies zu verwalten:
            </p>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Browser-Einstellungen
                </h4>
                <p className="text-blue-800 text-sm">
                  Die meisten Browser ermöglichen es Ihnen, Cookies über ihre
                  Einstellungen zu kontrollieren. Sie können alle Cookies
                  blockieren, nur First-Party-Cookies akzeptieren oder
                  bestehende Cookies löschen.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">
                  Cookie-Zustimmungs-Banner
                </h4>
                <p className="text-green-800 text-sm">
                  Wenn Sie unsere Website zum ersten Mal besuchen, sehen Sie ein
                  Cookie-Zustimmungs-Banner, in dem Sie wählen können, welche
                  Arten von Cookies Sie akzeptieren möchten.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">
                  Opt-Out-Links
                </h4>
                <p className="text-yellow-800 text-sm">
                  Für Third-Party-Cookies können Sie sich oft direkt über die
                  Website des Dienstanbieters abmelden.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              Third-Party-Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              Wir können Third-Party-Dienste verwenden, die ihre eigenen Cookies
              setzen:
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dienst
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Zweck
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Datenschutzrichtlinie
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Google Analytics
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Website-Analyse und Leistungsüberwachung
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <a
                        href="https://policies.google.com/privacy"
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google Datenschutzrichtlinie
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Supabase
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Authentifizierung und Datenbankdienste
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <a
                        href="https://supabase.com/privacy"
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Supabase Datenschutzrichtlinie
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Zahlungsabwickler
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      Sichere Zahlungsabwicklung
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-gray-500">
                        Variiert je nach Anbieter
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              Medizinische Datenschutz
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-red-900 mb-2">
                Wichtiger Hinweis
              </h4>
              <p className="text-red-800 text-sm">
                Als Medizintechnik-Lieferant verstehen wir die Bedeutung des
                Datenschutzes im Gesundheitswesen. Wir sammeln oder speichern
                keine Patientendaten über Cookies. Alle Cookie-Daten werden
                ausschließlich für Website-Funktionalität und Benutzererfahrung
                verwendet.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Aktualisierungen dieser Richtlinie
            </h2>
            <p className="text-gray-700 mb-6">
              Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren,
              um Änderungen in unseren Praktiken oder aus anderen operativen,
              rechtlichen oder regulatorischen Gründen widerzuspiegeln. Wir
              werden Sie über wesentliche Änderungen informieren, indem wir die
              aktualisierte Richtlinie auf unserer Website veröffentlichen.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Kontaktieren Sie uns
            </h2>
            <p className="text-gray-700 mb-4">
              Wenn Sie Fragen zu unserer Verwendung von Cookies oder dieser
              Cookie- Richtlinie haben, kontaktieren Sie uns bitte:
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>E-Mail:</strong> privacy@sanimotion.com
                </p>
                <p>
                  <strong>Telefon:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Adresse:</strong> 123 Medizintechnik-Straße,
                  Gesundheitsstadt, HC 12345
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <p className="text-sm text-gray-600">
                    Diese Cookie-Richtlinie ist Teil unserer umfassenderen
                    Datenschutzrichtlinie und Nutzungsbedingungen.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <SafeLink
                    href="/privacy-policy"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Datenschutzrichtlinie
                  </SafeLink>
                  <SafeLink
                    href="/terms-of-service"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Nutzungsbedingungen
                  </SafeLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
