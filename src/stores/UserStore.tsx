import { User } from '../interfaces'
import { makeAutoObservable, runInAction } from "mobx"
import { RootStore } from './RootStore'
import userService from '../services/userService'
import { SystemStore } from './SystemStore'

const window = require("global/window")
const { sessionStorage } = window

export class UserStore {
    rootStore: RootStore
    systemStore: SystemStore
    constructor(rootStore: RootStore, systemStore:SystemStore) {
        this.rootStore = rootStore
        this.systemStore = systemStore
        makeAutoObservable(this)
    }
    loggedInUser: User | null = null
    getLoggedInUser() {
        runInAction(() => {
            this.loggedInUser = JSON.parse(sessionStorage.getItem('user'));
        })
    }
    async onlogin(userCreds) {
        try {
            const currUser = await userService.login(userCreds);
            runInAction(() => {
                if(this.systemStore.isError.existingError) this.systemStore.onErrorHandle();
                this.loggedInUser = currUser;
            })
        }
        catch (err) {
            console.log(err)
            if (err === 401) {
                this.systemStore.onError(401);
            }
            else this.systemStore.onError();
            
        }
    }
    async onSignup(userCreds) {
        const newUser = await userService.signup(userCreds);
        runInAction(() => {
            this.loggedInUser = newUser;
        })
    }
    async logout() {
        await userService.logout();
        runInAction(() => {
            this.loggedInUser = null;
        })

    }
}
