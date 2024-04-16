import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';



/**
 * `Post` is a React component that provides a rich text editor for creating posts.
 * @component
 * @param {Object} props - The properties that define the component's behavior and display.
 * @param {function} props.onChange - The function to call when the text editor's content changes.
 * @param {function} props.setContent - The function to call to set the content of the post.
 * @param {string} props.type - The type of the component, used to determine if `setContent` should be called.
 * @returns {JSX.Element} A React element that renders the rich text editor.
 */
class Post extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        setContent: PropTypes.func,
        type: PropTypes.string
    };

    state = {
        value: RichTextEditor.createEmptyValue()
    }

    onChange = (value) => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange(
                value.toString('markdown')
            );
        }
        if (this.props.type === 'Post') {
            this.props.setContent(value.toString('markdown'));
            
        }
    };

    render() {
        const toolbarConfig = {
            // Optionally specify the groups to display (displayed in the order listed).
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
                { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
                { label: 'Italic', style: 'ITALIC' },
                { label: 'Underline', style: 'UNDERLINE' }
            ],
            BLOCK_TYPE_DROPDOWN: [
                { label: 'Normal', style: 'unstyled' },
                { label: 'Heading Large', style: 'header-one' },
                { label: 'Heading Medium', style: 'header-two' },
                { label: 'Heading Small', style: 'header-three' }
            ],
            BLOCK_TYPE_BUTTONS: [
                { label: 'UL', style: 'unordered-list-item' },
                { label: 'OL', style: 'ordered-list-item' }
            ]
        };
        return (
          
                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                    toolbarConfig={toolbarConfig}
                    editorClassName="custom-editor-style"
                    placeholder='Text (optional)'
                />
   
        );
    }
}
export default Post;