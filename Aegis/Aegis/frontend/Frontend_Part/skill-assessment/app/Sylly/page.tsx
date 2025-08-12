// app/Sylly/page.tsx
"use client";

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card"; 
import { ChatSylly } from '../components/ChatSylly'; 

const Sylly: React.FC = () => {
    const [showChat, setShowChat] = useState(false); 
    
    return (
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28"> {/* Responsive padding */}
            <Card className="bg-background border-none shadow-none">
                <CardContent className="flex flex-col-reverse md:flex-row items-center justify-between py-10">
                    {/* Text Section */}
                    <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0 md:pr-10">
                        {/* <h2 className="text-3xl font-bold text-foreground mb-4">Meet Sylly</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            Sylly is your AI-powered study buddy, designed to assist you in your academic journey. With Sylly, you can ask questions, get study tips, and receive personalized recommendations to enhance your learning experience. Whether you're preparing for exams or seeking clarification on complex topics, Sylly is here to help you succeed.
                        </p> */}
                        {/* Button to show ChatSylly directly */}
 <button
  onClick={() => setShowChat(true)}
  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition duration-300"
>
  Chat with Dumbo
</button>

                    </div>

                    {/* Image Section */}
                    {/* <div className="md:w-1/2 flex justify-center">
                        <img 
                            src="sylly.png" 
                            alt="sylly" 
                            className="w-64 h-auto rounded-xl shadow-lg object-cover"
                        />
                    </div> */}
                </CardContent>
            </Card>

            {/* Chat Component */}
            {showChat && <ChatSylly />}
        </div>
    );
};

export default Sylly;