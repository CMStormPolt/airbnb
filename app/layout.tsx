import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar/Navbar";
import { ToasterProvider } from "./providers/ToasterProvider";
import { RegistarModal } from "./components/modals/RegistarModal";
import { LoginModal } from "./components/modals/LoginModal";
import { RentModal } from "./components/modals/RentModal";
import { getCurrentUser } from "./actions/getCurrentUser";
import { SearchModal } from "./components/modals/SearchModal";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirBnB",
  description: "Home page of AirBnB",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <RegistarModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
