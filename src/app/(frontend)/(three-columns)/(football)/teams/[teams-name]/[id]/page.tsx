import UpcomingTeamMatch from "../../component/UpcomingTeamMatch";

const page = ({ params }: { params: any }) => {
  return <UpcomingTeamMatch teamId={params.teamId} />;
};

export default page;
