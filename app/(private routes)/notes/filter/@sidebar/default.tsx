import SidebarNotes from "@/components/SidebarNotes/SidebarNotes";

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];


export default function SidebarNotesDefault () {
    return (
        <SidebarNotes tags={TAGS}/>
    )
}

