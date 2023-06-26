import Link from '@tiptap/extension-link'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import HardBreak from '@tiptap/extension-hard-break'
import Placeholder from '@tiptap/extension-placeholder'
import { Text as ttText } from '@tiptap/extension-text'
import { Box, Text, Divider } from '@chakra-ui/react'
import { useEditor, EditorContent, Extension } from '@tiptap/react'
import { useUpdateTask } from '../../Hooks/TasksHooks'

export default function Notes({ task }) {
    const updateTask = useUpdateTask()

    const handleUpdate = (html) => {
        updateTask.mutate({ _id: task._id, notes: html })
    }

    return (
        <Box pl="20px" mt="8px" mb="24px">
            <NotesForm notes={task.notes} handleUpdate={handleUpdate} />
        </Box>
    )
}

const PreventEnter = Extension.create({
    addKeyboardShortcuts() {
        return {
            Enter: () => true,
        }
    },
})

const NotesForm = ({ notes, handleUpdate }) => {
    let editor = useEditor({
        extensions: [
            ttText,
            Document,
            Paragraph,
            HardBreak,
            PreventEnter,
            Placeholder.configure({ placeholder: 'Type a note...' }),
            Link.configure({ HTMLAttributes: { class: 'description-link' } }),
        ],
        content: notes,
        editorProps: {
            attributes: {
                class: 'notes-editor',
            },
        },
        onBlur: ({ editor, event }) => handleUpdate(editor.getHTML(), event),
    })

    return (
        <Box>
            <EditorContent
                editor={editor}
                onKeyDown={(e) => {
                    if (e.keyCode === 13 && !e.shiftKey) {
                        editor.commands.blur()
                    }
                }}
                onClick={(event) => event.stopPropagation()}
            />
        </Box>
    )
}
