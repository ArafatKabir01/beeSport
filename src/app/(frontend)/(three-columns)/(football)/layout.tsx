import Wrapper from "@/components/Wrapper";
import BannerSlider from "../../components/BannerSlider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SkewCard from "../../components/SkewCard";
import TopLeaguesList from "../../components/TopLeaguesList";
export default async function ThreeColumnsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col bg-[#F3F4F6] '>
      <Header />
      <main className='mb-0 flex-1 md:mb-8 m-2'>
        <div className='mx-auto max-w-[1400px]'>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-3 hidden w-full lg:col-span-3 lg:block'>
              <SkewCard title='Leagues'>
                <TopLeaguesList data={"league"} />
              </SkewCard>
              <SkewCard title='Teams'>
                <TopLeaguesList data={"team"} />
              </SkewCard>
            </div>

            <div className='col-span-12 w-full lg:col-span-9 my-2'>
              <div className='mb-3 mt-3'>
                <BannerSlider />
              </div>
              <Wrapper>{children}</Wrapper>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
