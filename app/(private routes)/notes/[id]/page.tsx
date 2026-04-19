import { fetchServerNoteById } from '@/lib/api/serverApi'
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";

interface SingleNoteProps {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: SingleNoteProps): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchServerNoteById(id);
    return {
        title: `Note: ${note.title}`,
        description: note.content.slice(0, 30),
        openGraph: {
            title: `Note: ${note.title}`,
            description: note.content.slice(0, 100),
            url: `https://notehub.com/notes/${id}`,
            siteName: 'NoteHub',
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1500,
                    height: 1000,
                    alt: note.title,
                  },
            ],
            type: 'article',
        }
    }}


    const NoteDetails = async ({ params }: SingleNoteProps) => {
        const { id } = await params;
        const queryClient = new QueryClient();

        await queryClient.prefetchQuery({
            queryKey: ["note", id],
            queryFn: () => fetchServerNoteById(id),
        });
        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteDetailsClient />
            </HydrationBoundary>
        )
    }


    export default NoteDetails;