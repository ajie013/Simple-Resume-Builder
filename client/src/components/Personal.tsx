import React, { ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { usePersonalInfoContext } from '../context/PersonalContext';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Button } from './ui/button';

const PersonalTab = () => {
    const { personalInfo, setPersonalInfo } = usePersonalInfoContext();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setPersonalInfo(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className='space-y-1 flex flex-col'>
            <Input id='fullName' type='text' placeholder='Full Name' value={personalInfo.fullName} onChange={handleChange} />
            <Input id='address' type='text' placeholder='Address' value={personalInfo.address} onChange={handleChange} />
            <Input id='email' type='email' placeholder='Email' value={personalInfo.email} onChange={handleChange} />
            <Input id='contact' type='text' placeholder='Contact Number' value={personalInfo.contact} onChange={handleChange} />
            <Textarea id='summary' placeholder='Summary' className='max-h-[200px]' value={personalInfo.summary} onChange={handleChange} />    
        </div>
    );
};

export default PersonalTab;