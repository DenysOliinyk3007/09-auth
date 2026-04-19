import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import NotesClient from './Notes.client'
import { fetchNotes } from '@/lib/api/clientApi'
import { Metadata } from 'next'
type Props = {
  params: Promise<{ slug?: string[],
   }>
}


export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const tag = slug?.[0] === 'all' ? 'all tags' : slug?.[0];
  return {
    title: `Notes for ${tag}`,
    description: `List of notes for ${tag}`,
    openGraph: {
      title: `Notes for ${tag}`,
      description: `List of notes for ${tag}`,
      url: `http://localhost:3000/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1500,
          height: 1000,
          alt: 'NoteHub logo',
        },
      ],
    }
  } 
}



  export default async function FilterPage({ params }: Props) {
    const { slug } = await params
    const tag = slug?.[0] === 'all' ? undefined : slug?.[0]

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
      queryKey: ['notes', 1, '', tag],
      queryFn: () => fetchNotes('', 1, tag),
    })

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
    )
  }