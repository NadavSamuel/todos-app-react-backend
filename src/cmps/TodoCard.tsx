import React, { useContext, useState, useRef, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Markable, Todo } from '../interfaces'
import { Button, Icon, Popup, Card, Header } from 'semantic-ui-react'
import { RootStoreContext } from '../stores/RootStore'
import { ColorPalate } from './ColorPalate'
import { TxtTodo } from './TxtTodo'
import { ListTodo } from './ListTodo'
import { VideoImgTodo } from './VideoImgTodo'
import { setRelevantPlaceholder,setTodoByType } from '../services/mixins'
import ContentEditable from 'react-contenteditable'
// import * as moment from 'moment';


interface todoProps {
    todo: Todo,
}
const moment = require('moment');

export const TodoCard: React.FC<todoProps> = observer(({ todo }) => {
    const { txt, _id, pinned, title, created, lastUpdated, markables, type } = todo;
    const rootStoreContext = useContext(RootStoreContext);
    const { todosStore, systemStore } = rootStoreContext;
    const [paleteOpen, setPaleteOpen] = useState<boolean>(false);
    const [isNewTxt, setIsNewTxt] = useState(false);
    const cardTitleRef = useRef();
    useEffect(() => {
        if (!txt) setIsNewTxt(true)
    }, [])

    async function onDeleteTodo() {
        systemStore.turnLoaderOn()
        await todosStore.deleteTodo(_id);
        systemStore.turnLoaderOff();
    }
    function toggleIsNewTxt():void  {
        setIsNewTxt(!isNewTxt);
    }
    function onChooseColor(chosenClr):void  {
        todo.bgc = chosenClr;
        onUpdateTodo(todo);
        setPaleteOpen(false);
    }
    function onPinTodo():void  {
        todo.pinned = !todo.pinned;
        onUpdateTodo(todo);
    }
    let debounce = null;

    function onTxtChange(txt: string, isDebounce: boolean = true): void {
        if (!isDebounce) {
            txtChange(txt);
            return
        }

        if (debounce) clearTimeout(debounce)
        debounce = setTimeout(() => {
            txtChange(txt)
        }, 2500);
    }

    function txtChange(txt: string):void {
        todo.txt = txt;
        onUpdateTodo(todo);
        setIsNewTxt(false);
    }
    function onTitleChange(event):void {
        if (debounce) clearTimeout(debounce)
        debounce = setTimeout(() => {
            todo.title = event.target.value;
            onUpdateTodo(todo);
        }, 2500);
    }
    function onToggleMarkable(markableToToggle:Markable):void {
        markableToToggle.isDone = !markableToToggle.isDone;
        todo.markables = todo.markables.map((markable) =>{
            if(markable.txt === markableToToggle.txt ) markable = markableToToggle
            return markable
        })
        onUpdateTodo(todo);
    }
    function onAddMarkable(markableToAdd:Markable):void {
        todo.markables.push(markableToAdd);
        onUpdateTodo(todo);
    }
    function onDeleteMarkable(markableTxt: string): void {
        todo.markables = todo.markables.filter(markable => markable.txt !== markableTxt);
        onUpdateTodo(todo);
    }
    async function onUpdateTodo(todoToUpdate: Todo = todo) {
        try {
            systemStore.turnLoaderOn();
            await todosStore.saveTodo(todoToUpdate);
            systemStore.turnLoaderOff();
        }
        catch (err) {
            systemStore.onError()
            console.log('OOPS!', err);
        }
    }
    function isShowEditBtn():boolean | null{
        if(type==='img' || type ==='video') return true
    }
    return (
        <Card className="todo-card" style={{ backgroundColor: todo.bgc, transition: '0.3s', maxHeight: '100%' }}>
            <Icon onClick={onPinTodo} className="pin-btn cursor-pointer" style={{ marginBottom: "20px", alignSelf: 'center' }} color={pinned ? 'red' : 'black'}  name='pin' />
            <ContentEditable
                innerRef={cardTitleRef}
                html={title || 'title'}
                disabled={false}
                onChange={onTitleChange}
                tagName='h2'
            />
            <Header as="h4">Created :{`${moment(created).fromNow()}`}</Header>
            {lastUpdated && <Header as="h4">Last updated: {`${moment(lastUpdated).fromNow()}`}</Header>}
            {<Card.Description >{setTodoByType(type,txt,onTxtChange,onDeleteMarkable,onAddMarkable,onToggleMarkable,markables,isNewTxt)}</Card.Description>}
            <Card.Content textAlign="center" className="card-btns-container" >
                <Button circular onClick={onDeleteTodo} icon>
                    <Icon name="trash alternate outline" />
                </Button>
                {isShowEditBtn() && <Button active ={isNewTxt} circular onClick={toggleIsNewTxt} icon>
                    <Icon name="edit outline" />
                </Button>}
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
})