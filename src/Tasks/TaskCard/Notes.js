import Link from '@tiptap/extension-link'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import HardBreak from '@tiptap/extension-hard-break'
import Placeholder from '@tiptap/extension-placeholder'
import { useContext } from 'react'
import { TasksContext } from '../../Contexts/TasksContext'
import { Text as ttText } from '@tiptap/extension-text'
import { Box, Text, Divider } from '@chakra-ui/react'
import { useEditor, EditorContent, Extension } from '@tiptap/react'

export default function Notes({ taskId, taskNotes, disabled }) {
    const { updateTask } = useContext(TasksContext)

    const handleUpdate = (html) => {
        updateTask(taskId, { notes: html })
    }

    return (
        <Box pl="30px" mt="8px" mb="24px" cursor={disabled && 'default'}>
            <Text fontSize="md" textColor="#8f9bb3">
                Notes
            </Text>
            <Divider mt="2px" mb="8px" height="1px" backgroundColor="#edf1f7" />
            <NotesForm notes={taskNotes} handleUpdate={handleUpdate} />
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
        onBlur: ({ editor }) => handleUpdate(editor.getHTML()),
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
