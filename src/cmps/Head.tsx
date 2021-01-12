import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Select, Button, Container, Header, Input } from 'semantic-ui-react'
import { useForm } from '../services/customHooks'
import { RootStoreContext } from '../stores/RootStore'
import { NewTodoCard } from '../cmps/NewTodoCard'
import { Todo } from '../interfaces'

export const Head: React.FC = observer(() => {
        const rootStoreContext = useContext(RootStoreContext);
        const { todosStore, systemStore, userStore } = rootStoreContext;
        const { todosAmount } = todosStore;
        const { username } = userStore.loggedInUser;
        const [todoType, setTodoType] = useState<string>('txt');
        const [isSendTodo, setIsSendTodo] = useState<boolean>(false);
        const [filterBy, handleChange] = useForm({ title: '' });

        const inputOptions = [
                { key: 'txt', text: 'Text', value: 'txt' },
                { key: 'list', text: 'List', value: 'list' },
                { key: 'img', text: 'Image', value: 'img' },
                { key: 'video', text: 'Video', value: 'video' }
        ];
        function onChangeType(e, { name, value }): void {
                setTodoType(value)
        }
        async function onTodoSubmit(todoToSubmit: Todo) {
                try {
                        setIsSendTodo(false)
                        systemStore.turnLoaderOn();
                        await todosStore.saveTodo(todoToSubmit);
                        await todosStore.loadTodos();
                        setTodoType('txt');
                        systemStore.turnLoaderOff();
                }
                catch (error) {
                        systemStore.onError()
                        console.log(error)
                }
        }
        function toggleIsSendTodo() {
                setIsSendTodo(true)
        }
        async function onChangeQuery(event) {
                handleChange(event)
                todosStore.setFilter(event.target.value)
                todosStore.loadTodos()
        }
        const isMultipleTodos = (todosAmount === 1)?'todo':'todos'

        return (
                <Container className="todos-header" textAlign="center">
                        <Container className="search-container" textAlign="left">
                                <Header > Hello {username}! you have {todosAmount } {isMultipleTodos} </Header>
                                <Input
                                        icon={{ name: 'search', circular: true }}
                                        placeholder='Search for a todo'
                                        onChange={onChangeQuery}
                                        value={filterBy.title}
                                        name="title"
                                        autoComplete="off"
                                />
                        </Container>

                        <Select name='type' value={todoType} onChange={onChangeType} options={inputOptions} style={{ minWidth: '8rem' }} />
                        <Button type="button" onClick={toggleIsSendTodo} >Send</Button>
                        <NewTodoCard isSendTodo={isSendTodo} type={todoType} onTodoSubmit={onTodoSubmit} />
                </Container>
        );
})