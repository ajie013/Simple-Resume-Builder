
import { createContext, ReactNode, useContext, useState } from "react"
import Skills from "../types/Skills"



interface SkillsContextType{
    skills: Skills[];
    setSkills: React.Dispatch<React.SetStateAction<Skills[]>>
}

const SkillsContext = createContext<SkillsContextType | null>(null);

const SkillsProvider: React.FC<{children: ReactNode}> = ({children}) =>{
    const [skills, setSkills] = useState<Skills[]>([])
    return(
        <SkillsContext.Provider value={{skills, setSkills}}>
            {children}
        </SkillsContext.Provider>
    )
}

const useSkillsContext = () =>{
    const context = useContext(SkillsContext);
    
    if (context === null) {
        throw new Error('useSkillsContext must be used within a SkillsProvider');
    }

    return context;
}

export {SkillsProvider,useSkillsContext}