import React from 'react'
import { Box, Flex, Link } from '@chakra-ui/react'
import { AttachmentIcon, TrashIcon } from '../../ChakraDesign/Icons'
import theme from '../../ChakraDesign/theme'

export default function AttachmentsList({
    attachments,
    section,
    deleteAttachment,
    cantDelete,
}) {
    const grey = theme.colors.grey[900]
    const red = theme.colors.red[400]

    return (
        <>
            {attachments.length > 0 && (
                <Box w="100%" pl="32px" mt="16px">
                    <Flex align="center" flexWrap="wrap">
                        {attachments.map((attachment, index) => {
                            return (
                                <Flex
                                    key={index}
                                    align="center"
                                    h="32px"
                                    mb="4px"
                                >
                                    <AttachmentIcon />
                                    <Link
                                        href={attachment.url}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        mr="8px"
                                    >
                                        {attachment.name}
                                    </Link>
                                    {!cantDelete && (
                                        <TrashIcon
                                            color={grey}
                                            _hover={{ color: red }}
                                            onClick={() =>
                                                deleteAttachment(attachment._id)
                                            }
                                        />
                                    )}
                                </Flex>
                            )
                        })}
                    </Flex>
                </Box>
            )}
        </>
    )
}
