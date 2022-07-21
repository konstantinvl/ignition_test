import { gql, useQuery, NetworkStatus } from '@apollo/client';
import ErrorMessage from './ErrorMessage';
import Post from './post/post';
import { InView } from 'react-intersection-observer';
import { useState } from 'react';

export const ALL_POSTS_QUERY = gql`
  query feed($take: Int!, $skip: Int!) {
    feed(take: $take, skip: $skip) {
      count
      links {
        id
        description
        url
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
            name
          }
        }
      }
    }
  }
`;

export default function PostList() {
  const { loading, error, data, fetchMore } = useQuery(ALL_POSTS_QUERY, {
    variables: { take: 10, skip: 0 },
  });

  if (error) return <ErrorMessage message='Error loading posts.' />;

  const { feed } = data;
  const { links } = feed;

  const [linksToShow, setLinksToShow] = useState(links);

  return (
    <section>
      {data && linksToShow.map((link) => <Post post={link} key={link.id} />)}

      {data && fetchMore && (
        <InView
          onChange={async (inView) => {
            const currentLength = linksToShow.length || 0;
            const newLinks = await fetchMore({
              variables: {
                take: 10,
                skip: currentLength,
              },
            });
            setLinksToShow(linksToShow.concat(newLinks.data.feed.links));
          }}
        />
      )}
    </section>
  );
}
