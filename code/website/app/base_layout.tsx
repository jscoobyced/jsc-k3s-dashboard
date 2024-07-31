import Footer from './components/Footer';
import Menu from './components/Menu';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen h-auto bg-primary-bg text-primary-color">
        <Menu />
        <main className="mb-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
