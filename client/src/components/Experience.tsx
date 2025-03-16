import React, { ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import generator from '../utils/IdGenerator';
import { useExperienceContext } from '../context/ExperienceContext';
import Experience from '../types/Experience';
import { Textarea } from './ui/textarea';
import { FaTrash } from 'react-icons/fa';
import popUpToast from '../lib/toast';

const ExperienceTab = () => {
    const { experience, setExperience } = useExperienceContext();

    const AddExperience = () => {
        const newExperience: Experience = {
            id: generator(),
            companyName: '',
            year: '',
            title: '',
            description: '',
        };

        popUpToast('Notice', 'New experience item has been added.');
        setExperience((prev) => [...prev, newExperience]);
    };

    return (
        <div className='flex flex-col'>
            <div className='overflow-auto max-h-[300px] w-full'>
                {experience.length === 0 ? (
                    <span className='font-bold text-center tracking-wider block'>
                        No Experience
                    </span>
                ) : (
                    experience.map((item) => (
                        <ExperienceItem key={item.id} item={item} setExperience={setExperience} />
                    ))
                )}
            </div>

            <Button className='mx-auto mt-4' onClick={AddExperience}>
                Add Experience
            </Button>
        </div>
    );
};

interface Props {
    item: Experience;
    setExperience: React.Dispatch<React.SetStateAction<Experience[]>>;
}

const ExperienceItem: React.FC<Props> = ({ item, setExperience }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, id } = event.target;
        setExperience((prev) =>
            prev.map((exp) => {
                if (exp.id === item.id) {
                    return { ...exp, [id]: value };
                } else {
                    return exp;
                }
            })
        );
    };

    const deleteExperience = () => {
        popUpToast('Notice', 'Experience item has been deleted.');
        setExperience((prev) => prev.filter((exp) => exp.id !== item.id));
    };

    return (
        <div className='p-2 relative bg-muted rounded mb-2'>
          
            <Input
                className='mb-1 w-full'
                id='companyName'
                value={item.companyName}
                placeholder='Company Name'
                onChange={handleChange}
            />
            <Input
                className='mb-1 w-full'
                id='title'
                value={item.title}
                placeholder='Title (e.g., Software Engineer)'
                onChange={handleChange}
            />
            <Input
                className='mb-1 w-full'
                id='year'
                value={item.year}
                placeholder='Year (e.g., July 2024 - June 2025)'
                onChange={handleChange}
            />
            <Textarea
                className='w-full'
                id='description'
                placeholder='Description'
                value={item.description}
                onChange={handleChange}
            />
              <FaTrash
                className='text-red-600 text-[0.7rem] mt-2 cursor-pointer hover:scale-[1.1]'
                onClick={deleteExperience}
            />
        </div>
    );
};

export default ExperienceTab;