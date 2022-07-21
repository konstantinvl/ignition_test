import Link from '@mui/material/Link';

export default function ExternalLink({ url, description }) {
  const checkedUrl = /^http/.test(toString(url)) ? url : '//' + url;
  return (
    <Link href={checkedUrl} target='_blank'>
      {description}
    </Link>
  );
}
