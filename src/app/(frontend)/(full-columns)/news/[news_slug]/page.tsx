import SingleNewsDetails from "../components/SingleNewsDetails";

export const metadata = {
  title: "MahaScore | News",
  description: "MahaScore"
};

export default async function page({ params }: { params: { news_slug: string } }) {
  const { news_slug } = params;

  return <SingleNewsDetails newsSlug={news_slug} />;
}
