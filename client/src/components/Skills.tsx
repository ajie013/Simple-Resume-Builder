import React, { ChangeEvent } from 'react'
import { Input } from './ui/input';
import Skills from '../types/Skills';
import { Button } from './ui/button';
import generator from '../utils/IdGenerator';
import { useSkillsContext } from '../context/SkillsContext';

const SkillsTab = () => {

    const {skills, setSkills} = useSkillsContext();

    const AddSkill = () =>{
        const newSkill : Skills = {
            id: generator(),
            skill: ''
        };

        setSkills(prev => [...prev, newSkill])
    }

    return(
        <div className='space-y-1 flex flex-col'>
            {skills.map((item ,index) =>       
              <SkillItem key={index} item={item} setSkills={setSkills}/>           
            )}
           
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

  
    return(
        <>   
            <Input id='skill' value={item.skill} placeholder="Skill" onChange={handleChange}/>    
        </>
    )
}
export default SkillsTab