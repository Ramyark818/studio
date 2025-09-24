'use client';
import PageHeader from '@/components/common/page-header';
import {
  Briefcase,
  Code,
  Heart,
  Linkedin,
  Github,
  Award,
  BookOpen,
  Users,
  FilePenLine,
  Mail,
  Phone,
  Home,
  Star,
  User,
  GraduationCap,
  Globe,
  MessageCircle,
  Download,
  Share2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockPortfolio } from '@/lib/data';
import PortfolioInfoCard from '@/components/portfolio/portfolio-info-card';
import EditPortfolioDialog from '@/components/portfolio/edit-portfolio-dialog';
import { Button } from '@/components/ui/button';
import { generatePortfolioPdf } from '@/lib/reports';
import toast from 'react-hot-toast';

export default function PortfolioPage() {
  const portfolio = mockPortfolio;

  const handleShare = async () => {
    const shareData = {
      title: `${portfolio.user.name}'s Portfolio`,
      text: `Check out ${portfolio.user.name}'s professional portfolio.`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Portfolio link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Could not share portfolio.');
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            Portfolio
          </h1>
          <p className="text-muted-foreground">
            A comprehensive showcase of academic and professional achievements.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => generatePortfolioPdf(portfolio)}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Download Resume</span>
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share Portfolio</span>
            </Button>
            <EditPortfolioDialog portfolio={portfolio} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Avatar className="h-32 w-32 mx-auto mb-4 border-4 border-primary">
                <AvatarImage
                  src={portfolio.user.avatarUrl}
                  alt={portfolio.user.name}
                  data-ai-hint="man portrait"
                />
                <AvatarFallback className="text-5xl bg-primary-foreground text-primary">
                  {portfolio.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold font-headline">
                {portfolio.user.name}
              </h2>
              <p className="text-muted-foreground">{portfolio.user.major}</p>
              <p className="text-sm text-muted-foreground">{portfolio.user.degree}</p>
            </CardContent>
          </Card>
          <PortfolioInfoCard
            icon={Users}
            title="Contact & Links"
            items={portfolio.contact}
            renderItem={(item) => (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                {item.type === 'LinkedIn' && <Linkedin className="h-4 w-4" />}
                {item.type === 'GitHub' && <Github className="h-4 w-4" />}
                {item.type === 'Email' && <Mail className="h-4 w-4" />}
                {item.type === 'Phone' && <Phone className="h-4 w-4" />}
                {item.type === 'Address' && <Home className="h-4 w-4" />}
                {item.type === 'Website' && <Globe className="h-4 w-4" />}
                {item.type === 'Other' && <User className="h-4 w-4" />}
                <span>{item.handle}</span>
              </a>
            )}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart />
                Hobbies
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {portfolio.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </CardContent>
          </Card>

            <PortfolioInfoCard
                icon={MessageCircle}
                title="Languages"
                items={portfolio.languages}
                renderItem={(lang) => (
                    <div className="flex justify-between w-full">
                        <span>{lang.name}</span>
                        <span className="text-muted-foreground">{lang.proficiency}</span>
                    </div>
                )}
            />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <User />
                    Summary
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{portfolio.summary}</p>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <GraduationCap />
                    Education
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {portfolio.education.map((edu, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-semibold">{edu.institution}</h3>
                            <p className="text-xs text-muted-foreground">{edu.period}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.details}</p>
                    </div>
                ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolio.skills.map((skillCategory) => (
                <div key={skillCategory.category}>
                    <h3 className="font-semibold text-sm mb-2">{skillCategory.category}</h3>
                    <div className="flex flex-wrap gap-2">
                    {skillCategory.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                        {skill}
                        </Badge>
                    ))}
                    </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <PortfolioInfoCard
            icon={Star}
            title="Certifications"
            items={portfolio.certifications}
          />
          <PortfolioInfoCard
            icon={Award}
            title="Awards"
            items={portfolio.awards}
          />
          <PortfolioInfoCard
            icon={Briefcase}
            title="Projects"
            items={portfolio.projects}
          />
          <PortfolioInfoCard
            icon={BookOpen}
            title="Publications"
            items={portfolio.publications}
          />
          <PortfolioInfoCard
            icon={Users}
            title="Voluntary Work"
            items={portfolio.voluntaryWork}
          />
        </div>
      </div>
    </>
  );
}
