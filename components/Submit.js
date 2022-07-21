import { gql, useMutation } from '@apollo/client';
import { TextField } from 'formik-mui';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Stack } from '@mui/material';
import { onError } from '@apollo/client/link/error';

const POST_QUERY = gql`
  mutation post($url: String!, $description: String!) {
    post(url: $url, description: $description) {
      id
    }
  }
`;

const AuthSchema = Yup.object().shape({
  url: Yup.string().required(),
  description: Yup.string().required(),
});

export default function Submit() {
  const [post] = useMutation(POST_QUERY);
  const initialValues = { url: '', description: '' };

  const postURL = ({ url, description }) => {
    return post({
      variables: {
        url,
        description,
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        postURL(values)
          .then((data) => console.log(data))
          .catch((e) => {
            onError(e);
          });
        actions.resetForm();
      }}
      validationSchema={AuthSchema}>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <legend>Submit new link</legend>

            <Field type='text' id='url' name='url' label='URL' component={TextField} />

            <Field
              type='text'
              id='description'
              name='description'
              label='Description'
              component={TextField}
            />

            <button type='submit'>Submit</button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
