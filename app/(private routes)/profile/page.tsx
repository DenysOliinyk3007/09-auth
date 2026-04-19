import type { Metadata } from 'next'
import ProfilePage from '@/components/ProfilePage/ProfilePage'

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'Your personal NoteHub profile page',
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'Your personal NoteHub profile page',
    url: 'https://notehub.com/profile',
    siteName: 'NoteHub',
    images: [
      {
        url: 'https://placehold.co/1200x630',
        width: 1200,
        height: 630,
        alt: 'NoteHub Profile',
      },
    ],
    type: 'profile',
  },
}

export default function Page() {
  return <ProfilePage />
}