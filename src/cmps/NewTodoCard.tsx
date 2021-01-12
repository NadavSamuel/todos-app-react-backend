import React, {  useState, useRef, useEffect } from 'react'
import { Markable, Todo } from '../interfaces'
import { Button, Icon, Popup, Card } from 'semantic-ui-react'
import { ColorPalate } from './ColorPalate'
import ContentEditable from 'react-contenteditable'
import { setTodoByType } from '../services/mixins'

interface NewTodoCardProps {
    type: string,
    onTodoSubmit(todo: Todo): void,
    isSendTodo?: boolean

}
export const NewTodoCard: React.FC<NewTodoCardProps> = ({ type, onTodoSubmit, isSendTodo = false }) => {

    useEffect(() => {
        if (isSendTodo) onSendTodo();
        isSendTodo = false;

    })
    const [title, setTitle] = useState<string>('Title');
    const [bgc, setBcg] = useState<string | null>(null);
    const [txt, setTxt] = useState<string>('Enter txt here');
    const [pinned, setIsPinned] = useState<boolean>(false);
    const [markables, setMarkables] = useState<Markable[]>([]);
    const [paleteOpen, setPaleteOpen] = useState<boolean>(false);
    const isNewTxt: boolean = true;
    const isNewTodo: boolean = true;
    const cardTitleRef = useRef();
    function onTitleChange(event): void {
        setTitle(event.target.value);

    }
    function onTxtChange(txt: string): void {
        setTxt(txt);
    }
    function onDeleteMarkable(markableToDeleteId: string): void {
        setMarkables(markables.filter(markable => markable.id !== markableToDeleteId));

    }
    function onAddMarkable(markableToAdd: Markable): void {
        setMarkables([...markables, markableToAdd]);
    }
    function onToggleMarkable() {
        return
    }
    function onChooseColor(color) {
        setBcg(color)
    }
    function onSendTodo() {

        const newTodo: Todo = {
            title,
            type,
            txt,
            bgc,
            pinned
        }
        if (type === 'list') newTodo.markables = markables;
        onTodoSubmit(newTodo);
        setInitialState();
    }
    function setInitialState() {
        setTitle('Title');
        setTxt('Enter text here');
        setIsPinned(false);
        setMarkables([]);
        setBcg(null);
        setPaleteOpen(false);
    }

    return (
        <Card centered className="todo-card" style={{ backgroundColor: bgc, transition: '0.3s', maxHeight: '100%' }}>
            <Icon onClick={() => setIsPinned(!pinned)} className="pin-btn cursor-pointer" style={{ marginBottom: "20px", alignSelf: 'center' }} color={pinned ? 'red' : 'black'} name='pin' />
            <ContentEditable
                innerRef={cardTitleRef}
                html={title}
                disabled={false}
                onChange={onTitleChange}
                tagName='h2'
            />
            {<Card.Description >{setTodoByType(type, txt, onTxtChange, onDeleteMarkable, onAddMarkable, onToggleMarkable, markables, isNewTxt, isNewTodo)}</Card.Description>}
            <Card.Content textAlign="center" className="card-btns-container" >
                <Popup
                    on='click'
                    pinned
                    open={paleteOpen}
                    onClose={() => setPaleteOpen(false)}
                    onOpen={() => setPaleteOpen(true)}
                    trigger={<Button circular icon> <Icon name="paint brush" /></Button>}
                >
                    <ColorPalate onChooseColor={onChooseColor} />
                </Popup>
            </Card.Content>
        </Card>
    );
}