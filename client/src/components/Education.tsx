import React, { ChangeEvent } from 'react'
import { useEducationContext } from '../context/EducationContext'
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Button } from './ui/button';
import Education from '../types/Education';
import generator from '../utils/IdGenerator';

const EducationTab = () => {

    const {education, setEducation} = useEducationContext();

    const AddEducation = () =>{
        const newEducation : Education = {
            id: generator(),
            schoolName: '',
            year: '',
            degree: '',
            level: ''
        };

        setEducation(prev => [...prev, newEducation])
    }

    return(
        <div className='space-y-1 flex flex-col'>
            {education.map((item ,index) => 
                <>
                    <EducationItem key={index} item={item} setEducation={setEducation}/>
                    <div className='w-full bg-gray-200 h-[1px] mt-2 mb-2'></div>
                </>      
            )}
           
            <Button className='mx-auto mt-2 block' onClick={AddEducation}>Add Education</Button>
           
        </div>
    )
}

interface Props {
    item : Education;
    setEducation: React.Dispatch<React.SetStateAction<Education[]>>
}
 
const EducationItem: React.FC<Props> = ({item,setEducation}) =>{
   
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, id} = event.target;
        setEducation(prev => prev.map((educ) => {
            if(educ.id === item.id){
                return {...educ, [id]: value }
            }
            else{
                return educ; 
            }
        }))
    };

  
    return(
        <>
            <Input id='level' value={item.level} placeholder="Educational Level (e.g., Primary Level)" onChange={handleChange}/>
            <Input id='schoolName' value={item.schoolName} placeholder="School Name" onChange={handleChange}/>
            <Input id='year' value={item.year} placeholder="Year (e.g., 2010 - 2016)" onChange={handleChange}/>
            <Input id='degree' value={item.degree} placeholder="Degree (optional)" onChange={handleChange}/>    
        </>
    )
}
export default EducationTab