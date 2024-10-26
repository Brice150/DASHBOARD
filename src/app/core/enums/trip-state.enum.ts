export enum TripState {
  VISITED = 'Visited',
  TO_VISIT = 'To visit',
}

export const StateColor = new Map<TripState, string>([
  [TripState.VISITED, '#006aff'],
  [TripState.TO_VISIT, '#45d606'],
]);
