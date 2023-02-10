import { useState } from "react"
import App from "./App"
import produce from 'immer'
import { string } from "prop-types";

export type TodoItemType = { id: number; todo: string; desc: string; done: boolean }
export type StatesType = { todoList: Array<TodoItemType> }
export type CallbacksType = {
  addTodo: (todo: string, desc: string) => void;
  deleteTodo: (id: number) => void;
  toggleDone: (id: number) => void;
  updateTodo: (id: number, todo: string, desc: string, done: boolean) => void;
}

const AppContainer = () => {
  const [todoList, setTodoList] = useState<Array<TodoItemType>>([
    {id: 1, todo: '투두1', desc: '투두1 설명', done: false},
    {id: 2, todo: '투두2', desc: '투두2 설명', done: true},
    {id: 3, todo: '투두3', desc: '투두3 설명', done: false},
    {id: 4, todo: '투두4', desc: '투두4 설명', done: false},
  ])
  
  const addTodo = (todo: string, desc: string) => {
    let newTodoList = produce(todoList, (draft) => {
      draft.push({ id: new Date().getTime(), todo, desc, done: false})
    })
    setTodoList(newTodoList)
  }

  const deleteTodo = (id: number) => {
    let index = todoList.findIndex((todo) => todo.id === id)
    let newTodoList = produce(todoList, (draft) => {
      draft.splice(index, 1)
    })
    setTodoList(newTodoList)
  }

  const toggleDone = (id: number) => {
    let index = todoList.findIndex((todo) => todo.id === id)
    let newTodoList = produce(todoList, (draft) => {
      draft[index].done = !draft[index].done
    })
    setTodoList(newTodoList)
  }

  const updateTodo = (id: number, todo: string, desc: string, done: boolean) => {
    let index = todoList.findIndex((todo) => todo.id === id)
    let newTodoList = produce(todoList, (draft) => {
      draft[index] = { ...draft[index], todo, desc, done }
    })
    setTodoList(newTodoList)
  }

  // 상태와 액션을 states, callbacks 객체로 묶어서 한꺼번에 속성 전달!!
  const callbacks: CallbacksType = { addTodo, deleteTodo, toggleDone, updateTodo}
  const states: StatesType = { todoList }
  
  return <App callbacks={callbacks} states={states} />
}

export default AppContainer