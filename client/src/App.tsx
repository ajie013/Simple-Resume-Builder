
import Builder from './components/Builder'
import { EducationProvider } from './context/EducationContext'
import { ExperienceProvider } from './context/ExperienceContext'
import { PersonalProvider } from './context/PersonalContext'
import './global.css'

function App() {
   
    return (
        <>
            <ExperienceProvider>
                <EducationProvider>
                    <PersonalProvider>
                        <Builder/>
                    </PersonalProvider>
                </EducationProvider>     
            </ExperienceProvider>
        </>
    )
}

export default App
