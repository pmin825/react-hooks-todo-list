import axios from "axios";
import React, { useContext } from "react";
import TodosContext from "../context";

function TodoList() {
    const { state, dispatch } = useContext(TodosContext);
    const title =
        state.todos.length > 0
            ? `${state.todos.length} Todos`
            : "Nothing To Do!";
    return (
        <div className="container mx-auto max-w-md text-center font-mono">
            <h1 className="text-bold m-5">{title}</h1>
            <ul className="list-reset text-black p-0">
                {state.todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center bg-orange-dark border-black border-dashed border-2 my-2 py-4"
                    >
                        <span
                            onDoubleClick={async () => {
                                const response = await axios.patch(
                                    `https://react-hooks-todo-list.pmin825.vercel.app/todos/${todo.id}`,
                                    {
                                        complete: !todo.complete,
                                    }
                                );
                                dispatch({
                                    type: "TOGGLE_TODO",
                                    payload: response.data,
                                });
                            }}
                            className={`flex-1 m12 cursor-pointer ${
                                todo.complete &&
                                "line-through text-grey-darkest"
                            }`}
                        >
                            {todo.text}
                        </span>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "SET_CURRENT_TODO",
                                    payload: todo,
                                })
                            }
                        >
                            <img
                                src="https://img.icons8.com/metro/26/000000/edit.png"
                                alt="Edit Icon"
                                className="h-6 m-2"
                            />
                        </button>
                        <button
                            onClick={async () => {
                                axios.delete(
                                    `https://react-hooks-todo-list.pmin825.vercel.app/todos/${todo.id}`
                                );
                                dispatch({
                                    type: "REMOVE_TODO",
                                    payload: todo,
                                });
                            }}
                        >
                            <img
                                src="https://img.icons8.com//flat_round/64/000000/delete-sign.png"
                                alt="Delete Icon"
                                className="h-6 m-2"
                            />
                        </button>
                    </li>
                ))}
            </ul>
            <a href="https://icons8.com/icon/48/edit">Edit icon by Icons8 -</a>
            <a href="https://icons8.com/icon/81432/delete">
                {" "}
                Delete icon by Icons8{" "}
            </a>
        </div>
    );
}

export default TodoList;
