import React from 'react'

export default function SupportPage() {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 48,
                fontSize: '17px',
                color: 'black',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'left',
                    flexDirection: 'column',
                    maxWidth: 500,
                }}
            >
                <p>
                    <span style={{ fontWeight: 400 }}>LLAMA LIST SUPPORT</span>
                </p>
                <p>&nbsp;</p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        Last updated December 05, 2023
                    </span>
                </p>
                <p style={{ marginTop: 32, textAlign: 'center' }}>
                    For any questions regarding pricing, account information, or
                    technical support please contact:
                </p>
                <p style={{ marginTop: 24, fontWeight: 'bold' }}>
                    jordan@llamalist.com
                </p>
                <p>or</p>
                <p style={{ fontWeight: 'bold' }}>nickguido@llamalist.com</p>
            </div>
        </div>
    )
}
