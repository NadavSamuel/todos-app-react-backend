import httpService from './httpService';
import { Todo } from '../interfaces'
import {FilterBy} from '../interfaces'

export const todosService = {
    query,
    save,
    remove,
    getById,
    makeId
}
function query(filterBy:FilterBy) {
    let queryStr:string = ``;
    if (filterBy.title)  queryStr += `?title=${filterBy.title}`;
    return httpService.get(`todo${queryStr || ''}`);
}

function getById(todoId: string) {
    return httpService.get(`todo/${todoId}`)
}

function remove(todoId: string) {
    return httpService.delete(`todo/${todoId}`)
}

function save(todoToSave: Todo) {
    if (todoToSave._id) {
        httpService.put(`todo/`,{todoToSave})
    } else {
        httpService.post(`todo/`,{todoToSave})
    }
    return Promise.resolve(todoToSave);
}

function makeId(length:number = 5):string {
    var text:string = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i:number = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
