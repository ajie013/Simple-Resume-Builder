import React, { ChangeEvent } from 'react'
import { useEducationContext } from '../context/EducationContext'
import { Input } from './ui/input';
import { Button } from './ui/button';
import Education from '../types/Education';
import generator from '../utils/IdGenerator';
import { FaTrash } from "react-icons/fa";
import popUpToast from '../lib/toast';

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
           <div className="overflow-y-auto h-[300px] overflow-hidden text-center"> {/* Set a fixed height and enable scrolling */}
                {education.length === 0 ? (
                    <span className='font-bold text-center tracking-wider'>No Education</span>
                ) : (
                    education.map((item, index) => (
                        <>
                            <EducationItem index={index} item={item} setEducation={setEducation} />
                            {/* <div className='w-full bg-gray-200 h-[1px] mt-2 mb-2'></div> */}
                        </>
                    ))
                )}
            </div>
           
           
            <Button className='mx-auto mt-2 block' onClick={AddEducation}>Add Education</Button>
           
        </div>
    )
}

interface Props {
    index: number;
    item : Education;
    setEducation: React.Dispatch<React.SetStateAction<Education[]>>
}
 
const EducationItem: React.FC<Props> = ({index,item,setEducation}) =>{
   
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
    
    const DeleteEducation = () =>{
        popUpToast('Notice', "Education item has been deleted.");
        setEducation(prev => prev.filter(educ => educ.id !== item.id));
    }

  
    return(
        <div className='cursor-pointer p-2 relative bg-muted rounded mb-2'>
            <FaTrash className='mb-2 text-red-600 text-[0.7rem] cursor-pointer hover:scale-[1.1]' onClick={DeleteEducation}/>
            <Input className='mb-1' id='level' value={item.level} placeholder="Educational Level (e.g., Primary Level)" onChange={handleChange}/>
            <Input className='mb-1' id='schoolName' value={item.schoolName} placeholder="School Name" onChange={handleChange}/>
            <Input className='mb-1' id='year' value={item.year} placeholder="Year (e.g., 2010 - 2016)" onChange={handleChange}/>
            <Input id='degree' value={item.degree} placeholder="Degree (optional)" onChange={handleChange}/>    
        </div>
    )
}
export default EducationTab