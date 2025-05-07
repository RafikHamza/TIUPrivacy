import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Key, BookOpen, Award, Briefcase, Building } from 'lucide-react';
import PhishingSimulator from '@/components/games/PhishingSimulator';
import PasswordStrengthGame from '@/components/games/PasswordStrengthGame';
import SecurityQuiz from '@/components/games/SecurityQuiz';
import { GameProgressDisplay, useGameProgress } from '@/components/games/GameProgress';

export default function ActivitiesPage() {
  const [activeTab, setActiveTab] = useState('phishing');
  const { updateGameScore } = useGameProgress();

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Interactive Security Activities</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn essential cybersecurity skills through interactive activities, simulations, and quizzes.
          Practice identifying threats and strengthen your digital safety knowledge for business environments.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-5 w-full max-w-3xl">
                <TabsTrigger value="phishing" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Phishing Simulator</span>
                  <span className="sm:hidden">Phishing</span>
                </TabsTrigger>
                <TabsTrigger value="password" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span className="hidden sm:inline">Password Strength</span>
                  <span className="sm:hidden">Password</span>
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">Security Quiz</span>
                  <span className="sm:hidden">Quiz</span>
                </TabsTrigger>
                <TabsTrigger value="workplace" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="hidden sm:inline">Workplace Security</span>
                  <span className="sm:hidden">Workplace</span>
                </TabsTrigger>
                <TabsTrigger value="business" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span className="hidden sm:inline">Digital Business</span>
                  <span className="sm:hidden">Business</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="phishing">
              <div className="space-y-8">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      About Phishing Attacks
                    </CardTitle>
                    <CardDescription>
                      Learn to identify and protect yourself from phishing attempts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">What is Phishing?</h3>
                      <p>
                        Phishing is a type of cyber attack where attackers disguise themselves as trustworthy entities
                        to trick victims into revealing sensitive information such as passwords, credit card numbers,
                        or personal data. These attacks often come through emails, text messages, or fake websites.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Common Phishing Red Flags:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Suspicious sender email addresses (check the domain carefully)</li>
                        <li>Generic greetings like "Dear Customer" instead of your name</li>
                        <li>Urgent requests or threats to create pressure</li>
                        <li>Spelling and grammar errors</li>
                        <li>Suspicious links or attachments</li>
                        <li>Requests for sensitive information</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <PhishingSimulator />
              </div>
            </TabsContent>
            
            <TabsContent value="password">
              <div className="space-y-8">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5 text-primary" />
                      Password Security
                    </CardTitle>
                    <CardDescription>
                      Learn the importance of strong passwords and best practices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Why Password Security Matters</h3>
                      <p>
                        Passwords are often the first line of defense against unauthorized access to your accounts and personal information.
                        Weak passwords can be easily guessed or cracked by attackers, potentially leading to identity theft, financial loss,
                        or privacy breaches.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Password Best Practices:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Use long passwords (at least 12 characters)</li>
                        <li>Include a mix of uppercase and lowercase letters, numbers, and special characters</li>
                        <li>Avoid using personal information (birthdays, names, etc.)</li>
                        <li>Use a unique password for each account</li>
                        <li>Consider using a reputable password manager</li>
                        <li>Enable two-factor authentication (2FA) whenever possible</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <PasswordStrengthGame />
              </div>
            </TabsContent>
            
            <TabsContent value="quiz">
              <div className="space-y-8">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Cybersecurity Fundamentals
                    </CardTitle>
                    <CardDescription>
                      Test your knowledge of essential cybersecurity concepts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Why Cybersecurity Awareness Matters</h3>
                      <p>
                        In today's digital world, cybersecurity awareness is essential for everyone. Understanding 
                        basic security concepts and best practices helps protect your personal information, financial 
                        assets, and digital identity from various cyber threats.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Key Areas of Cybersecurity:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Authentication & Access Control:</strong> Managing how users prove their identity and access resources</li>
                        <li><strong>Data Protection:</strong> Safeguarding sensitive information through encryption and proper handling</li>
                        <li><strong>Threat Recognition:</strong> Identifying potential security threats like phishing, malware, and social engineering</li>
                        <li><strong>Safe Online Behavior:</strong> Practicing caution with downloads, website visits, and information sharing</li>
                        <li><strong>Software Maintenance:</strong> Keeping systems and applications updated with security patches</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <SecurityQuiz />
              </div>
            </TabsContent>
            
            <TabsContent value="workplace">
              <div className="space-y-8">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Workplace Security Awareness
                    </CardTitle>
                    <CardDescription>
                      Understand security best practices in professional environments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Workplace Security Fundamentals</h3>
                      <p>
                        Security in the workplace extends beyond digital practices to include physical security,
                        information handling, and social engineering awareness. Employees are often the first line
                        of defense against various security threats targeting organizational assets.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Essential Workplace Security Practices:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Clean Desk Policy:</strong> Keep sensitive documents secure when away from your workspace</li>
                        <li><strong>Screen Locking:</strong> Always lock your computer when leaving it unattended</li>
                        <li><strong>Visitor Management:</strong> Follow protocols for escorting and identifying visitors</li>
                        <li><strong>Data Classification:</strong> Understand how to handle different types of sensitive information</li>
                        <li><strong>Incident Reporting:</strong> Know the proper channels for reporting security concerns</li>
                        <li><strong>Badge/Access Control:</strong> Never share access credentials or allow tailgating</li>
                      </ul>
                    </div>
                    
                    <div className="mt-6 p-4 border rounded-lg bg-amber-50 border-amber-200">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Interactive Scenario
                      </h3>
                      <p className="mt-2">
                        You notice a colleague from another department taking pictures of sensitive documents in your office area. 
                        What is the most appropriate action to take?
                      </p>
                      
                      <div className="mt-4 space-y-2">
                        <div onClick={() => updateGameScore('workplaceSecurity', 0)} className="p-3 border rounded-md hover:bg-background cursor-pointer transition-colors">
                          Ignore it as it's probably work-related since they are a colleague
                        </div>
                        <div onClick={() => updateGameScore('workplaceSecurity', 0)} className="p-3 border rounded-md hover:bg-background cursor-pointer transition-colors">
                          Directly confront them and demand they delete the photos
                        </div>
                        <div onClick={() => updateGameScore('workplaceSecurity', 5)} className="p-3 border rounded-md hover:bg-background cursor-pointer transition-colors">
                          Politely inquire about their need for the documents and report to security if unsatisfied with the answer
                        </div>
                        <div onClick={() => updateGameScore('workplaceSecurity', 0)} className="p-3 border rounded-md hover:bg-background cursor-pointer transition-colors">
                          Take pictures of them taking pictures as evidence before reporting
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="business">
              <div className="space-y-8">
                <Card className="max-w-4xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-primary" />
                      Privacy and Security for Digital Business
                    </CardTitle>
                    <CardDescription>
                      Understanding critical privacy and security considerations in digital business environments
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Digital Business Privacy Concerns</h3>
                      <p>
                        Digital businesses collect, process, and store vast amounts of customer and operational data.
                        Implementing proper privacy measures is not just a regulatory requirement but also a competitive advantage
                        that builds customer trust and protects valuable business assets.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Key Privacy and Security Considerations:</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Data Minimization:</strong> Only collect data necessary for business purposes</li>
                        <li><strong>Privacy by Design:</strong> Incorporate privacy into the development of systems and processes</li>
                        <li><strong>Access Controls:</strong> Implement role-based access to sensitive information</li>
                        <li><strong>Third-party Risk:</strong> Assess security practices of vendors and partners</li>
                        <li><strong>Breach Response:</strong> Develop and practice incident response procedures</li>
                        <li><strong>Compliance:</strong> Stay updated with regulations like GDPR, CCPA, and industry standards</li>
                      </ul>
                    </div>
                    
                    <div className="mt-6 p-4 border rounded-lg bg-amber-50 border-amber-200">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Business Privacy Scenario
                      </h3>
                      <p className="mt-2">
                        Your digital business is launching a new customer analytics feature. Which of the following approaches 
                        best aligns with privacy best practices?
                      </p>
                      
                      <div className="mt-4 space-y-2">
                        <div onClick={() => updateGameScore('businessPrivacy', 0)} className="p-3 border rounded-md hover:bg-background cursor-pointer transition-colors">
                          Collect all possible customer data to maximize insights, storing it indefinitely for future use
                        </div>
                        <div onClick={() => updateGameScore('businessPrivacy', 0)} className="p-3 border rounded-md hover:bg-background cursor-pointer transition-colors">
                          Use pre-checked consent boxes that enable all data collection by default
                        </div>
                        <div onClick={() => updateGameScore('businessPrivacy', 5)} className="p-3 border rounded-md hover:bg-background cursor-pointer transition-colors">
                          Implement granular consent options, data minimization, and clear privacy notices about how data will be used
                        </div>
                        <div onClick={() => updateGameScore('businessPrivacy', 0)} className="p-3 border rounded-md hover:bg-background cursor-pointer transition-colors">
                          Share analytical insights with partners without explicit consent as long as you anonymize personal data
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-1">
          <GameProgressDisplay />
        </div>
      </div>
    </div>
  );
}