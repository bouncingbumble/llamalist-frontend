import React, { useEffect, useState } from 'react'
import space from '../../../images/space.png'
import space2 from '../../../images/space2.png'
import space3 from '../../../images/space3.png'
import Llama from '../../java-llama-react/Llama'
import { Flex } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'

export default function Space({
    slide,
    store,
    funFact,
    scribbleSound,
    showSpeechBubble,
    setShowSpeechBubble,
}) {
    const id = uuidv4()

    const containerStyle = {
        width: '200px',
        left: '100px',
        bottom: store ? '-25%' : '-50%',
        height: '200px',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    }
    return (
        <Flex
            direction="column"
            width="300px"
            height="100%"
            backgroundImage={space3}
            backgroundSize="300px"
            backgroundPosition="bottom"
            justify="end"
        >
            <Flex width="100%" height="100%" flexFlow="row nowrap">
                <div class="foreground">
                    <div style={containerStyle}>
                        <div class="moon">
                            <div class="moon-row">
                                <div class="crater crater1"></div>
                                <div class="crater crater2"></div>
                            </div>
                            <div class="moon-row">
                                <div class="crater crater3"></div>
                                <div class="moon-face">
                                    <div class="blush"></div>
                                    <div class="moon-eye moon-eye-l"></div>
                                    <div class="moon-mouth"></div>
                                    <div class="moon-eye moon-eye-r"></div>
                                    <div class="blush"></div>
                                </div>
                            </div>
                            <div class="moon-row">
                                <div class="crater crater4"></div>
                                <div class="crater crater5"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="background">
                    <div style={containerStyle}>
                        <div class="orbit">
                            <div class="rocket">
                                <div class="rocket-window"></div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            height: store ? '60%' : '75%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            justifySelf: 'flex-end',
                            marginTop: 'auto',
                        }}
                    >
                        <div class="space-llama">
                            <Llama
                                space
                                id={id}
                                minHeight={150}
                                progress={[0, 1]}
                            />
                        </div>
                    </div>
                </div>
            </Flex>
        </Flex>
    )
}
