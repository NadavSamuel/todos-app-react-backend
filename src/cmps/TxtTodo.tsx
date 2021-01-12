import React, { useRef } from 'react'
import ContentEditable from 'react-contenteditable'

interface TxtTodoProps {
    txt: string
    onContentEditable(txt:string): void
}
export const TxtTodo: React.FC<TxtTodoProps> = ({ txt, onContentEditable }) => {
    const contentEditableRef = useRef();
     function onTxtChange(event){
        onContentEditable(event.target.value);
    }
    return (
        <ContentEditable
            innerRef={contentEditableRef}
            html={txt}
            disabled={false} 
            onChange={ onTxtChange}
            tagName='p'
            />
    );
}