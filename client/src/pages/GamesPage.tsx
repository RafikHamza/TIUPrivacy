import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Key, BookOpen, Award } from 'lucide-react';
import PhishingSimulator from '@/components/games/PhishingSimulator';
import PasswordStrengthGame from '@/components/games/PasswordStrengthGame';
import SecurityQuiz from '@/components/games/SecurityQuiz';
import { GameProgressDisplay, useGameProgress } from '@/components/games/GameProgress';

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState('phishing');
  const { updateGameScore } = useGameProgress();

  return (
    <div className="container py-8 space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Interactive Cybersecurity Training</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn essential cybersecurity skills through interactive games, simulations, and quizzes.
          Practice identifying threats and strengthen your digital safety knowledge.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-3 w-full max-w-xl">
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
          </Tabs>
        </div>
        
        <div className="md:col-span-1">
          <GameProgressDisplay />
        </div>
      </div>
    </div>
  );
}