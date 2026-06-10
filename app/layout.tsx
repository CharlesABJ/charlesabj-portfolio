import type { Metadata } from "next";
import "@/_styles/App.scss";
import { ThemeContextProvider } from "@/_contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Charles ABJ • Front-End Dev",
  description:
    "Charles ABJ • Développeur Front-End expérimenté en React et WordPress - Venez jetez un œil à mon Portfolio !",
  keywords:
    "portfolio, développeur web, projets, react, web, front-end, wordpress, freelance, nextjs, Pontarlier, Lausanne, Lyon, Suisse, Remote, Charles ABJ",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}