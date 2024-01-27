export default function taskReducer(state, action) {
    switch (action.type) {
        case "searched": {
            const searchedTasks = state.tasks.filter((task) =>
                task.title.toLowerCase().includes(action.text.toLowerCase())
            );
            return {
                ...state,
                searchedTasks,
            };
        }
        case "favorite": {
            const tasks = state.tasks.map((task) => {
                if (task.id === action.id) {
                    return { ...task, isFavorite: !task.isFavorite };
                } else {
                    return task;
                }
            })
            return {
                ...state,
                tasks,
            };
        }
        case "added": {
            const tasks = [
                ...state.tasks,
                {
                    ...action.task,
                    id: crypto.randomUUID()
                }
            ];
            return {
                ...state,
                tasks
            }
        }
        case "updated": {
            const tasks = state.tasks.map((t) => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
            return {
                ...state,
                tasks
            }
        }
        case "deleted": {
            const tasks = state.tasks.filter((t) => t.id !== action.id);
            const searchedTasks = state.searchedTasks.filter((t) => t.id !== action.id);
            return {
                searchedTasks,
                tasks
            }
        }
        case "deletedAll": {
            return {
                searchedTasks: [],
                tasks: []
            }
        }
        default: {
            throw Error(`No action matched with ${action.type}`);
        }
    }
}