import type { Metadata } from "next";
import "@/_styles/App.scss";
import Header from "@/_components/_Header/Header";
import Footer from "@/_components/_Footer/Footer";
import { ThemeContextProvider } from "@/_contexts/ThemeContext";

export const metadata: Metadata = {

  title: "Charles ABJ • Front-End Dev",
  description: "Charles ABJ • Développeur Front-End - Venez jetez un œil à mon Portfolio !",
  keywords: "portfolio, développeur web, projets, react, web, front-end, wordpress, freelance, nextjs, Pontarlier, Lyon, Suisse, Remote, Charles ABJ",
  icons: {
    icon: "/images/favicon.png",
  }

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="fr">
      <body>
        <ThemeContextProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </ThemeContextProvider>
      </body>
    </html>
  );
}