import { Card, CardContent } from './component/ui/card';
import { TaskHeaderSection } from './screen/TaskHeaderSection';
import { TaskFilterTabSection } from './screen/TaskFilterTabSection';
import { TaskListSection } from './screen/TaskListSection';
import NavBar from './screen/navBar';
import axios from "axios";
import { useTask } from "./hooks/useTask";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
    const { taskList, isLoading, error, refreshTasks } = useTask();

    return (
        <main className="flex h-screen w-full flex-col bg-[#f3f1ee]" data-model-id="12:2">
            <NavBar title="FocusBlock-ToDo" />
            <section className="mx-auto flex min-h-0 w-full max-w-360 flex-1 justify-center overflow-hidden px-4 pb-10 pt-6 sm:px-6 lg:px-8">
                <Card className="flex min-h-0 w-full max-w-220 flex-col border-0 bg-transparent shadow-none">
                    <CardContent className="flex min-h-0 flex-1 flex-col items-start gap-4 p-0">
                        <TaskHeaderSection onAdded={refreshTasks} />
                        <TaskFilterTabSection />
                        <TaskListSection taskList={taskList} isLoading={isLoading} error={error} />
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}

export default App
