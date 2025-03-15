import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { lazy, Suspense } from "react"
import PersonalTab from "./Personal";
import {jsPDF} from 'jspdf'
import { Button } from "./ui/button";
import { useEducationContext } from "../context/EducationContext";
import { useExperienceContext } from "../context/ExperienceContext";
import { usePersonalInfoContext } from "../context/PersonalContext";
import { useSkillsContext } from "../context/SkillsContext";

const Education = lazy(() => import('./Education'));
const Experience = lazy(() => import('./Experience'));
const Skills = lazy(() => import('./Skills'));

function Builder() {
    const {education} = useEducationContext();
    const {experience} = useExperienceContext();
    const {personalInfo} = usePersonalInfoContext();
    const {skills} = useSkillsContext();
    const doc = new jsPDF();
    const centerText = (text: string) =>{

        const textWidth = doc.getTextWidth(text);
        const pageWidth = doc.internal.pageSize.getWidth();
        const xOffset = (pageWidth - textWidth) / 2;
        return xOffset
    }

    const GenerateResume = () =>{
       
        let yOffset = 20; 
       
        // --- Personal Information Section ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text(personalInfo.fullName, centerText(personalInfo.fullName), yOffset);
        yOffset += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`${personalInfo.address} | ${personalInfo.contact} | ${personalInfo.email}`, centerText(`${personalInfo.address} | ${personalInfo.contact} | ${personalInfo.email}`), yOffset);
        yOffset += 20; // Add more space after personal info
      
        // --- Summary Section ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Summary", 20, yOffset);
        yOffset += 5;
        doc.line(20, yOffset, 190, yOffset); 
        yOffset += 10;
      
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(personalInfo.summary || "No summary provided.", 20, yOffset, { maxWidth: 170 });
        
        yOffset += 15; 

        // --- Education Section ---
      
        if (education.length > 0) {

            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Education", 20, yOffset);
            yOffset += 5;
            doc.line(20, yOffset, 190, yOffset); 
            yOffset += 10;
    
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");

            education.forEach((edu) => {
              
                doc.text(edu.level, 20, yOffset, { maxWidth: 170 });
                yOffset += 5; 
                doc.text(edu.schoolName, 20, yOffset, { maxWidth: 170 });
                yOffset += 5; 
                doc.text(edu.year, 20, yOffset, { maxWidth: 170 });
                yOffset += 5; 
                if (edu.degree) {
                    doc.text(edu.degree, 20, yOffset, { maxWidth: 170 });
                }
                yOffset += 5;
            });

            yOffset += 15;

        }

       
         // --- Experience Section ---    
        if (experience.length > 0) {

            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Experience", 20, yOffset);
            yOffset += 5;
            doc.line(20, yOffset, 190, yOffset); 
            yOffset += 10;
    
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");

            experience.forEach((exp) => {
               
                doc.text(`${exp.companyName} | ${exp.year}`, 20, yOffset, { maxWidth: 170 });
                yOffset += 5;
                doc.text(exp.title, 20, yOffset, { maxWidth: 170 });
                yOffset += 5;
                doc.text(exp.description, 20, yOffset, { maxWidth: 170 });
                yOffset += 5; 
            });

            yOffset += 15;
        }

         // --- Skills Section ---    
        if (skills.length > 0) {

            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Technical Skills", 20, yOffset);
            yOffset += 5;
            doc.line(20, yOffset, 190, yOffset); 
            yOffset += 10;
    
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");

            skills.forEach((skill) => {
               
                doc.text(`• ${skill.skill}`, 20, yOffset, { maxWidth: 170 });
                yOffset += 5;
               
            });

            yOffset += 15;
        }

        doc.save('Sampe-Resume.pdf')

    };

    return (
        <div className='h-[100vh] flex items-start justify-center  flex-col'>
            <div className="w-full">
                <Tabs defaultValue="personal" className="max-w-[600px] mx-auto h-[410px]  w-[100%] border-gray-300 rounded border p-2">
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
                        <Suspense fallback={<div>Loading...</div>}>
                            <Experience/>
                        </Suspense>         
                    </TabsContent>
                    <TabsContent value="education">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Education/>
                        </Suspense>    
                    </TabsContent>
                    <TabsContent value="skills">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Skills/>
                        </Suspense>  
                    </TabsContent>
                </Tabs>
            </div>
           
            <Button className="block mx-auto mt-5" onClick={GenerateResume}>Generate Resume</Button>
        </div>
    )
}

export default Builder