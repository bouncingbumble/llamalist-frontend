import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Box } from '@chakra-ui/react'

export function DraggableApple({ num }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable' + num,
    })
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined

    return (
        <Box
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            fontSize="28px"
            key={num}
        >
            🍎
        </Box>
    )
}
