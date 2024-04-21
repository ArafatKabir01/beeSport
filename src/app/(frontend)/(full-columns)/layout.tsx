import Footer from "../components/Footer";
import Header from "../components/Header";

export default async function FullColumnsLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <div className='flex min-h-screen flex-col bg-[#F3F4F6]'>
      <Header />
      <main className='flex-1'>
        <div className='mx-auto max-w-[1400px] '>{children}</div>
      </main>
      <Footer />
    </div>
  );
}
