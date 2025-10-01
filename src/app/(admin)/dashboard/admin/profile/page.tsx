import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockAdminProfile } from '@/lib/data';
import { Mail, Phone, Building, GraduationCap, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import EditAdminProfileDialog from '@/components/admin/edit-admin-profile-dialog';

export default function AdminProfilePage() {
  const profile = mockAdminProfile;

  return (
    <>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Profile</h1>
          <p className="text-muted-foreground">Your professional and contact information.</p>
        </div>
        <EditAdminProfileDialog profile={profile} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <Avatar className="mx-auto mb-4 h-32 w-32 border-4 border-primary">
                <AvatarImage
                  src={profile.avatarUrl}
                  alt={profile.name}
                  data-ai-hint="man portrait"
                />
                <AvatarFallback className="text-5xl">{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="font-headline text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.title}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building className="h-5 w-5 text-muted-foreground" />
                <span>{profile.office}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap />
                Expertise
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {profile.expertise.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award />
                Awards and Recognitions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.awards.length > 0 ? (
                <ul className="list-inside list-disc space-y-2">
                  {profile.awards.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No awards listed.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
