import React from 'react'

export default (href, text, key) => (
    <a
        href={href}
        key={key}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'blue' }}
    >
        {text}
    </a>
)
