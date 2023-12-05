import React from 'react'

export default function PrivacyPolicy() {
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
                    <span style={{ fontWeight: 400 }}>PRIVACY POLICY</span>
                </p>
                <p>&nbsp;</p>
                <p>
                    <span style={{ fontWeight: 400 }}>
                        Last updated December 05, 2023
                    </span>
                </p>
                <p>&nbsp;</p>
                <p>
                    <span style={{ fontWeight: 400 }}>OVERVIEW</span>
                </p>
                <p style={{ marginTop: 16 }}>
                    <span style={{ fontWeight: 400 }}>
                        We care about data privacy and security. By using our
                        service, you agree to be bound by our Privacy Policy
                        posted on the Site, which is incorporated into these
                        Terms of Use. Please be advised our service is hosted in{' '}
                    </span>
                    <span style={{ fontWeight: 400 }}>the United States</span>
                    <span style={{ fontWeight: 400 }}>
                        . If you access our service from any other region of the
                        world with laws or other requirements governing personal
                        data collection, use, or disclosure that differ from
                        applicable laws in{' '}
                    </span>
                    <span style={{ fontWeight: 400 }}>the United States</span>
                    <span style={{ fontWeight: 400 }}>
                        , then through your continued use of our service, you
                        are transferring your data to{' '}
                    </span>
                    <span style={{ fontWeight: 400 }}>the United States</span>
                    <span style={{ fontWeight: 400 }}>
                        , and you agree to have your data transferred to and
                        processed in{' '}
                    </span>
                    <span style={{ fontWeight: 400 }}>the United States</span>
                    <span style={{ fontWeight: 400 }}>.</span>
                </p>
                <p>
                    <br />
                    <br />
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>PASSWORD</span>
                </p>
                <p style={{ marginTop: 16 }}>
                    <span style={{ fontWeight: 400 }}>
                        Your password is stored on a secure server. It is
                        encrypted using a Blowfish cypher which uses an
                        algorithm that has never been cracked before. Your
                        password is also hashed and salted. We couldn’t even
                        read your password if we wanted to. Your password is as
                        safe as it could possibly be.
                    </span>
                </p>
                <p>
                    <br />
                    <br />
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>ACCOUNT</span>
                </p>
                <p style={{ marginTop: 16 }}>
                    <span style={{ fontWeight: 400 }}>
                        No one has access to your account but you. No one in
                        your organization (or outside) can access your task list
                        or any of your other information in Llama List. Even
                        when you share a task, your account is secure. No one
                        can log in to your account without your password (which
                        we covered above as being completely secure) or the
                        email you use to login.
                    </span>
                </p>
                <p>
                    <br />
                    <br />
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>ENCRYPTION</span>
                </p>
                <p style={{ marginTop: 16 }}>
                    <span style={{ fontWeight: 400 }}>
                        All communication sent between our servers and the
                        application is encrypted with 256-bit HTTPS encryption.
                        Our servers have automated certificate management (ACM).
                        Our servers use SSL, a cryptographic protocol that
                        provides end-to-end encryption and integrity for all web
                        requests. All network traffic from our database is
                        encrypted using Transport layer Security (TLS).
                        Encryption for data at rest is automated using encrypted
                        storage volumes.
                    </span>
                </p>
                <p>
                    <br />
                    <br />
                </p>
                <p>
                    <span style={{ fontWeight: 400 }}>SERVICE DESCRIPTION</span>
                </p>
                <p style={{ marginTop: 16, marginBottom: 48 }}>
                    <span style={{ fontWeight: 400 }}>
                        This service offers internal capabilites as well as
                        external integrations. If you choose to use any external
                        integrations, including Llama List for Microsoft Teams,
                        all information transferred to our service is still
                        subject to the aforementioned policies.
                    </span>
                </p>
            </div>
        </div>
    )
}
