import { gql, useMutation } from '@apollo/client';
import { TextField } from 'formik-mui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Stack } from '@mui/material';
import { onError } from '@apollo/client/link/error';
import { setUserData } from './localStorage';

const SIGNUP_QUERY = gql`
  mutation signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

const AuthSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export default function SignUp() {
  const [signup] = useMutation(SIGNUP_QUERY);
  const initialValues = { name: '', email: '', password: '' };

  const signUpUser = ({ name, email, password }) => {
    return signup({
      variables: {
        name,
        email,
        password,
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        signUpUser(values)
          .then((data) => setUserData(data.data.signup.token))
          .catch((e) => {
            onError(e);
          });
        actions.resetForm();
      }}
      validationSchema={AuthSchema}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <legend>Sign Up</legend>

            <Field type='text' id='name' name='name' label='Name' component={TextField} />

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
