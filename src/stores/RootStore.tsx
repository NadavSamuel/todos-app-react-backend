import { createContext } from 'react'
import {TodosStore} from './TodosStore'
import { UserStore } from './UserStore'
import { SystemStore } from './SystemStore'
// import {createContext} from 'react'
export class RootStore{
    systemStore = new SystemStore(this)
    userStore = new UserStore(this,this.systemStore)
    todosStore = new TodosStore(this,this.userStore)
}

export const RootStoreContext = createContext(new RootStore())