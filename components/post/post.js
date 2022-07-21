import { Card, Box } from '@mui/material';
import ExternalLink from './externalLink';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import UpvoteList from './upvoteList';

export default function Post({ post }) {
  return (
    <>
      {post && (
        <Card sx={{ display: 'flex', flexDirection: 'column', padding: 2, margin: 1 }}>
          <ExternalLink url={post.url} description={post.description} />
          <Box>
            <ThumbUpIcon />
            <UpvoteList votes={post.votes} />
          </Box>
        </Card>
      )}
    </>
  );
}
