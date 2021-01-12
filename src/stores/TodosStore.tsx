import { Todo } from '../interfaces'
import { makeAutoObservable, runInAction,  } from "mobx"
import { RootStore } from './RootStore'
import { UserStore } from './UserStore'
import { todosService } from '../services/todosService'
import { FilterBy } from '../interfaces'
export class TodosStore {
    rootStore: RootStore
    userStore: UserStore
    constructor(rootStore: RootStore, userStore: UserStore) {
        this.rootStore = rootStore
        this.userStore = userStore
        makeAutoObservable(this)  
    }
    todos: Todo[] | null = null;
    filterBy: FilterBy = { title: '' }
    todosAmount: number = 0

    loadTodos() {
        runInAction(async () => {
            this.todos = await todosService.query(this.filterBy);
            this.getTotalTodosNumber()
        })
    }
    saveTodo(newTodo: Todo) {
        try {
            runInAction(async () => {
                await todosService.save(newTodo)
            })
        }
        catch (err) {
            console.log('err in save action!', err)
        }
    }
    async deleteTodo(todoToDeleteId: string) {
        try {
            await todosService.remove(todoToDeleteId)
            await this.loadTodos()
        }
        catch (err) {
            console.log('err in delete action!', err)
        }

    }
    setFilter(newFilter) {
        runInAction(() => {
            this.filterBy.title = newFilter;
        })
    }
    get sortedTodos() {
        if (!this.todos) return null
        return this.todos.slice().sort((a, b) => Number(b.pinned) - Number(a.pinned));
    }
    async getTotalTodosNumber() {
        const totalTodos = await todosService.query({ title: '' });
        const length = totalTodos.length
        runInAction(() => {
            this.todosAmount = length
        })
    }
}