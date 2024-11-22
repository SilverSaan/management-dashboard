// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  // Automatically redirect to /dashboard
  redirect('/dashboard');

  // You can return a minimal JSX to avoid issues (won't render since it redirects)
  return <div>Redirecting...</div>;
}
