
import css from './SidebarNotes.module.css'



export default function SidebarNotes({ tags }: {tags: string[]}) {
    return (
        <ul className={css.menuList}>

            <li className={css.menuItem}>
                <a href={`/notes/filter/all`} className={css.menuLink}>
                    All notes
                </a>
            </li>
            {
                tags.map((tag: string) => {
                    return (
                        <li className={css.menuItem} key={tag}>
                            <a href={`/notes/filter/${tag}`} className={css.menuLink}>
                                {tag}
                            </a>
                        </li>
                    )
                })
            }

        </ul>
    )
}