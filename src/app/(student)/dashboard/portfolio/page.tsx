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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockPortfolio } from '@/lib/data';
import PortfolioInfoCard from '@/components/portfolio/portfolio-info-card';
import EditPortfolioDialog from '@/components/portfolio/edit-portfolio-dialog';

export default function PortfolioPage() {
  const portfolio = mockPortfolio;

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
        <EditPortfolioDialog portfolio={portfolio} />
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
                <span>{item.handle}</span>
              </a>
            )}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart />
                Interests
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
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code />
                Professional Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
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
