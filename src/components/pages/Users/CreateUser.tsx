import React from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';

import CONSTS from 'consts';

import { createUser } from 'modules/users/asyncActions';
import { CreateUserFormData } from 'modules/users/types';

export default function CreateUser() {
  const dispatch = useDispatch();
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
