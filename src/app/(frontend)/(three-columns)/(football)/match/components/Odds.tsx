import { useGetOddsFixtureQuery } from "@/features/front-end/fixture/oddsFixtureApi";
import StandingsShimmer from "./standings/StandingShimmer";

function useOddsData(fixtureId: any, bookmakersId: number, marketsID: number) {
  return useGetOddsFixtureQuery({ fixtureId, bookmakersId, marketsID }, { skip: !fixtureId });
}

function transformLabel(originalLabel: string): string {
  const parts = originalLabel?.split(", ");

  const transformedParts = parts?.map((part) => {
    const value = parseFloat(part);
    if (value < 0) {
      return `-${Math.abs(value)}`;
    } else {
      return `${value}`;
    }
  });

  const transformedLabel = transformedParts?.join("/");

  return transformedLabel;
}

export default function Odds({ fixtureId }: any) {
  const { data: tenBetDataFULLTIME_RESULT } = useOddsData(fixtureId, 1, 1);
  const { data: bet365DataFULLTIME_RESULT } = useOddsData(fixtureId, 2, 1);
  const { data: twentyTwoBetDataFULLTIME_RESULT } = useOddsData(fixtureId, 62, 1);
  const { data: melBetDataFULLTIME_RESULT } = useOddsData(fixtureId, 64, 1);
  const { data: onexBetDataFULLTIME_RESULT } = useOddsData(fixtureId, 35, 1);

  // Handicap
  const { data: tenBetDataAsianHandicap, isLoading: tenBetDataAsianHandicapL } = useOddsData(fixtureId, 1, 6);
  const { data: bet365DataAsianHandicap, isLoading: bet365DataAsianHandicapL } = useOddsData(fixtureId, 2, 6);
  const { data: twentyTwoBetDataAsianHandicap, isLoading: twentyTwoBetDataAsianHandicapL } = useOddsData(
    fixtureId,
    62,
    6
  );
  const { data: melBetDataAsianHandicap, isLoading: melBetDataAsianHandicapL } = useOddsData(fixtureId, 64, 6);
  const { data: onexBetDataAsianHandicap, isLoading: onexBetDataAsianHandicapL } = useOddsData(fixtureId, 35, 6);

  if (
    bet365DataAsianHandicapL ||
    tenBetDataAsianHandicapL ||
    twentyTwoBetDataAsianHandicapL ||
    melBetDataAsianHandicapL ||
    onexBetDataAsianHandicapL
  ) {
    return <StandingsShimmer size={10} />;
  }

  const bet365OriginalLevel2 = transformLabel(bet365DataAsianHandicap?.data?.odds.slice(-2)[0]?.original_label);
  const bet365OriginalLevel1 = transformLabel(bet365DataAsianHandicap?.data?.odds.slice(-2)[1]?.original_label);
  const tenBetDataOriginalLevel2 = transformLabel(tenBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.original_label);
  const tenBetDataOriginalLevel1 = transformLabel(tenBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.original_label);
  const twentyTwoBetOriginalLevel2 = transformLabel(
    twentyTwoBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.original_label
  );
  const twentyTwoBetOriginalLevel1 = transformLabel(
    twentyTwoBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.original_label
  );
  const melBetOriginalLevel2 = transformLabel(melBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.original_label);
  const melBetOriginalLevel1 = transformLabel(melBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.original_label);
  const onexBetOriginalLevel2 = transformLabel(onexBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.original_label);
  const onexBetOriginalLevel1 = transformLabel(onexBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.original_label);

  return (
    <div className='container mx-auto'>
      <table className='min-w-full bg-[#1B2435]  '>
        <thead>
          <tr className=''>
            {["", "1", "X", "2", "Handicap"].map((header, index) => (
              <th
                key={header}
                className='py-2 px-4 text-center border-l-4 border-gray-300  bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider'
              >
                <div>{header}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className='text-center '>
            <td className='py-2 px-4 border-b border-gray-600 text-sm w-44'>
              <img alt='10bet' src='/images/10bet.webp' className='w-28 h-10 py-2 aspect-video' />
            </td>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              {!tenBetDataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {tenBetDataFULLTIME_RESULT?.data?.odds[2]?.dp3 ? (
                    Number(tenBetDataFULLTIME_RESULT?.data?.odds[2]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            <td className='py-2 px-4 border-b  border-gray-600 text-sm'>
              {!tenBetDataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {tenBetDataFULLTIME_RESULT?.data?.odds[1]?.dp3 ? (
                    Number(tenBetDataFULLTIME_RESULT?.data?.odds[1]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              {!tenBetDataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {tenBetDataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(tenBetDataFULLTIME_RESULT?.data?.odds[0]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            {/* handicap */}
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              <div className='flex gap-2 justify-evenly'>
                <div>
                  {!tenBetDataAsianHandicap?.data?.odds.length ? (
                    <h2>-</h2>
                  ) : (
                    <h2 className='text-red-600'>
                      {tenBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.handicap ? (
                        tenBetDataOriginalLevel2
                      ) : (
                        <h2>-</h2>
                      )}{" "}
                      <span className=' '>{tenBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.value}</span>
                    </h2>
                  )}
                </div>
                <div>
                  {!tenBetDataAsianHandicap?.data?.odds.length ? (
                    <h2>-</h2>
                  ) : (
                    <h2 className='text-red-600'>
                      {tenBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.handicap ? (
                        tenBetDataOriginalLevel1
                      ) : (
                        <h2>-</h2>
                      )}{" "}
                      <span className=' '>{tenBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.value}</span>
                    </h2>
                  )}
                </div>
              </div>
            </td>
          </tr>
          <tr className='text-center'>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              <img alt='bet365' src='/images/bet365.png' className='w-28 h-10 aspect-video' />
            </td>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              {!bet365DataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {bet365DataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(bet365DataFULLTIME_RESULT?.data?.odds[2]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              {!bet365DataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {bet365DataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(bet365DataFULLTIME_RESULT?.data?.odds[1]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              {!bet365DataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {bet365DataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(bet365DataFULLTIME_RESULT?.data?.odds[0]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            {/* handicap */}
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              <div className='flex gap-2 justify-evenly'>
                <div>
                  {!bet365DataAsianHandicap?.data?.odds.length ? (
                    <h2>-</h2>
                  ) : (
                    <h2 className='text-red-600'>
                      {bet365DataAsianHandicap?.data?.odds.slice(-2)[1]?.handicap ? bet365OriginalLevel1 : <h2>-</h2>}{" "}
                      <span className=' '>{bet365DataAsianHandicap?.data?.odds.slice(-2)[1]?.value}</span>
                    </h2>
                  )}
                </div>
                <div>
                  {!bet365DataAsianHandicap?.data?.odds.length ? (
                    <h2>-</h2>
                  ) : (
                    <h2 className='text-red-600'>
                      {bet365DataAsianHandicap?.data?.odds.slice(-2)[0]?.handicap ? bet365OriginalLevel2 : <h2>-</h2>}{" "}
                      <span className=' '>{bet365DataAsianHandicap?.data?.odds.slice(-2)[0]?.value}</span>
                    </h2>
                  )}
                </div>
              </div>
            </td>
          </tr>
          <tr className='text-center'>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              <img alt='twentyTwoBet' src='/images/22bet.webp' className='w-28 h-10 aspect-video' />
            </td>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              {!twentyTwoBetDataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {twentyTwoBetDataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(twentyTwoBetDataFULLTIME_RESULT?.data?.odds[2]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              {!twentyTwoBetDataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {twentyTwoBetDataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(twentyTwoBetDataFULLTIME_RESULT?.data?.odds[1]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              <div className='flex gap-2 justify-evenly'>
                <div>
                  {!twentyTwoBetDataAsianHandicap?.data?.odds.length ? (
                    <h2>-</h2>
                  ) : (
                    <h2 className='text-red-600'>
                      {twentyTwoBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.handicap ? (
                        twentyTwoBetOriginalLevel2
                      ) : (
                        <h2>-</h2>
                      )}{" "}
                      <span className=' '>{twentyTwoBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.value}</span>
                    </h2>
                  )}
                </div>
                <div>
                  {!twentyTwoBetDataAsianHandicap?.data?.odds.length ? (
                    <h2>-</h2>
                  ) : (
                    <h2 className='text-red-600'>
                      {twentyTwoBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.handicap ? (
                        twentyTwoBetOriginalLevel1
                      ) : (
                        <h2>-</h2>
                      )}{" "}
                      <span className=' '>{twentyTwoBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.value}</span>
                    </h2>
                  )}
                </div>
              </div>
            </td>
          </tr>
          <tr className='text-center'>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              <img alt='melbet' src='/images/melbet.webp' className='w-28 h-10 aspect-video' />
            </td>
            <td className='py-2 px-4 border-b border-gray-600  text-sm'>
              {!melBetDataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {melBetDataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(melBetDataFULLTIME_RESULT?.data?.odds[2]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              {!melBetDataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {melBetDataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(melBetDataFULLTIME_RESULT?.data?.odds[1]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            <td className='py-2 px-4 border-b border-gray-600 text-sm'>
              <div className='flex gap-2 justify-evenly'>
                <div>
                  {!twentyTwoBetDataAsianHandicap?.data?.odds.length ? (
                    <h2>-</h2>
                  ) : (
                    <h2 className='text-red-600'>
                      {twentyTwoBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.handicap ? (
                        twentyTwoBetDataAsianHandicap
                      ) : (
                        <h2>-</h2>
                      )}{" "}
                      <span className=' '>{twentyTwoBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.value}</span>
                    </h2>
                  )}
                </div>
                <div>
                  {!twentyTwoBetDataAsianHandicap?.data?.odds.length ? (
                    <h2>-</h2>
                  ) : (
                    <h2 className='text-red-600'>
                      {twentyTwoBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.handicap ? (
                        twentyTwoBetOriginalLevel1
                      ) : (
                        <h2>-</h2>
                      )}{" "}
                      <span className=' '>{twentyTwoBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.value}</span>
                    </h2>
                  )}
                </div>
              </div>
            </td>
          </tr>
          <tr className='text-center'>
            <td className='py-2 px-4  text-sm'>
              <img alt='1xbet' src='/images/1xbet.png' className='w-28 h-10 aspect-video' />
            </td>
            <td className='py-2 px-4  text-sm'>
              {!onexBetDataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {onexBetDataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(onexBetDataFULLTIME_RESULT?.data?.odds[2]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            <td className='py-2 px-4  text-sm'>
              {!onexBetDataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {onexBetDataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(onexBetDataFULLTIME_RESULT?.data?.odds[1]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            <td className='py-2 px-4  text-sm'>
              {!onexBetDataFULLTIME_RESULT?.data?.odds.length ? (
                <h2>-</h2>
              ) : (
                <h2>
                  {onexBetDataFULLTIME_RESULT?.data?.odds[0]?.dp3 ? (
                    Number(onexBetDataFULLTIME_RESULT?.data?.odds[0]?.dp3).toFixed(2)
                  ) : (
                    <h2>-</h2>
                  )}
                </h2>
              )}
            </td>
            {/* handicap */}
            <td className='py-2 px-4  text-sm'>
              <div className='flex gap-2 justify-evenly'>
                <div>
                  {!onexBetDataAsianHandicap?.data?.odds.length ? (
                    <h2>-</h2>
                  ) : (
                    <h2 className='text-red-600'>
                      {onexBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.handicap ? onexBetOriginalLevel2 : <h2>-</h2>}{" "}
                      <span className=' '>{onexBetDataAsianHandicap?.data?.odds.slice(-2)[1]?.value}</span>
                    </h2>
                  )}
                </div>
                <div>
                  {!onexBetDataAsianHandicap?.data?.odds.length ? (
                    <h2>-</h2>
                  ) : (
                    <h2 className='text-red-600'>
                      {onexBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.handicap ? onexBetOriginalLevel1 : <h2>-</h2>}{" "}
                      <span className=' '>{onexBetDataAsianHandicap?.data?.odds.slice(-2)[0]?.value}</span>
                    </h2>
                  )}
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
