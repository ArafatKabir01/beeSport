import UpcomingTeamMatch from "../../component/UpcomingTeamMatch";

const page = ({ params }: { params: any }) => {
  return <UpcomingTeamMatch teamId={params.id} />;
};

export default page;
