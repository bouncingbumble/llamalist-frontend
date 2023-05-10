import React from 'react'
import ContentEditable from 'react-contenteditable'

class UpdateNotesFormBlock extends React.Component {
    constructor(props) {
        super()
        this.contentEditable = React.createRef()
        this.state = { html: props.value }
    }

    handleChange = (evt) => {
        this.setState({ html: evt.target.value })
    }

    render = () => {
        return (
            <ContentEditable
                innerRef={this.contentEditable}
                html={this.state.html} // innerHTML of the editable div
                disabled={false} // use true to disable editing
                onChange={this.handleChange} // handle innerHTML change
                onBlur={this.props.handleSubmit}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        e.preventDefault()
                        e.stopPropagation()
                        e.target.blur()
                    }
                }}
                className="office-otter-form"
                style={this.props.style}
            />
        )
    }
}

export default UpdateNotesFormBlock
