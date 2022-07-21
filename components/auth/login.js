import { gql, useMutation } from '@apollo/client';
import { TextField } from 'formik-mui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Stack } from '@mui/material';
import { onError } from '@apollo/client/link/error';
import { setUserData } from './localStorage';

const LOGIN_QUERY = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const AuthSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function Login() {
  const [login] = useMutation(LOGIN_QUERY);
  const initialValues = { email: '', password: '' };

  const loginUser = ({ email, password }) => {
    return login({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        loginUser(values)
          .then((data) => setUserData(data.data.login.token))
          .catch((e) => {
            onError(e);
          });
        actions.resetForm();
      }}
      validationSchema={AuthSchema}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <legend>Log In</legend>

            <Field type='email' id='email' name='email' label='Email' component={TextField} />

            <Field
              type='password'
              id='password'
              name='password'
              label='Password'
              component={TextField}
            />

            <button type='submit'>Submit</button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
