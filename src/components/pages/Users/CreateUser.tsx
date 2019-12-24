import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CONSTS from 'consts';

import { AppState } from 'modules/reducers';
import { useFetchDart } from 'components/hooks/useFetchDart';

interface Props {
  id: string;
}

export default function CreateUser({ id }: Props) {
  const dart = useSelector((state: AppState) => state.entities.darts.byId[id]);
  const { loading } = useFetchDart({ id });

  return (
    <div>
      <h1>Create User</h1>
      {loading && <p>Loading...</p>}
      {dart && <p>{dart.point}</p>}
      <Link to={CONSTS.ROUTES.USERS.ROOT}>Back</Link>
    </div>
  );
}
