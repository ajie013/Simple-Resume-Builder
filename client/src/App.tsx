
import Builder from './components/Builder'
import { EducationProvider } from './context/EducationContext'
import { ExperienceProvider } from './context/ExperienceContext'
import { PersonalProvider } from './context/PersonalContext'
import { SkillsProvider } from './context/SkillsContext'
import './global.css'
import { Toaster } from 'sonner';

function App() {
   
    return (
        <>
            <SkillsProvider>
                <ExperienceProvider>
                    <EducationProvider>
                        <PersonalProvider>
                            <Builder/>
                            <Toaster />
                        </PersonalProvider>
                    </EducationProvider>     
                </ExperienceProvider>
            </SkillsProvider>
        </>
    )
}

export default App
