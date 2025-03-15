import React, { createContext, useContext, ReactNode, useState } from 'react';
import Personal from '../types/Personal';

interface PersonalContextType {
  personalInfo: Personal;
  setPersonalInfo: React.Dispatch<React.SetStateAction<Personal>>
}

const PersonalContext = createContext<PersonalContextType | null>(null);

const PersonalProvider: React.FC<{children: ReactNode}> = ({children}) => {

  const [personalInfo, setPersonalInfo] = useState<Personal>({
    fullName: '',
    address: '',
    contact: '',
    email: '',
    summary: ''
  })

  return (
    <PersonalContext.Provider value={{personalInfo, setPersonalInfo}}>
      {children}
    </PersonalContext.Provider>
  );
}

const usePersonalInfoContext = () => {
  const context = useContext(PersonalContext);
  if (context === null) {
    throw new Error('useBasicInfo must be used within a BasicInfoProvider');
  }
  return context;
}

export { PersonalProvider, usePersonalInfoContext };