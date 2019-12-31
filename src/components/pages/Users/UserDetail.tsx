import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CONSTS from 'consts';

import { AppState } from 'modules/reducers';

import { getUserById } from 'modules/users/selectors';
import { useParams } from 'react-router';
import { useFetchUser } from 'components/hooks/useFetchUser';

export default function UserDetail() {
  const { id }: any = useParams();
  const user = useSelector((state: AppState) => getUserById(state, id));
  const dispatch = useDispatch();
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
