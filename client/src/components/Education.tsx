import React, { ChangeEvent } from 'react';
import { useEducationContext } from '../context/EducationContext';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Education from '../types/Education';
import generator from '../utils/IdGenerator';
import { FaTrash } from 'react-icons/fa';
import popUpToast from '../lib/toast';

const EducationTab = () => {
    const { education, setEducation } = useEducationContext();

    const AddEducation = () => {
        const newEducation: Education = {
            id: generator(),
            schoolName: '',
            year: '',
            degree: '',
            level: '',
        };

        setEducation((prev) => [...prev, newEducation]);
        popUpToast('Notice', 'New education item has been added.');
    };

    return (
        <div className='flex flex-col'>
            <div className='overflow-auto  max-h-[300px] w-full'>
                {education.length === 0 ? (
                    <span className='font-bold text-center tracking-wider block'>
                        No Education
                    </span>
                ) : (
                    education.map((item) => (
                        <>
                            <EducationItem
                                item={item}
                                setEducation={setEducation}
                            />
                        </>
                    ))
                )}
            </div>

            <Button className='mx-auto mt-4' onClick={AddEducation}>
                Add Education
            </Button>
        </div>
    );
};

interface Props {
  
    item: Education;
    setEducation: React.Dispatch<React.SetStateAction<Education[]>>;
}

const EducationItem: React.FC<Props> = ({  item, setEducation }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, id } = event.target;
        setEducation((prev) =>
            prev.map((educ) => {
                if (educ.id === item.id) {
                    return { ...educ, [id]: value };
                } else {
                    return educ;
                }
            })
        );
    };

    const DeleteEducation = () => {
        popUpToast('Notice', 'Education item has been deleted.');
        setEducation((prev) => prev.filter((educ) => educ.id !== item.id));
    };

    return (
        <div className='p-2 relative bg-muted rounded mb-2'>
           
            <Input
                className='mb-1 w-full'
                id='level'
                value={item.level}
                placeholder='Educational Level (e.g., Primary Level)'
                onChange={handleChange}
            />
            <Input
                className='mb-1 w-full'
                id='schoolName'
                value={item.schoolName}
                placeholder='School Name'
                onChange={handleChange}
            />
            <Input
                className='mb-1 w-full'
                id='year'
                value={item.year}
                placeholder='Year (e.g., 2010 - 2016)'
                onChange={handleChange}
            />
            <Input
                className='w-full'
                id='degree'
                value={item.degree}
                placeholder='Degree (optional)'
                onChange={handleChange}
            />

            <FaTrash
                className=' text-red-600 text-[0.7rem] mt-2 cursor-pointer hover:scale-[1.1]'
                onClick={DeleteEducation}
            />
        </div>
    );
};

export default EducationTab;