import App from '../components/App';
import Header from '../components/Header';
import Submit from '../components/Submit';
import PostList, { ALL_POSTS_QUERY, allPostsQueryVars } from '../components/PostList';
import { initializeApollo, addApolloState } from '../lib/apolloClient';

const IndexPage = () => (
  <App>
    <Header />
    <Submit />
    <PostList />
  </App>
);

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_POSTS_QUERY,
    variables: { take: 10, skip: 0 },
  });

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
}

export default IndexPage;
