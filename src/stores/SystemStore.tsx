import { makeAutoObservable, runInAction } from "mobx"
import { RootStore } from './RootStore'
interface error{
    existingError:boolean
    errorStatus:number | null
}
export class SystemStore {
    rootStore: RootStore
    
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);    
    }

    isLoading:boolean = false;
    isError:error = {
        existingError:false,
        errorStatus:null
    };
    
    
    turnLoaderOn(){
        runInAction(() =>{
            this.isLoading = true
        })
    }
    turnLoaderOff(){
        runInAction(() =>{
            setTimeout(() => this.isLoading = false,1500)            
        })

    }
    onError(errorStatus =null){
        runInAction(() =>{
            this.isError.existingError = true;
            if(errorStatus) this.isError.errorStatus = errorStatus;
        })
    }
    onErrorHandle(){
        runInAction(() =>{
            this.isError.existingError = false;
            this.isError.errorStatus = null;
        })

    }


}
