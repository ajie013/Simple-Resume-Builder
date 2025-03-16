import React, { ChangeEvent } from 'react'
import { Input } from './ui/input';
import Skills from '../types/Skills';
import { Button } from './ui/button';
import generator from '../utils/IdGenerator';
import { useSkillsContext } from '../context/SkillsContext';
import { FaTrash } from "react-icons/fa";
import popUpToast from '../lib/toast';

const SkillsTab = () => {

    const {skills, setSkills} = useSkillsContext();

    const AddSkill = () =>{
        const newSkill : Skills = {
            id: generator(),
            skill: ''
        };

        setSkills(prev => [...prev, newSkill]);
        popUpToast('Notice', "New skill item has been added.");
    }

    return(
        <div className='space-y-1 flex flex-col'>
            <div className="overflow-auto max-h-[300px] text-center">
                {skills.length === 0 ? (<span className='font-bold text-center tracking-wider'>No Skills</span>) : (skills.map((item ,index) =>       
                    <SkillItem key={index} item={item} setSkills={setSkills}/>           
                ))}  
            </div>
           
            <Button className='mx-auto mt-2 block' onClick={AddSkill}>Add Skill</Button>  
        </div>
    )
}

interface Props {
    item : Skills;
    setSkills: React.Dispatch<React.SetStateAction<Skills[]>>
}
 
const SkillItem: React.FC<Props> = ({item, setSkills}) =>{
   
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, id} = event.target;
        setSkills(prev => prev.map((skill) => {
            if(skill.id === item.id){
                return {...skill, [id]: value }
            }
            else{
                return skill; 
            }
        }))
    };

    const DeleteSkill = () =>{
        popUpToast('Notice', "Skill item has been deleted.");
        setSkills(prev => prev.filter(skill => item.id !== skill.id));
    }
  
    return(
        <div className='flex justify-center items-center gap-2 mb-1'> 
            <Input id='skill' value={item.skill} placeholder="Skill" onChange={handleChange}/>
            <FaTrash className='text-red-600 text-[0.7rem]  cursor-pointer hover:scale-[1.1]' onClick={DeleteSkill}/>
        </div>
    )
}

export default SkillsTab