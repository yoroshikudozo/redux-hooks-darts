import React from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import CONSTS from 'consts';

import { AppState } from 'modules/reducers';

import { useFetchUser } from 'components/hooks/useFetchUser';
import { getUserById } from 'modules/users/selectors';

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: AppState) => getUserById(state, id));
  const { loading } = useFetchUser({ id });

  if (loading) return <div>Loading...</div>;

  if (user)
    return (
      <div>
        <Link to={CONSTS.ROUTES.USERS.ROOT}>Back</Link>

        <h1>{user.name}</h1>
        <h2>{user.nickname}</h2>
      </div>
    );

  return <div />;
}
