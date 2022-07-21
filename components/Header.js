import { useRouter } from 'next/router';
import { AppBar, Box, Typography, ButtonGroup, Button } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  const { pathname } = useRouter();

  return (
    <AppBar sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', mb: 5 }}>
      <ButtonGroup>
        <Button>
          <Link href='/'>
            <a>Home</a>
          </Link>
        </Button>
        <Button>
          <Link href='/login'>
            <a>Log In</a>
          </Link>
        </Button>
        <Button>
          <Link href='/signup'>
            <a>Sign Up</a>
          </Link>
        </Button>
      </ButtonGroup>
    </AppBar>
  );
}
