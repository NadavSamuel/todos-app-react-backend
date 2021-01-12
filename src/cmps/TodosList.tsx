import React from 'react'
import { Todo } from '../interfaces'
import { TodoCard } from '../cmps/TodoCard'
import Masonry from 'react-masonry-css'
interface TodosListProps {
    todos: Todo[],

}

export const TodosList: React.FC<TodosListProps> = ({ todos,  }) => {
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };
    return (
        <React.Fragment>
        <ul className="todos-list clean-list ">
            <Masonry breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {todos.map(todo => {
                   if(todo.pinned) return <TodoCard  key={todo._id} todo={todo} />
                })}

            </Masonry>

        </ul>
        <ul className="todos-list clean-list ">
            <Masonry breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
                {todos.map(todo => {
                    if(!todo.pinned)return <TodoCard  key={todo._id} todo={todo} />
                })}

            </Masonry>

        </ul>
        </React.Fragment>

    );
}