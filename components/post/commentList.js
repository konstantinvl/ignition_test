import { Stack, Card, Typography } from '@mui/material';

export default function CommentList({ comments }) {
  return (
    <Stack>
      {comments &&
        comments.map((comment) => (
          <Card key={comment.id}>
            <Typography>{comment.user.name}</Typography>
            <Typography>{comment.text}</Typography>
          </Card>
        ))}
    </Stack>
  );
}
