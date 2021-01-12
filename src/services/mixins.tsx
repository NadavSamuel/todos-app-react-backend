 import { TxtTodo } from '../cmps/TxtTodo'
import { ListTodo } from '../cmps/ListTodo'
import { VideoImgTodo } from '../cmps/VideoImgTodo'
import {Markable} from '../interfaces'

export function setRelevantPlaceholder(todoType:string):string {
    switch (todoType) {
            case 'txt':
                    return 'Enter todo text'
            case 'list':
                    return 'Enter todos'
            case 'img':
                    return 'Enter an image URL'
            case 'video':
                    return 'Enter a youtube URL'
    }
}

export function setTodoByType(type:string,txt?:string,
onTxtChange?:(txt: string) =>void,onDeleteMarkable?:(markableTxt:string)=>void,
onAddMarkable?:(markableToAdd:Markable)=>void,
onToggleMarkable?:(markableToToggle:Markable)=>void,markables?:Markable[],
isNewTxt?:boolean, isNewTodo:boolean = false) {
        switch (type) {
            case 'txt':
                return <TxtTodo txt={txt} onContentEditable={onTxtChange} />
            case 'list':
                return <ListTodo onDeleteMarkable={onDeleteMarkable} placeholder={setRelevantPlaceholder(type)} onAddMarkable={onAddMarkable} onToggleMarkable={onToggleMarkable} markables={markables} />
            case 'img':
                return <VideoImgTodo isNewTodo={isNewTodo} type={type} isNewTxt={isNewTxt} placeholder={setRelevantPlaceholder(type)} onNewUrl={onTxtChange} url={txt} />
            case 'video':
                return <VideoImgTodo isNewTodo={isNewTodo} type={type} isNewTxt={isNewTxt} placeholder={setRelevantPlaceholder(type)} onNewUrl={onTxtChange} url={txt} />
        }
    }