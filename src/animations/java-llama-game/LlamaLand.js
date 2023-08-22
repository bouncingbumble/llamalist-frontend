import './llama-game.css'
import React from 'react'
import RunningLlama from './RunningLlama'
import {
    Flex,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
} from '@chakra-ui/react'

export default function LlamaLand({ isOpen, onClose }) {
    const runSpeed = 5
    const llamaHeight = window.innerHeight * 0.25

    return (
        <Modal size="full" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent style={{ overflow: 'hidden' }}>
                <Flex
                    width="100%"
                    position="absolute"
                    justify="end"
                    zIndex={9999}
                >
                    <Button
                        margin="24px"
                        colorScheme="purple"
                        onClick={onClose}
                    >
                        Back to Work
                    </Button>
                </Flex>
                <div class="llama-land">
                    <div class="clouds-game">
                        <div class="big-cloud">
                            <div class="big-ball" />
                            <div class="medium-ball" />
                            <div class="little-ball" />
                        </div>
                        <div class="little-cloud">
                            <div class="big-ball" />
                            <div class="medium-ball" style={{ right: 0 }} />
                            <div class="little-ball" style={{ left: 0 }} />
                        </div>
                        <div class="medium-cloud">
                            <div class="big-ball" />
                            <div class="medium-ball" />
                            <div class="little-ball" />
                        </div>
                    </div>
                    <RunningLlama llamaHeight={llamaHeight} />
                    <div class="grass" />
                    <Flex justify="space-between">
                        <div
                            class="tuft"
                            style={{
                                left: '5%',
                                animation: `move-grass-left ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                        <div
                            class="tuft"
                            style={{
                                left: '50%',
                                animation: `move-grass-middle ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                        <div
                            class="tuft"
                            style={{
                                left: '95%',
                                animation: `move-grass-right ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                        <div
                            class="tuft"
                            style={{
                                left: '140%',
                                animation: `move-grass-offscreen ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                    </Flex>
                </div>
            </ModalContent>
        </Modal>
    )
}
