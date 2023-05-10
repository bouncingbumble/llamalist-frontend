import React, { useState } from 'react'
import { Box, Text, Flex } from '@chakra-ui/react'
import Document from '@tiptap/extension-document'
import { useEditor, EditorContent, Extension } from '@tiptap/react'
import Link from '@tiptap/extension-link'
import HardBreak from '@tiptap/extension-hard-break'
import { Text as ttText } from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'

export default function Notes({ notes, handleUpdate, disabled }) {
    return (
        <Box cursor={disabled && 'default'}>
            {notes?.length > 7 && (
                <>
                    <Text fontSize="md" textColor="grey.900">
                        Notes
                    </Text>
                    <hr
                        style={{
                            borderTopWidth: '2px',
                            height: '2px',
                            borderRadius: '16px',
                            borderColor: '#edf1f7', //light.400
                            marginTop: '2px',
                            marginBottom: '8px',
                        }}
                    />
                </>
            )}
            <NotesForm
                notes={notes}
                handleUpdate={handleUpdate}
                style={{
                    width: '100%',
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
            ></NotesForm>
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
            Document,
            Paragraph,
            ttText,
            PreventEnter,
            HardBreak,
            Link.configure({ HTMLAttributes: { class: 'description-link' } }),
            Placeholder.configure({
                // Use a placeholder:
                placeholder: 'Type a note',
            }),
        ],
        content: notes,
        editorProps: {
            attributes: {
                class: 'office-otter-form-desc',
            },
        },
        injectCSS: false,
        onBlur: ({ editor }) => {
            const html = editor.getHTML()
            // send the content to an API here
            handleUpdate({ notes: html }, 'notes')
        },
    })

    return (
        <Box
            style={{
                fontSize: 16,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                marginRight: 'auto',
            }}
        >
            <EditorContent
                onKeyDown={(e) => {
                    if (e.keyCode === 13 && !e.shiftKey) {
                        editor.commands.blur()
                    }
                }}
                editor={editor}
            />
        </Box>
    )
}
