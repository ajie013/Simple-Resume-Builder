import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { lazy, Suspense } from "react"
import PersonalTab from "./Personal";

const Education = lazy(() => import('./Education'));
const Experience = lazy(() => import('./Experience'));
const Skills = lazy(() => import('./Skills'));

function Builder() {
  return (
    <div className='h-[100vh] flex items-start justify-center  p-4'>
        <Tabs defaultValue="personal" className="max-w-[600px]  w-[100%] p-2 border-gray-300 rounded border overflow-auto">
            <TabsList>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">    
                 <PersonalTab/>
            </TabsContent>
            <TabsContent value="experience">
                <Suspense fallback={<div>Loading...</div>}>
                    <Experience/>
                </Suspense>         
            </TabsContent>
            <TabsContent value="education">
                <Suspense fallback={<div>Loading...</div>}>
                    <Education/>
                </Suspense>    
            </TabsContent>
            <TabsContent value="skills">
                <Suspense fallback={<div>Loading...</div>}>
                    <Skills/>
                </Suspense>  
            </TabsContent>
        </Tabs>
    </div>
  
  )
}

export default Builder