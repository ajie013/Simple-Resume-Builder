import React, { ChangeEvent } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import generator from '../utils/IdGenerator';
import { useExperienceContext } from '../context/ExperienceContext';
import Experience from '../types/Experience';
import { Textarea } from './ui/textarea';
import { FaTrash } from "react-icons/fa";
import popUpToast from '../lib/toast';


const ExperienceTab = () => {

    const {experience, setExperience} = useExperienceContext();

    const AddExperience = () =>{
        const newExperience : Experience = {
            id: generator(),
            companyName: '',
            year: '',
            title: '',
            description: ''
        };

        popUpToast('Notice', "New experience item has been added.");
        setExperience(prev => [...prev, newExperience])   
    }

    return(
        <div className='space-y-1 flex flex-col relative'>
            <div className="overflow-y-auto h-[300px] overflow-hidden text-center">
                {experience.length == 0 ? (<span className='font-bold text-center tracking-wider'>No Experience</span>) :
                (experience.map((item ,index) => 
                    <>
                        <ExperienceItem key={index} item={item} setExperience={setExperience}/>
                        {/* <div className='w-full bg-gray-200 h-[1px] mt-2 mb-2'></div> */}
                    </>      
                ))}
            
            </div>
           
           
            <Button className='mx-auto mt-2 block' onClick={AddExperience}>Add Experience</Button>
        </div>
    )
}

interface Props {
    item : Experience;
    setExperience: React.Dispatch<React.SetStateAction<Experience[]>>
}
 
const ExperienceItem: React.FC<Props> = ({item,setExperience}) =>{
   
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, id} = event.target;
        setExperience(prev => prev.map((exp) => {
            if(exp.id === item.id){
                return {...exp, [id]: value }
            }
            else{
                return exp; 
            }
        }))
    };

    const deleteExperience = () =>{
        popUpToast('Notice', "Experience item has been deleted.");
        setExperience(prev => prev.filter(exp => exp.id !== item.id ));
    }

    return(
        <div className='cursor-pointer p-2 relative bg-muted rounded mb-2'>
            <FaTrash className='mb-2 text-red-600 text-[0.7rem] cursor-pointer hover:scale-[1.1]' onClick={deleteExperience}/>
            <Input className='mb-1' id='companyName' value={item.companyName} placeholder="Company Name" onChange={handleChange}/>
            <Input className='mb-1' id='title' value={item.title} placeholder="Title (e.g., Software Engineer)" onChange={handleChange}/>
            <Input className='mb-1' id='year' value={item.year} placeholder="Year (e.g., July 2024 - June 2025)" onChange={handleChange}/>
            <Textarea id='description' placeholder='Description' value={item.description} onChange={handleChange}/>    
        </div>
    )
}

export default ExperienceTab