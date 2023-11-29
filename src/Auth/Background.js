import React, { useEffect, useState } from 'react'
import Llama from '../animations/java-llama-react/Llama'
import BackgroundLlama from '../animations/java-llama-react/BackgroundLlama'
import { Flex } from '@chakra-ui/react'
import './background.css'

export default function Background() {
    // state
    const [showLoneTree, setShowLoneTree] = useState(true)
    const [showRightGrove, setShowRightGrove] = useState(true)

    const showTrees = () => {
        if (window.innerWidth > 1480) {
            setShowLoneTree(true)
            setShowRightGrove(true)
        } else if (window.innerWidth > 1190) {
            setShowLoneTree(false)
            setShowRightGrove(true)
        } else {
            setShowLoneTree(true)
            setShowRightGrove(false)
        }
    }

    useEffect(() => {
        showTrees()
        window.onresize = showTrees
        return () => {
            window.onresize = null
        }
    }, [])
    return (
        <Flex position="absolute" height="100vh" width="100vw" bg="#d9edfa">
            {/* sky */}
            <div className="sun-auth" />
            <div className="cloud-group-auth">
                <div className="cloud-auth" style={{ top: '180px' }} />
                <div className="cloud-auth" style={{ left: '600px' }} />
            </div>

            {/* llama */}
            <Flex position="absolute" left="150px" bottom="40px">
                <BackgroundLlama progress={[0, 10]} minHeight={150} />
            </Flex>

            {/* trees */}
            <div className="tree-group-auth">
                <div
                    className="tree-auth"
                    style={{
                        left: '90px',
                        transform: 'scale(1.2)',
                        marginBottom: '30px',
                    }}
                >
                    <div className="trunk-auth" />
                    <div
                        className="tree-top-auth-small"
                        style={{ backgroundColor: '#a7cc00' }}
                    />
                </div>
                <div
                    className="tree-auth"
                    style={{ left: '120px', marginBottom: '140px' }}
                >
                    <div
                        className="trunk-auth"
                        style={{
                            height: '160px',
                            width: '10px',
                            marginLeft: '-2px',
                            backgroundColor: '#9d5d5d',
                        }}
                    />
                    <div className="tree-top-auth-big-top" />
                    <div className="tree-top-auth-big-middle" />
                    <div className="tree-top-auth-big-bottom" />
                </div>
                <div
                    className="tree-auth"
                    style={{
                        left: '50px',
                        transform: 'scale(2)',
                        marginBottom: '40px',
                    }}
                >
                    <div
                        className="trunk-auth"
                        style={{ backgroundColor: '#9d5d5d' }}
                    />
                    <div className="tree-top-auth-small">
                        <div className="tree-top-auth-small-center" />
                    </div>
                </div>

                <div
                    className="tree-auth"
                    style={{ left: '430px', marginBottom: '100px' }}
                >
                    <div
                        className="trunk-auth"
                        style={{ height: '130px', width: '10px' }}
                    />
                    <div className="tree-top-auth-big-top">
                        <div className="tree-top-auth-big-shadow" />
                    </div>
                    <div className="tree-top-auth-big-middle">
                        <div className="tree-top-auth-big-shadow" />
                    </div>
                    <div className="tree-top-auth-big-bottom">
                        <div className="tree-top-auth-big-shadow" />
                    </div>
                </div>
                <div
                    className="tree-auth"
                    style={{
                        left: '360px',
                        marginBottom: '70px',
                        transform: 'scale(0.7)',
                    }}
                >
                    <div
                        className="trunk-auth"
                        style={{
                            height: '110px',
                            width: '8px',
                        }}
                    />
                    <div className="tree-top-auth-big-top" />
                    <div className="tree-top-auth-big-middle" />
                    <div className="tree-top-auth-big-bottom" />
                </div>
                <div
                    className="tree-auth"
                    style={{
                        left: '390px',
                        transform: 'scale(1)',
                        marginBottom: '25px',
                    }}
                >
                    <div
                        className="trunk-auth"
                        style={{ backgroundColor: '#9d5d5d' }}
                    />
                    <div className="tree-top-auth-small" />
                </div>

                <div
                    className="tree-auth"
                    style={{
                        left: '590px',
                        marginBottom: '40px',
                        transform: 'scale(0.8)',
                    }}
                >
                    <div
                        className="trunk-auth"
                        style={{
                            height: '80px',
                            backgroundColor: '#9d5d5d',
                            width: '8px',
                        }}
                    />
                    <div
                        className="tree-top-auth-big-top"
                        style={{ backgroundColor: '#4da85b' }}
                    />
                    <div
                        className="tree-top-auth-big-middle"
                        style={{ backgroundColor: '#4da85b' }}
                    />
                    <div
                        className="tree-top-auth-big-bottom"
                        style={{ backgroundColor: '#4da85b' }}
                    />
                </div>
                <div
                    className="tree-auth"
                    style={{
                        left: '620px',
                        transform: 'scale(0.9)',
                        marginBottom: '20px',
                    }}
                >
                    <div className="trunk-auth" style={{ left: '-2px' }} />
                    <div
                        className="tree-top-auth-small"
                        style={{ backgroundColor: '#a7cc00' }}
                    />
                </div>
                {showLoneTree && (
                    <div
                        className="tree-auth"
                        style={{
                            left: '920px',
                            transform: 'scale(2.5)',
                            marginBottom: '80px',
                        }}
                    >
                        <div
                            className="trunk-auth"
                            style={{ height: '60px', left: '-1px' }}
                        />
                        <div className="tree-top-auth-small">
                            <div className="tree-top-auth-small-center" />
                        </div>
                    </div>
                )}

                {showRightGrove && (
                    <>
                        <div
                            className="tree-auth"
                            style={{
                                right: '120px',
                                transform: 'scale(1.2)',
                                marginBottom: '30px',
                            }}
                        >
                            <div
                                className="trunk-auth"
                                style={{ backgroundColor: '#9d5d5d' }}
                            />
                            <div
                                className="tree-top-auth-small"
                                style={{ backgroundColor: '#a7cc00' }}
                            />
                        </div>
                        <div
                            className="tree-auth"
                            style={{
                                right: '180px',
                                marginBottom: '180px',
                            }}
                        >
                            <div
                                className="trunk-auth"
                                style={{
                                    height: '200px',
                                    width: '10px',
                                    marginLeft: '-2px',
                                }}
                            />
                            <div className="tree-top-auth-big-top">
                                <div className="tree-top-auth-big-shadow" />
                            </div>
                            <div className="tree-top-auth-big-middle">
                                <div className="tree-top-auth-big-shadow" />
                            </div>
                            <div className="tree-top-auth-big-bottom">
                                <div className="tree-top-auth-big-shadow" />
                            </div>
                        </div>
                        <div
                            className="tree-auth"
                            style={{
                                right: '80px',
                                transform: 'scale(2)',
                                marginBottom: '40px',
                            }}
                        >
                            <div
                                className="trunk-auth"
                                style={{ backgroundColor: '#9d5d5d' }}
                            />
                            <div className="tree-top-auth-small">
                                <div className="tree-top-auth-small-center" />
                            </div>
                        </div>

                        <div
                            className="tree-auth"
                            style={{
                                right: '340px',
                                transform: 'scale(1)',
                                marginBottom: '30px',
                            }}
                        >
                            <div className="trunk-auth" />
                            <div
                                className="tree-top-auth-small"
                                style={{ backgroundColor: '#a7cc00' }}
                            />
                        </div>
                        <div
                            className="tree-auth"
                            style={{ right: '400px', marginBottom: '110px' }}
                        >
                            <div
                                className="trunk-auth"
                                style={{ height: '130px' }}
                            />
                            <div className="tree-top-auth-big-top" />
                            <div className="tree-top-auth-big-middle" />
                            <div className="tree-top-auth-big-bottom" />
                        </div>
                        <div
                            className="tree-auth"
                            style={{
                                right: '470px',
                                marginBottom: '100px',
                                transform: 'scale(0.7)',
                            }}
                        >
                            <div
                                className="trunk-auth"
                                style={{
                                    height: '160px',
                                    width: '12px',
                                    backgroundColor: '#9d5d5d',
                                }}
                            />
                            <div
                                className="tree-top-auth-big-top"
                                style={{ backgroundColor: '#4da85b' }}
                            />
                            <div
                                className="tree-top-auth-big-middle"
                                style={{ backgroundColor: '#4da85b' }}
                            />
                            <div
                                className="tree-top-auth-big-bottom"
                                style={{ backgroundColor: '#4da85b' }}
                            />
                        </div>
                    </>
                )}
            </div>

            {/* ground */}
            <div className="base-auth">
                <div className="bush-group-auth">
                    {new Array(40).fill(0).map((bush, index) => (
                        <div
                            className="bush-auth"
                            style={{ left: `${index * 75}px` }}
                        />
                    ))}
                </div>
            </div>
        </Flex>
    )
}
