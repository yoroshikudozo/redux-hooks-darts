import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';

import CONSTS from 'consts';

import { AppState } from 'modules/reducers';

import { useFetchDart } from 'components/hooks/useFetchDart';
import { getDartById } from 'modules/darts/selectors';
import { createUser } from 'modules/users/asyncActions';
import { CreateUserFormData } from 'modules/users/types';

interface Props {
  id: string;
}

export default function CreateUser({ id }: Props) {
  const dart = useSelector((state: AppState) => getDartById(state, id));
  const dispatch = useDispatch();
  const { loading } = useFetchDart({ id });
  const formik = useFormik<CreateUserFormData>({
    initialValues: {
      name: '',
      nickname: '',
    },
    onSubmit: value => {
      dispatch(createUser(value));
    },
  });

  return (
    <div>
      <h1>Create User</h1>
      {loading && <p>Loading...</p>}
      {dart && <p>{dart.point}</p>}
      <Link to={CONSTS.ROUTES.USERS.ROOT}>Back</Link>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div>
          <label htmlFor="nickname">nickName</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nickname}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
