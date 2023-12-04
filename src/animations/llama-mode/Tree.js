import React from 'react'
import './tree.css'
export default function Tree({ showApple, right }) {
    return (
        <div className="tree-container">
            <div className="llama-mode-tree">
                <div className="tree-triangle1"></div>
                <div className="tree-triangle2"></div>
                <div className="tree-triangle3"></div>
            </div>
            {showApple && (
                <div className="apple" style={{ right }}>
                    🍎
                </div>
            )}
            <div className="trunky"></div>
        </div>
    )
}
