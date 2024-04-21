export const cricketLiveStatus = [
  '1st Innings',
  '2nd Innings',
  '3rd Innings',
  '4th Innings',
  'Stump Day 1',
  'Stump Day 2',
  'Stump Day 3',
  'Stump Day 4',
  'Innings Break',
  'Tea Break',
  'Lunch',
  'Dinner',
];

export const cricketFinishedStatus = ['Finished'];
export const cricketUpcomingStatus = ['NS'];
export const cricketPostponedStatus = ['Postp.', 'Int.', 'Aban.'];
export const cricketCancelStatus = ['Delayed', 'Cancl.'];

export const upcomingStatus: string[] = [
  'TBA',
  'NS',
  'WO',
  'ABANDONED',
  'CANCELLED',
  'AWARDED',
  'INTERRUPTED',
  'POSTPONED',
];
export const finishedStatus = ['FT', 'AET', 'FT_PEN'];
export const liveStatus: string[] = [
  'INPLAY_1ST_HALF',
  'INPLAY_2ND_HALF',
  'HT',
  'INPLAY_ET',
  'INPLAY_ET_2ND_HALF',
  'BREAK',
  'PEN_BREAK',
  'EXTRA_TIME_BREAK',
  'INPLAY_PENALTIES',
];

export const CART_KEY = 'isomorphic-cart';
export const POS_CART_KEY = 'isomorphic-pos-cart';
export const DUMMY_ID = 'FC6723757651DB74';
export const CHECKOUT = 'isomorphic-checkout';
export const CURRENCY_CODE = 'USD';
export const LOCALE = 'en';
export const CURRENCY_OPTIONS = {
  formation: 'en-US',
  fractions: 2,
};

export const ROW_PER_PAGE_OPTIONS = [
  {
    value: 5,
    name: '5',
  },
  {
    value: 10,
    name: '10',
  },
  {
    value: 15,
    name: '15',
  },
  {
    value: 20,
    name: '20',
  },
];

export const ROLES = {
  Administrator: 'Administrator',
  Manager: 'Manager',
  Sales: 'Sales',
  Support: 'Support',
  Developer: 'Developer',
  HRD: 'HR Department',
  RestrictedUser: 'Restricted User',
  Customer: 'Customer',
} as const;
