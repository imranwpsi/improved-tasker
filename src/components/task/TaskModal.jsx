import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useTasksDispatch } from '../../contexts/TasksContext';

export default function TaskModal({ onCloseClick, taskToUpdate }) {
    const dispatch = useTasksDispatch();
    //const notify = () => toast("Wow so easy!");
    const [task, setTask] = useState(taskToUpdate || []);

    const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null))

    const handleChange = (evt) => {
        const name = evt.target.name;
        let value = evt.target.value;
        if (name === 'tags') {
            value = value.split(",");
        }
        setTask({
            ...task,
            [name]: value
        })
    }

    const checkValidation = () => {
        const errors = {};

        if (!task.title) {
            errors.title = "Task title is required.";
        }
        if (!task.description) {
            errors.description = "Task description is required.";
        }
        if (!task.tags || task.tags.length === 0 || task.tags.some(tag => tag.trim() === '')) {
            errors.tags = "Tags are required.";
        }
        if (!task.priority) {
            errors.priority = "Priority is required.";
        }
        if (Object.keys(errors).length > 0) {
            // Display individual error messages using react-toastify
            Object.keys(errors).forEach((key) => {
                toast.warning(errors[key]);
            });
            // Prevent dispatch if there are validation errors
            return false;
        }
        return true; // Proceed with dispatch if no validation errors
    };


    return (
        <form
            className="mx-auto w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:p-11 fixed top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] z-50"
        >
            <h2
                className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]"
            >
                {isAdd ? "Add New Task" : "Edit Task"}
            </h2>

            <div className="space-y-9 text-white lg:space-y-10">

                <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="title">Title</label>
                    <input
                        className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                        type="text"
                        name="title"
                        id="title"
                        required
                        value={task.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                        type="text"
                        name="description"
                        id="description"
                        required
                        value={task.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div
                    className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20"
                >

                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="tags">Tags</label>
                        <input
                            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                            type="text"
                            name="tags"
                            id="tags"
                            required
                            value={task.tags}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="priority">Priority</label>
                        <select
                            className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                            name="priority"
                            id="priority"
                            required
                            value={task.priority}
                            onChange={handleChange}
                        >
                            <option value="">Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="mt-16 flex justify-evenly lg:mt-20">
                <button
                    className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
                    onClick={(e) => {
                        e.preventDefault();
                        onCloseClick()
                    }}
                >
                    Close
                </button>
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                    onClick={(e) => {
                        e.preventDefault();
                        const isValid = checkValidation()
                        if (isValid) {
                            // Proceed with dispatch if validation passes
                            setTask([]);
                            dispatch({
                                type: isAdd ? "added" : "updated",
                                task,
                            });
                            onCloseClick();
                            const toastMessage = isAdd ? "Task added successfully" : "Task updated successfully";
                            toast.success(toastMessage);
                        }
                    }}
                >
                    Save
                </button>
            </div>
        </form>
    )
}