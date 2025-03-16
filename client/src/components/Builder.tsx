import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { lazy, Suspense, useState } from "react"
import PersonalTab from "./Personal";
import {jsPDF} from 'jspdf'
import { Button } from "./ui/button";
import { useEducationContext } from "../context/EducationContext";
import { useExperienceContext } from "../context/ExperienceContext";
import { usePersonalInfoContext } from "../context/PersonalContext";
import { useSkillsContext } from "../context/SkillsContext";
import Loader from "./Loader";
import popUpToast from "../lib/toast";

const Education = lazy(() => import('./Education'));
const Experience = lazy(() => import('./Experience'));
const Skills = lazy(() => import('./Skills'));

function Builder() {
    const {education} = useEducationContext();
    const {experience} = useExperienceContext();
    const {personalInfo} = usePersonalInfoContext();
    const {skills} = useSkillsContext();

    const [isLoading, setIsLoading] = useState(false);
    const doc = new jsPDF();
   
    const centerText = (text: string) =>{
       
        const textWidth = doc.getTextWidth(text);
        const pageWidth = doc.internal.pageSize.getWidth();
        const xOffset = (pageWidth - textWidth) / 2;
        return xOffset
    }

    const isValidPersonalInfo = () =>{
        if(!personalInfo.address || !personalInfo.email || !personalInfo.contact || !personalInfo.fullName || !personalInfo.summary){
            popUpToast('Oops!', "Fill out all required in the Personal Tab.")
            return false;
        }

        return true
    }

    const isValidEducation = () => {
        if(education.length === 0){
            return true;
        }
        else{
            const isValidInputs = education.every((item) => {
                if(item.schoolName || item.level || item.year){
                    return true
                }
                else{
                    return false
                }
            });

            if(!isValidInputs){
                popUpToast('Oops!', "Fill out all required information in the Education Tab.");
            }

            return isValidInputs
        }
    }

    const isValidExperience = () =>{
        if(experience.length === 0){
            return true;
        }
        else{
            const isValidInputs = experience.every((item) => {
                if(item.companyName || item.description || item.title || item.year){
                    return true;
                }
                else{
                    return false;
                }
            });

            if(!isValidInputs){
                popUpToast('Oops!', "Fill out all required information in the Experience Tab.")
            }

            return isValidInputs;
        }
    }

    const isValidSkills = () =>{
        if(skills.length === 0){
            return true;
        }
        else{
            const isValidInputs = skills.every((item) =>{
                if(item.skill){
                    return true;
                }
                else{
                    return false;
                }
            });

            if(!isValidInputs){
                popUpToast('Oops!', "Fill out all required information in the Skills Tab.")
            }

            return isValidInputs;
        }
    };

    const GenerateResume = () => {
        if (!isValidPersonalInfo() || !isValidEducation() || !isValidExperience() || !isValidSkills()) return;
    
        setIsLoading(prev => !prev);
    
       
        const pageHeight = doc.internal.pageSize.height;
        let yOffset = 20;
    
        const checkPageLimit = (requiredSpace: number) => {
            if (yOffset + requiredSpace > pageHeight - 20) {  
                doc.addPage();
                yOffset = 20; 
            }
        };
    
        // --- Personal Information ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text(personalInfo.fullName, centerText(personalInfo.fullName), yOffset);
        yOffset += 10;
    
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`${personalInfo.address} | ${personalInfo.contact} | ${personalInfo.email}`, centerText(`${personalInfo.address} | ${personalInfo.contact} | ${personalInfo.email}`), yOffset);
        yOffset += 15;
    
        // --- Summary Section ---
        checkPageLimit(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Summary", 20, yOffset);
        yOffset += 5;
        doc.setLineWidth(1.5);
        doc.line(20, yOffset, 190, yOffset);
        yOffset += 10;
    
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
    
        let summaryLines = doc.splitTextToSize(personalInfo.summary || "No summary provided.", 170);
        checkPageLimit(summaryLines.length * 6);
        doc.text(summaryLines, 20, yOffset);
        yOffset += summaryLines.length * 6 + 10;
    
        // --- Education Section ---
        if (education.length > 0) {
            checkPageLimit(30);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Education", 20, yOffset);
            yOffset += 5;
            doc.line(20, yOffset, 190, yOffset);
            yOffset += 10;
    
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
    
            education.forEach((edu) => {
                let eduLines = [
                    edu.level,
                    edu.schoolName,
                    edu.year,
                    edu.degree || ""
                ].filter(Boolean);
    
                checkPageLimit(eduLines.length * 6 + 10);
                doc.text(eduLines, 20, yOffset);
                yOffset += eduLines.length * 6 + 5;
            });
    
            yOffset += 10;
        }
    
        // --- Experience Section ---
        if (experience.length > 0) {
            checkPageLimit(30);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Experience", 20, yOffset);
            yOffset += 5;
            doc.line(20, yOffset, 190, yOffset);
            yOffset += 10;
    
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
    
            experience.forEach((exp) => {
                let expLines = [
                    `${exp.companyName} | ${exp.year}`,
                    exp.title,
                    ...doc.splitTextToSize(exp.description, 170)
                ];
    
                checkPageLimit(expLines.length * 6 + 10);
                doc.text(expLines, 20, yOffset);
                yOffset += expLines.length * 6 + 5;
            });
    
            yOffset += 10;
        }
    
        // --- Skills Section ---
        if (skills.length > 0) {
            checkPageLimit(30);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Technical Skills", 20, yOffset);
            yOffset += 5;
            doc.line(20, yOffset, 190, yOffset);
            yOffset += 10;
    
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
    
            skills.forEach((skill) => {
                checkPageLimit(10);
                doc.text(`• ${skill.skill}`, 20, yOffset);
                yOffset += 5;
            });
    
            yOffset += 15;
        }
    
        setTimeout(() => {
            doc.save("Sample-Resume.pdf");
            setIsLoading(prev => !prev);
        }, 2000);
    };
    

    return (
        <div className='h-screen flex items-start justify-center flex-col p-1'>
            <div className="w-full">
                <h1 className="font-extrabold tracking-wider text-[1rem] md:text-[2rem] mb-3 text-center">Simple Resume Builder</h1>
                <Tabs defaultValue="personal" className="max-w-[600px] mx-auto h-[410px]  w-full border-gray-300 rounded border p-2">
                    <TabsList>
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" >    
                        <PersonalTab/>
                    </TabsContent>
                    <TabsContent value="experience">
                        <Suspense fallback={<Loader loaderStyle="h-8 w-8" contStyle="flex justify-center"/>}>
                            <Experience/>
                        </Suspense>         
                    </TabsContent>
                    <TabsContent value="education">
                        <Suspense fallback={<Loader loaderStyle="h-8 w-8" contStyle="flex justify-center"/>}>
                            <Education/>
                        </Suspense>    
                    </TabsContent>
                    <TabsContent value="skills">
                        <Suspense fallback={ <Loader loaderStyle="h-8 w-8" contStyle="flex justify-center"/>}>
                            <Skills/>
                        </Suspense>  
                    </TabsContent>
                </Tabs>
            </div>
           
            <Button className="block mx-auto mt-5"  disabled={isLoading} onClick={GenerateResume}> {isLoading && <Loader loaderStyle="h-5 w-5"/>} Generate Resume</Button>
        </div>
    )
}

export default Builder


