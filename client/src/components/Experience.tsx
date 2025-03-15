import React, { ChangeEvent } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import generator from '../utils/IdGenerator';
import { useExperienceContext } from '../context/ExperienceContext';
import Experience from '../types/Experience';
import { Textarea } from './ui/textarea';

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

        setExperience(prev => [...prev, newExperience])
    }

    return(
        <div className='space-y-1 flex flex-col'>
            {experience.map((item ,index) => 
                <>
                    <ExperienceItem key={index} item={item} setExperience={setExperience}/>
                    <div className='w-full bg-gray-200 h-[1px] mt-2 mb-2'></div>
                </>      
            )}
           
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

    return(
        <>    
            <Input id='companyName' value={item.companyName} placeholder="Company Name" onChange={handleChange}/>
            <Input id='title' value={item.title} placeholder="Title (e.g., Software Engineer" onChange={handleChange}/>
            <Input id='year' value={item.year} placeholder="Year (e.g., July 2024 - June 2025)" onChange={handleChange}/>
            <Textarea id='description' placeholder='Description' value={item.description} onChange={handleChange}/>    
        </>
    )
}

export default ExperienceTab