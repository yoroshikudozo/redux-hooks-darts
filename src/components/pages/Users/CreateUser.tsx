import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import CONSTS from 'consts';

import { useFetchDart } from 'components/hooks/useFetchDart';
import { useSelector } from 'react-redux';
import { AppState } from 'modules/reducers';

export default function Users({ id }: { id: string }) {
  const dart = useSelector((state: AppState) => state.entities.darts.byId[id]);
  const { loading, getDart } = useFetchDart({ id });

  useEffect(() => {
    getDart();
  }, []);

  return (
    <div>
      <h1>Create User</h1>
      {loading && <p>Loading...</p>}
      {dart && <p>{dart.point}</p>}
      <Link to={CONSTS.ROUTES.USERS.ROOT}>Back</Link>
    </div>
  );
}
