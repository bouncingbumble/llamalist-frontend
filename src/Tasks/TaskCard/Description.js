import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import Document from '@tiptap/extension-document'
import { useEditor, EditorContent, Extension } from '@tiptap/react'
import Link from '@tiptap/extension-link'
import HardBreak from '@tiptap/extension-hard-break'
import { Text as ttText } from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'

export default function Description({
    expanded,
    description,
    handleUpdate,
    disabled,
}) {
    return (
        <>
            {/* {!expanded && (
                <Text
                    name="description"
                    style={{
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            cursor: 'text !important',
                        },

                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        pointerEvents: 'none',
                        fontSize: '18px',
                        marginLeft: '16px',
                        marginTop: '11px',
                        lineBreak: 'anywhere',
                        wordWrap: 'break-word',
                        width: 'calc(100% - 20px)',
                    }}
                >
                    {description}
                </Text>
            )} */}

            {disabled ? (
                <Text
                    name="description"
                    style={{
                        fontSize: 18,
                        whiteSpace: 'nowrap',
                        marginLeft: '16px',
                        width: '100%',
                        lineBreak: 'anywhere',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        marginTop: 11,
                        width: 'calc(100% - 20px)',
                    }}
                >
                    {description.replace(/<\/?[^>]+(>|$)/g, '')}
                </Text>
            ) : (
                <DescriptionForm
                    description={description}
                    handleUpdate={handleUpdate}
                    expanded={expanded}
                    disabled={disabled}
                />
            )}
        </>
    )
}

const PreventEnter = Extension.create({
    addKeyboardShortcuts() {
        return {
            Enter: () => true,
        }
    },
})

const DescriptionForm = ({ description, handleUpdate, disabled, expanded }) => {
    let editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            ttText,
            PreventEnter,
            HardBreak,
            Link.configure({ HTMLAttributes: { class: 'description-link' } }),
        ],
        content: description,
        editable: !disabled,
        editorProps: {
            attributes: {
                class: 'llama-task-name',
            },
        },
        injectCSS: false,
        onBlur: ({ editor }) => {
            const html = editor.getHTML()
            // send the content to an API here
            handleUpdate({ description: html }, 'description')
        },
    })

    return (
        <Box
            style={{
                fontSize: 18,
                marginLeft: '16px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: !expanded && 'nowrap',
                maxHeight: !expanded && '26px',
                marginRight: 'auto',
                cursor: disabled && 'default',
                width: 'calc(100% - 20px)',
                marginTop: !expanded && '11px',
                pointerEvents: !expanded && 'none',
            }}
        >
            {expanded ? (
                <EditorContent
                    onKeyDown={(e) => {
                        if (e.keyCode === 13 && !e.shiftKey) {
                            editor.commands.blur()
                        }
                    }}
                    editor={editor}
                />
            ) : (
                <Text>{description.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
            )}
        </Box>
    )
}
