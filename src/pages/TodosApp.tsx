import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Head } from '../cmps/Head'
import { TodosList } from '../cmps/TodosList'
import { RootStoreContext } from '../stores/RootStore'
import { useHistory } from 'react-router-dom'
import { NoTodosMsg } from '../cmps/NoTodosMsg'
import { ErrorModal } from '../cmps/ErrorModal'
import { Dimmer } from 'semantic-ui-react'

const TodosApp= observer(() => {
  const rootStoreContext = useContext(RootStoreContext);
  const { todosStore, userStore, systemStore } = rootStoreContext;
  const { todos, sortedTodos } = todosStore;
  const { loggedInUser } = userStore;
  const router = useHistory();
  const isError = systemStore.isError.existingError;

  useEffect(() => {

    onAppLoad()
  }, [])
  async function onAppLoad() {
    try {
      if (!loggedInUser) userStore.getLoggedInUser()
      await todosStore.loadTodos()
    }
    catch(err) {
      console.log('catch',err)
      router.push('/')
    }
  }

  if (!todos) {
    systemStore.turnLoaderOn();
    return null
  }
  systemStore.turnLoaderOff();
  return (
    <React.Fragment>
      <Dimmer active={(isError)} style={{ position: 'fixed' }} />
        <Head />
        {loggedInUser && todos && <TodosList todos={sortedTodos} />}
        {loggedInUser && !todos.length && <NoTodosMsg />}
        {isError &&
          <ErrorModal />
        }

    </React.Fragment>
  )
})

export default TodosApp