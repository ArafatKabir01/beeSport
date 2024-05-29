import "./FixtureCardStyle.css";
export default function FixtureCardNew({ fixture }: any) {
  return (
    <div className='match-card'>
      <div className='overlay'>
        <div className='teams'>
          <div className='team'>
            <img src='/images/premier_logo.png' alt='Team A' className='team-logo' />
            <p className='team-name'>Team A</p>
          </div>
          <h2 className='vs-text'>VS</h2>
          <div className='team'>
            <img src='/images/premier_logo.png' alt='Team B' className='team-logo' />
            <p className='team-name'>Team B</p>
          </div>
        </div>
        <div className='match-details'>
          <h2 className='match-date'>SATURDAY, 23 SEPTEMBER</h2>
          <p className='match-time'>5.00 pm | THE PLACE CROWN</p>
        </div>
      </div>
    </div>
  );
}
