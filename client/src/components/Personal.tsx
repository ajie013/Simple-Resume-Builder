import { ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { usePersonalInfoContext } from '../context/PersonalContext';
import 'react-phone-number-input/style.css';


const PersonalTab = () => {
    const { personalInfo, setPersonalInfo } = usePersonalInfoContext();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setPersonalInfo(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className='space-y-1 flex flex-col'>
            <Input 
                id='fullName' 
                type='text' 
                placeholder='Full Name' 
                value={personalInfo.fullName} 
                onChange={handleChange} 
                required 
                className='w-full'
            />
            <Input 
                id='address' 
                type='text' 
                placeholder='Address' 
                value={personalInfo.address} 
                onChange={handleChange} 
                className='w-full'
            />
            <Input 
                id='email' 
                type='email' 
                placeholder='Email' 
                value={personalInfo.email} 
                onChange={handleChange} 
                required 
                className='w-full'
            />
            <Input 
                id='contact' 
                type='text' 
                placeholder='Contact Number' 
                value={personalInfo.contact} 
                onChange={handleChange} 
                required 
                className='w-full'
            />
            <Textarea 
                id='summary' 
                placeholder='Summary' 
                className='min-h-[130px] max-h-[150px] w-full' 
                value={personalInfo.summary} 
                onChange={handleChange} 
                required 
            />    
        </div>
    );
};

export default PersonalTab;