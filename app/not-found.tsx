import { Metadata } from 'next'
import css from './page.module.css'


export const metadata: Metadata = {
    title: 'Not Found',
    description: 'Page is not found',
    openGraph: {
        title: 'Not Found',
        description: 'Page is not found',
        url: 'http://localhost:3000',
        images:
            [
                {
                    url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                    width: 1500,
                    height: 1000,
                    alt: 'NoteHub logo',
                },
            ],

    }
}

const NotFound = () => {
    return (
        <div>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </div>

    )
}

export default NotFound