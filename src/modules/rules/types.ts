import { Entity } from 'modules/common/types';

export interface Rule extends Entity {
  id: string;
  countUp: CountUpRule;
  // zeroOne: ZeroOneRule;
  // cricket: CricketRule;
}

export interface CountUpRule {
  bullSeparate: boolean;
  calcuration: string;
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
