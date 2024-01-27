import React from 'react';
import { toast } from 'react-toastify';
import { useTasksDispatch } from '../../contexts/TasksContext';

export default function Task({ task, onEdit }) {
    const dispatch = useTasksDispatch();

    return (
        <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
            <td>
                <a 
                    className='cursor-pointer' 
                    onClick={() => {
                        dispatch({
                            type: "favorite",
                            id: task.id,
                        });
                    }}
                >
                {
                    task.isFavorite ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="yellow" fill="yellow"
                            strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                    :
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="24"
                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                }
                </a>
            </td>
            <td>{task.title}</td>
            <td>
                <div>{task.description}</div>
            </td>
            <td>
                <ul className="flex justify-center gap-1.5 flex-wrap">
                    {task.tags?.map((tag, i) => (
                        <li key={i}>
                            <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]">{tag}</span>
                        </li>
                    ))}
                </ul>
            </td>
            <td className="text-center">{task.priority}</td>
            <td>
                <div className="flex items-center justify-center space-x-3">
                    <button 
                        className="text-red-500"
                        onClick={() => {
                            if (confirm("Are you sure you want to delete?")) {
                                dispatch({
                                    type: "deleted",
                                    id: task.id,
                                });
                                toast.success("Task deleted successfully");
                            }
                        }}
                    >Delete</button>
                    <button
                        className="text-blue-500"
                        onClick={() => onEdit(task)}
                    >Edit</button>
                </div>
            </td>
        </tr>
    )
}
