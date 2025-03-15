import React, { createContext, ReactNode, useContext, useState } from 'react'
import Education from '../types/Education';


interface EducationContextType{
    education: Education[];
    setEducation: React.Dispatch<React.SetStateAction<Education[]>>
}

const EducationContext = createContext<EducationContextType | null>(null);

const EducationProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [education, setEducation] = useState<Education[]>([]);

    return (
        <EducationContext.Provider value={{education, setEducation}}>
            {children}
        </EducationContext.Provider>
    )
}

const useEducationContext = () =>{
    const context = useContext(EducationContext)

    if (context === null) {
        throw new Error('useEducationContext must be used within a EducationProvider');
    }

    return context;
}

export  {EducationProvider, useEducationContext}