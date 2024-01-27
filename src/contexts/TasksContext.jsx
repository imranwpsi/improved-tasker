import { createContext, useContext, useReducer } from "react";
import { initialTasks } from "../data/tasks";
import taskReducer from "../reducers/taskReducer";

export const TaskContext = createContext(null);
export const TaskDispatchContext = createContext(null);

const initialState = {
    tasks: initialTasks,
    searchedTasks: [],
};

export default function TasksProvider({ children }) {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    return (
        <TaskContext.Provider value={state}>
            <TaskDispatchContext.Provider value={dispatch}>
                {children}
            </TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );
}

export function useTaskState() {
    return useContext(TaskContext);
}

export function useTasksDispatch() {
    return useContext(TaskDispatchContext);
}

export function useTaskModal() {
    return useContext(TaskModalContext);
}