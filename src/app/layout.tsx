import type { Metadata, Viewport } from "next";
import { Inter, Epilogue } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from "antd";
import { ClerkProvider } from "@clerk/nextjs";
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'

const font = Epilogue({ subsets: ["latin"] });

const APP_NAME = "Sapling";
const APP_DEFAULT_TITLE = "Sapling";
const APP_TITLE_TEMPLATE = "%s | Sapling";
const APP_DESCRIPTION = "Elevate the Dining Experience";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#12411B",
};

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <PHProvider>
          <body className={font.className}>
            <AntdRegistry>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: '#12411B',
                    borderRadius: 10,
                  },
                }}
              >
                <PostHogPageView />
                {children}
              </ConfigProvider>
            </AntdRegistry>
          </body>
        </PHProvider>
      </html>
    </ClerkProvider>
  );
}
