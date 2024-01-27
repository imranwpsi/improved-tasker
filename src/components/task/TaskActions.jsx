import { toast } from "react-toastify";
import { useTasksDispatch } from "../../contexts/TasksContext";

export default function TaskActions({ onAddClick }) {
    const dispatch = useTasksDispatch();

    return (
        <>
            <button 
                className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold"
                onClick={onAddClick}
            >Add Task</button>
            <button 
                className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold"
                onClick={() => {
                    if (confirm("Are you sure you want to delete all?")) {
                        dispatch({
                            type: "deletedAll"
                        });
                        toast.success("All tasks deleted successfully");
                    }
                }}
            >Delete All</button>
        </>
    )
}
