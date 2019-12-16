export interface Rule {
  id: string;
  userId: string;
  countUp: CountUpRule;
  // zeroOne: ZeroOneRule;
  // cricket: CricketRule;
}

export interface CountUpRule {
  bullSeparate: boolean;
  handicap: boolean;
}

export interface ZeroOneRule {
  bullSeparate: boolean;
  calcuration: string;
  start: number;
  rounds: number;
  inOption: string;
  outOption: string;
  handicap: boolean;
}

export interface CricketRule {
  bullSeparate: boolean;
  handicap: boolean;
  rounds: number;
}

export interface RulesResponse {
  rules: Rule;
}
