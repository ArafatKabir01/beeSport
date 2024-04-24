import VideoPlayer from "@/app/(frontend)/components/VideoPlayer";

const LiveTvHome = () => {
  const arr = [1, 2, 4, 3, 2, 3, 4, 4, 5, 6, 6, 6, 6, 6, 6, 1, 2, 4, 3, 2, 3, 4, 4, 5, 6, 6, 6, 6, 6, 6];
  const streamSources = [
    {
      _id: {
        $oid: "6600738dcd350618e2b77673"
      },
      matchId: {
        $oid: "6600738dcd350618e2b77672"
      },
      id: 512683554479689,
      match_id: 447983615399785,
      stream_title: "Server SD",
      is_premium: 0,
      resolution: "480p",
      stream_status: "1",
      platform: "both",
      stream_type: "m3u8",
      portrait_watermark:
        '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.0,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
      landscape_watermark:
        '{"top": 1.1,  "bottom": null, "left": null, "right": 1.1,"height": 2.5,"width": 10.0, "image": "http://windfootball.com/logo/logo1.png"}',
      root_streams: [
        {
          root_stream_type: "flussonic",
          root_stream_status: "1",
          root_stream_stream_url: "dx",
          root_stream_stream_key: "dx"
        }
      ],
      stream_url: "https://d1gnaphp93fop2.cloudfront.net/videos/multiresolution/rendition_new10.m3u8",
      headers: '{"Origin":"","Referer":""}',
      position: 99999999,
      __v: 0
    }
  ];
  return (
    <div>
      <VideoPlayer streamSources={streamSources} fixtureId={"512683554479689"} />
      <div className='my-8 flex flex-wrap gap-4'>
        {arr.map((a) => (
          <div
            key={a}
            className='w-[100px] h-[100px] rounded-md bg-slate-300 flex justify-center items-center hover:shadow-md cursor-pointer'
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LiveTvHome;
