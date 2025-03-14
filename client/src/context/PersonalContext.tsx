import React, { createContext, useContext, ReactNode, useState } from 'react';

interface PersonalType {
  fullName: string;
  contact: string;
  address: string;
  email: string;
  summary: string;
}

interface PersonalContextType {
  personalInfo: PersonalType;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalType>>
}

const PersonalContext = createContext<PersonalContextType | null>(null);

const PersonalProvider: React.FC<{children: ReactNode}> = ({children}) => {

  const [personalInfo, setPersonalInfo] = useState<PersonalType>({
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