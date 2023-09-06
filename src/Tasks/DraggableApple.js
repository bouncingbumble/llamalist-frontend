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
        : {
              animationFillMode: 'both',
              animationDuration: '1s',
              animationIterationCount: 1,
          }

    return (
        <Box
            className={'bouncey-boi'}
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            fontSize="28px"
            key={num}
        >
            🍎
        </Box>
    )
}
