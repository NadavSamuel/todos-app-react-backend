export interface Todo{
    pinned?:boolean,
    txt?:string,
    title?:string,
    bgc?:string,
    _id?:string,
    type?:string
    created?:number,
    lastUpdated?:number,
    markables?:Markable[]
}
export interface FilterBy {
    title?: string,
}
export interface UserTodos{
    byUser:string,
    todos:Todo[]
}
export interface Markable{
    isDone:boolean,
    txt:string
}
export interface User{
    username:string,
    email:string,
    password:string
}
