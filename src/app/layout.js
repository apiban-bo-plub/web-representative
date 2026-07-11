import "@/styles/style_0.css";
import "@/styles/style_1.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  title: "Apiban Bo Plup — The Portal",
  description: "Heritage Thai apothecary. Est. 1870s. 150 Years of Wisdom Reimagined for Your Modern Rituals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </div>
      </body>
    </html>
  );
}
