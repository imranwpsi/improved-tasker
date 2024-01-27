import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TaskBoard from "./components/task/TaskBoard";

function App() {

    return (
        <>
            <ToastContainer />
            <Header />
            <HeroSection />
            <TaskBoard />
            <Footer />
        </>
    )
}

export default App
