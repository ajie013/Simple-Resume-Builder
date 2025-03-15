import React, { createContext, ReactNode, useContext, useState } from 'react'
import Experience from '../types/Experience';


interface ExperienceContextType{
    experience: Experience[];
    setExperience: React.Dispatch<React.SetStateAction<Experience[]>>
}

const ExperienceContext = createContext<ExperienceContextType | null>(null);

const ExperienceProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [experience, setExperience] = useState<Experience[]>([]);

    return (
        <ExperienceContext.Provider value={{experience, setExperience}}>
            {children}
        </ExperienceContext.Provider>
    )
}

const useExperienceContext = () =>{
    const context = useContext(ExperienceContext)

    if (context === null) {
        throw new Error('useExperienceContext must be used within a ExperienceProvider');
    }

    return context;
}

export  {ExperienceProvider, useExperienceContext}