"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Mail,
    Phone,
    MapPin,
    Globe,
    Linkedin,
    Github,
    Plus,
    Edit,
    Save,
    Star,
    Award,
    BookOpen,
    Briefcase,
    Eye,
    Upload,
    X
} from "lucide-react";

// Profile data - this should come from authentication context or API
const profileData = {
    name: "Your Name",
    email: "your.email@domain.com",
    phone: "+1 (555) 000-0000",
    location: "Your City, State",
    website: "yourwebsite.com",
    linkedin: "linkedin.com/in/yourprofile",
    github: "github.com/yourusername",
    title: "Your Professional Title",
    bio: "Your professional biography and summary of experience.",
    avatar: null, // Will use initials fallback
    skills: [
        { name: "React", level: 90, years: 3 },
        { name: "TypeScript", level: 85, years: 2 },
        { name: "Next.js", level: 80, years: 2 },
        { name: "Tailwind CSS", level: 80, years: 3 },
        { name: "Node.js", level: 75, years: 3 },
        { name: "Python", level: 60, years: 2 }
    ],
    experience: [
        {
            id: 1,
            title: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            startDate: "Jan 2022",
            endDate: "Present",
            description: "Lead frontend development for enterprise applications, mentoring junior developers and implementing best practices."
        },
        {
            id: 2,
            title: "Frontend Developer",
            company: "StartupXYZ",
            location: "Remote",
            startDate: "Jun 2020",
            endDate: "Dec 2021",
            description: "Built responsive web applications using React and modern JavaScript frameworks."
        }
    ],
    education: [
        {
            id: 1,
            degree: "Bachelor of Science in Computer Science",
            school: "University of California, Berkeley",
            year: "2020",
            gpa: "3.8"
        }
    ],
    certifications: [
        {
            id: 1,
            name: "AWS Certified Developer",
            issuer: "Amazon Web Services",
            date: "2023",
            url: "#"
        },
        {
            id: 2,
            name: "React Developer Certification",
            issuer: "Meta",
            date: "2022",
            url: "#"
        }
    ]
};

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(profileData);
    const [newSkill, setNewSkill] = useState("");

    const handleSave = () => {
        setIsEditing(false);
        // Here you would save to backend
    };

    const addSkill = () => {
        if (newSkill.trim()) {
            setProfile(prev => ({
                ...prev,
                skills: [...prev.skills, { name: newSkill, level: 50, years: 1 }]
            }));
            setNewSkill("");
        }
    };

    const removeSkill = (skillName: string) => {
        setProfile(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill.name !== skillName)
        }));
    };

    const getSkillColor = (level: number) => {
        if (level >= 90) return "bg-green-500";
        if (level >= 75) return "bg-blue-500";
        if (level >= 60) return "bg-yellow-500";
        return "bg-gray-500";
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Professional Profile</h1>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column - Basic Info */}
                <div className="space-y-6">
                    {/* Profile Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col items-center text-center">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage src={profile.avatar} alt={profile.name} />
                                    <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <Button variant="outline" size="sm" className="mb-2">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload Photo
                                    </Button>
                                )}
                                <h2 className="text-xl font-semibold">{profile.name}</h2>
                                <p className="text-muted-foreground">{profile.title}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    {isEditing ? (
                                        <Input
                                            value={profile.email}
                                            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                                        />
                                    ) : (
                                        <span className="text-sm">{profile.email}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    {isEditing ? (
                                        <Input
                                            value={profile.phone}
                                            onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                                        />
                                    ) : (
                                        <span className="text-sm">{profile.phone}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    {isEditing ? (
                                        <Input
                                            value={profile.location}
                                            onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                                        />
                                    ) : (
                                        <span className="text-sm">{profile.location}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-muted-foreground" />
                                    {isEditing ? (
                                        <Input
                                            value={profile.website}
                                            onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                                        />
                                    ) : (
                                        <a href={`https://${profile.website}`} className="text-sm text-blue-600 hover:underline">{profile.website}</a>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Linkedin className="h-4 w-4 text-muted-foreground" />
                                    {isEditing ? (
                                        <Input
                                            value={profile.linkedin}
                                            onChange={(e) => setProfile(prev => ({ ...prev, linkedin: e.target.value }))}
                                        />
                                    ) : (
                                        <a href={`https://${profile.linkedin}`} className="text-sm text-blue-600 hover:underline">{profile.linkedin}</a>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Github className="h-4 w-4 text-muted-foreground" />
                                    {isEditing ? (
                                        <Input
                                            value={profile.github}
                                            onChange={(e) => setProfile(prev => ({ ...prev, github: e.target.value }))}
                                        />
                                    ) : (
                                        <a href={`https://${profile.github}`} className="text-sm text-blue-600 hover:underline">{profile.github}</a>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Profile Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Eye className="h-4 w-4 text-blue-600" />
                                    <span className="text-sm">Profile Views</span>
                                </div>
                                <span className="font-semibold">234</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-600" />
                                    <span className="text-sm">Profile Rating</span>
                                </div>
                                <span className="font-semibold">4.8/5</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-green-600" />
                                    <span className="text-sm">Applications</span>
                                </div>
                                <span className="font-semibold">12</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About */}
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isEditing ? (
                                <Textarea
                                    value={profile.bio}
                                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                                    className="min-h-[100px]"
                                />
                            ) : (
                                <p className="text-muted-foreground">{profile.bio}</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Skills & Expertise</CardTitle>
                                {isEditing && (
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add new skill"
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            className="w-32"
                                        />
                                        <Button size="sm" onClick={addSkill}>
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {profile.skills.map((skill) => (
                                    <div key={skill.name} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{skill.name}</span>
                                                <Badge variant="secondary" className="text-xs">
                                                    {skill.years} {skill.years === 1 ? 'year' : 'years'}
                                                </Badge>
                                                {isEditing && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeSkill(skill.name)}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                )}
                                            </div>
                                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <Progress value={skill.level} className={`h-2 ${getSkillColor(skill.level)}`} />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Experience */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5" />
                                Work Experience
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {profile.experience.map((exp) => (
                                    <div key={exp.id} className="border-l-2 border-blue-200 pl-4">
                                        <h4 className="font-semibold">{exp.title}</h4>
                                        <p className="text-blue-600 font-medium">{exp.company}</p>
                                        <p className="text-sm text-muted-foreground">{exp.location}</p>
                                        <p className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                                        <p className="text-sm mt-2">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Education */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Education
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {profile.education.map((edu) => (
                                    <div key={edu.id} className="border-l-2 border-green-200 pl-4">
                                        <h4 className="font-semibold">{edu.degree}</h4>
                                        <p className="text-green-600 font-medium">{edu.school}</p>
                                        <p className="text-sm text-muted-foreground">Graduated: {edu.year}</p>
                                        <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Certifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Certifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                {profile.certifications.map((cert) => (
                                    <div key={cert.id} className="p-4 border rounded-lg">
                                        <h4 className="font-semibold">{cert.name}</h4>
                                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                                        <p className="text-sm text-muted-foreground">Issued: {cert.date}</p>
                                        <Button variant="outline" size="sm" className="mt-2">
                                            View Certificate
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
