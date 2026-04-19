import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import NotePreview from './NotePreview.client'
import { fetchServerNoteById } from '@/lib/serverApi'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ModalPage({ params }: Props) {
  const { id } = await params

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchServerNoteById(id),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  )
}