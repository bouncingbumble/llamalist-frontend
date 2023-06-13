import React from 'react'
import ContentEditable from 'react-contenteditable'
import { Button, Kbd } from '@chakra-ui/react'

class LlamaFormBlock extends React.Component {
    constructor(props) {
        super()
        this.contentEditable = React.createRef()
        this.state = { html: props.value }
    }

    componentDidMount() {
        var div = document.getElementById('contenteditablediv')
        setTimeout(function () {
            div.focus()
        }, 0)
    }

    handleChange = (evt) => {
        this.setState({ html: evt.target.value })
    }

    render = () => {
        return (
            <>
                <ContentEditable
                    id="contenteditablediv"
                    innerRef={this.contentEditable}
                    html={this.state.html} // innerHTML of the editable div
                    onChange={this.handleChange} // handle innerHTML change
                    onBlur={(e) => this.props.handleSubmit(e, true)}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            e.preventDefault()
                            e.stopPropagation()
                            this.props.handleSubmit(e)
                            this.setState({ html: '' })
                        }
                    }}
                    className="llama-form"
                    style={this.props.style}
                />
            </>
        )
    }
}

export default LlamaFormBlock
