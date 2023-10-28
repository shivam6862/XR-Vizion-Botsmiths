import "../styles/globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NotificationContextProvider } from "@/store/notification/Notification-context";
import Notifications from "@/components/notification/Notifications";

export const metadata = {
  title: "XR Vizion Botsmiths",
  description: "XR Vizion Botsmiths",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationContextProvider>
          {children}
          <Notifications />
        </NotificationContextProvider>
      </body>
    </html>
  );
}
