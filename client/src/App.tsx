
import Builder from './components/Builder'
import { EducationProvider } from './context/EducationContext'
import { ExperienceProvider } from './context/ExperienceContext'
import { PersonalProvider } from './context/PersonalContext'
import { SkillsProvider } from './context/SkillsContext'
import './global.css'

function App() {
   
    return (
        <>
            <SkillsProvider>
                <ExperienceProvider>
                    <EducationProvider>
                        <PersonalProvider>
                            <Builder/>
                        </PersonalProvider>
                    </EducationProvider>     
                </ExperienceProvider>
            </SkillsProvider>
        </>
    )
}

export default App
