import { useState } from "react";
import TasksProvider from "../../contexts/TasksContext";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

export default function TaskBoard() {
    const [showModal, setShowModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    function handleEditTask(task) {
        setTaskToUpdate(task);
        setShowModal(true);
    }

    return (
        <section className="mb-20" id="tasks">
            <TasksProvider>
                { showModal && (
                    <TaskModal 
                        onCloseClick={() => {
                            setShowModal(false);
                            setTaskToUpdate(null);
                        }}
                        taskToUpdate={taskToUpdate}
                    />
                )}
                <div className="container">
                    <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                        <div className="mb-14 items-center justify-between sm:flex">
                            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
                            <div className="flex items-center space-x-5">
                                <SearchTask />
                                <TaskActions 
                                    onAddClick={() => setShowModal(true)}
                                    // onDeleteAllClick={handleDeleteAllClick}
                                />
                            </div>
                        </div>
                        <TaskList 
                            onEdit={handleEditTask}
                        />
                    </div>
                </div>
            </TasksProvider>
        </section>
    )
}
