import { createClient } from 'altogic';


const options = {
  signInRedirect: 'https://altogic-blog-eight.vercel.app/login'
}
const altogic = createClient(
  process.env.NEXT_PUBLIC_ALTOGIC_ENV_URL,
  process.env.NEXT_PUBLIC_ALTOGIC_CLIENT_KEY,
  options
);
export const { db, auth, storage, endpoint, queue, realtime, cache } = altogic;
