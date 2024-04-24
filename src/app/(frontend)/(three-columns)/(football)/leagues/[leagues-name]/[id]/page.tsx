import UpcommingLeagueMatch from "../../component/UpcommingLeagueMatch";

const page = ({ params }: { params: any }) => {
  return <UpcommingLeagueMatch leagueId={params.id} />;
};

export default page;
