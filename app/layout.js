
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Recetas Tlaxcaltecas',
  description: 'Plataforma de recetas regionales'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

