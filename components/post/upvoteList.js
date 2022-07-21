import React from 'react';
import { useState } from 'react';
import { Avatar, Box, Typography, Backdrop } from '@mui/material';
import { USERS_SHOW_ON_UPVOTE } from '../common/constants';
import Modal from '@mui/material/Modal';

export default function UpvoteList({ votes }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      {votes && (
        <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleToggle}>
          {votes.map((vote, index) => {
            return index < USERS_SHOW_ON_UPVOTE ? (
              <Avatar key={vote.id} sx={{ margin: 0.5 }}>
                {vote.user.name[0]?.toUpperCase()}
              </Avatar>
            ) : (
              ''
            );
          })}
          <Typography>
            {votes.length > USERS_SHOW_ON_UPVOTE
              ? ` and ${votes.length - USERS_SHOW_ON_UPVOTE} more users`
              : ''}
          </Typography>
        </Box>
      )}
      {votes && (
        <Backdrop
          open={open}
          onClick={() => {
            handleClose();
          }}
          sx={{ display: 'flex', flexDirection: 'column', zIndex: 9999 }}>
          <Box sx={{ background: 'white', padding: 5, borderRadius: 1 }}>
            <Typography>List of people who upvoted this post:</Typography>
            {votes.map((vote) => {
              return <Typography key={vote.user.id}>{vote.user.name}</Typography>;
            })}
            <Typography sx={{ mt: 5 }}>Click anywere to close</Typography>
          </Box>
        </Backdrop>
      )}
    </>
  );
}
