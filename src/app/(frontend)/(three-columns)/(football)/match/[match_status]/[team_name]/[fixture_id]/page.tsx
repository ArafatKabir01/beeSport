import { metaObject } from "@/config/site.config";
import MatchDetails from "../../../components/MatchDetails";

export const metadata = {
  ...metaObject("Match Details")
};

export default async function Page({ params }: { params: { match_status: string; fixture_id: string; lang: any } }) {
  const { match_status, fixture_id, lang } = params;

  return <MatchDetails status={match_status} fixtureId={fixture_id} />;
}
