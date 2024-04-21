"use client";

import { RootState } from "@/features/store";
import MultiProgress from "react-multi-progress";
import { useSelector } from "react-redux";

interface VoteData {
  _id: string;
  home: number;
  away: number;
  draw: number;
  users: string[];
  user?: boolean;
}

export default function Voting({ prediction }: any) {
  const { accessToken } = useSelector((state: RootState) => state.authSlice);
  // const [data, setData] = useState<VoteData | null>(null);
  // const [modalState, setModalState] = useState(false);
  // const params = useParams();
  // const { data: voteData } = useGetVotesQuery(params?.fixture_id);
  // const [giveVote] = useGiveVoteMutation();

  // const handleVote = (vote: string) => {
  //   if (accessToken) {
  //     giveVote({ id: params.fixture_id, vote })
  //       .then((res: any) => {
  //         setData(res.data.votes);
  //       })

  //       .catch((err: any) => console.log(err));
  //   } else {
  //     setModalState(true);
  //   }
  // };

  // useEffect(() => {
  //   if (voteData?.votes) setData(voteData.votes);
  // }, [voteData]);
  return (
    <div className='mx-auto my-8 w-full px-2 lg:w-[600px] lg:p-0'>
      <MultiProgress
        transitionTime={1.2}
        elements={[
          {
            value: prediction?.homeWinsProbability || 0,
            color: "#2E8FEF",
            showPercentage: false,
            fontSize: 12,
            textColor: "white",
            isBold: true,
            className: "rounded-md"
          },
          {
            value: prediction?.drawsProbability || 0,
            color: "#CFD9DE",
            showPercentage: false,
            textColor: "white",
            fontSize: 12,
            isBold: false,
            className: "my-custom-css-class"
          }
        ]}
        height={15}
        backgroundColor='gray'
        className='my-custom-css-class'
      />
      <div className='my-5 flex justify-between font-bold'>
        <div className='flex items-center gap-2  '>
          <button
            // onClick={() => handleVote("home")}
            // disabled={data?.user}
            className='btn btn-neutral btn-active border-none bg-primary'
          >
            H
          </button>
          <div>
            <h2>Wins</h2>
            <p>{!prediction?.homeWinsProbability ? "--.-" : `${(prediction?.homeWinsProbability).toFixed(2)}%`}</p>
          </div>
        </div>
        <div className='flex items-center gap-2  '>
          <button
            // onClick={() => handleVote("draw")}
            // disabled={data?.user}
            className='btn btn-neutral btn-active border-none'
          >
            D
          </button>
          <div>
            <h2>Draws</h2>
            <p>{!prediction?.drawsProbability ? "--.-" : `${(prediction?.drawsProbability).toFixed(2)}%`}</p>
          </div>
        </div>
        <div className='flex items-center gap-2  '>
          <button
            // onClick={() => handleVote("away")}
            // disabled={data?.user}
            className='btn btn-neutral btn-active border-none bg-[#808080]'
          >
            A
          </button>
          <div>
            <h2>Wins</h2>
            <p>{!prediction?.awayWinsProbability ? "--.-" : `${(prediction?.awayWinsProbability).toFixed(2)}%`}</p>
          </div>
        </div>
      </div>
      {/* Modal */}
      {/* <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className='p-4 flex items-center gap-2 justify-center'>
          <IoIosWarning className='text-yellow-400 text-6xl' />
          <div>
            <h2 className='text-2xl font-bold'>Login Required</h2>
            <p className=' text-xs'>
              You Cannot vote on this match. Please{" "}
              <Link href='/user/signin' className='text-primary cursor-pointer'>
                Login
              </Link>{" "}
              first
            </p>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
