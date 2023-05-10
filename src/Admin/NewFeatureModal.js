import React, { useState } from 'react'
import { apiCall } from '../Util/api'
import Document from '@tiptap/extension-document'
import { useEditor, EditorContent } from '@tiptap/react'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import Bold from '@tiptap/extension-bold'
import HardBreak from '@tiptap/extension-hard-break'
import { Text as ttText } from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import {
    Box,
    Flex,
    Text,
    Modal,
    Button,
    ModalBody,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
} from '@chakra-ui/react'

export default function NewFeatureModal({ admin, isOpen, onClose }) {
    const [message, setMessage] = useState('')

    const submit = () => {
        apiCall(`POST`, `/admin/${admin._id}/users/newFeature`, { message })
        setMessage('')
        onClose()
    }

    return (
        <Modal
            size="2xl"
            isOpen={isOpen}
            onClose={onClose}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent p="16px">
                <ModalCloseButton m="8px" />
                <ModalHeader>
                    <Text textAlign="center">New Feature!🎉</Text>
                </ModalHeader>
                <ModalBody>
                    <Text>
                        By clicking submit, you will send an alert to all Office
                        Otter users. The default message will say:
                    </Text>
                    <Text mt="8px" mb="8px" fontWeight="bold">
                        We've been hard at work! Refresh your page to get Office
                        Otter's newest features!
                    </Text>
                    <Text mt="16px">
                        If you wish to add an additional message, you can input
                        it below...
                    </Text>
                    <TextAreaForm message={message} setMessage={setMessage} />
                    <Flex justify="end">
                        <Button colorScheme="blue" onClick={submit}>
                            submit
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

const TextAreaForm = ({ message, setMessage }) => {
    const [textAlign, setTextAlign] = useState('left')

    let editor = useEditor({
        extensions: [
            Bold,
            ttText,
            Document,
            ListItem,
            Paragraph,
            HardBreak,
            Link.configure({ HTMLAttributes: { class: 'description-link' } }),
            TextAlign.configure({
                types: ['paragraph'],
            }),
            BulletList.configure({
                HTMLAttributes: { class: 'tiptap-bullet' },
            }),
        ],
        content: message,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            setMessage(html)
        },
    })

    const toggleTextAlign = () => {
        if (textAlign === 'left') {
            setTextAlign('center')
            editor.chain().focus().setTextAlign('center').run()
        } else {
            setTextAlign('left')
            editor.chain().focus().setTextAlign('left').run()
        }
    }

    const toggleBold = () => {
        editor.chain().focus().toggleBold().run()
    }

    const toggleBulletPoint = () => {
        editor.chain().focus().toggleBulletList().run()
    }

    return (
        <>
            <Box
                outline="1px solid #0a58ce"
                borderRadius="8px"
                minH="96px"
                p="16px"
                mt="8px"
            >
                <EditorContent editor={editor} />
            </Box>
            <Flex>
                <Button mt="16px" mb="-32px" onClick={toggleTextAlign}>
                    {`${textAlign === 'left' ? 'Center' : 'Left'} justify`}
                </Button>
                <Button
                    mt="16px"
                    mb="-32px"
                    ml="8px"
                    onClick={toggleBulletPoint}
                >
                    Bullet
                </Button>
                <Button mt="16px" mb="-32px" ml="8px" onClick={toggleBold}>
                    Bold
                </Button>
            </Flex>
        </>
    )
}
