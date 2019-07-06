import request from 'modules/common/utils/request';

interface FetchDartsParams {
  gameId: string;
}

interface CreateDartParams {
  gameId: string;
}

export const fetchDarts = request().get<FetchDartsParams>('DARTS');
export const createDart = request().post<CreateDartParams>('DARTS');
