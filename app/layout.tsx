import { DataProvider } from "../context/PostContext";

interface LayoutProps {
  children: any;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <head></head>
      <DataProvider>
        <body>{children}</body>
      </DataProvider>
    </html>
  );
};

export default RootLayout;
