//import { useState } from 'react'
import { Card, CardContent } from './component/ui/card';
import { TaskHeaderSection } from './screen/TaskHeaderSection';
import { TaskFilterTabSection } from './screen/TaskFilterTabSection';
import NavBar from './screen/navBar';

function App() {
 

  return (
    <main className="w-full bg-[#f3f1ee]" data-model-id="12:2">
      <NavBar title="FocusBlock-ToDo" />
      <section className="mx-auto flex w-full max-w-360 justify-center px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <Card className="w-full max-w-220 border-0 bg-transparent shadow-none">
          <CardContent className="flex flex-col items-start gap-4 p-0">
            <TaskHeaderSection />
            <TaskFilterTabSection />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

export default App
