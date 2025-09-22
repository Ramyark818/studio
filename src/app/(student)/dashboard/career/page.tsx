'use client';
import { useState, useTransition } from 'react';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockPortfolio } from '@/lib/data';
import { Plus, X, Wand2, LoaderCircle, Lightbulb } from 'lucide-react';
import { getCareerSuggestions, type CareerSuggestion } from '@/ai/flows/career-guide-flow';

export default function CareerPage() {
  const [interests, setInterests] = useState<string[]>(mockPortfolio.interests);
  const [skills, setSkills] = useState<string[]>(mockPortfolio.skills);
  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [suggestions, setSuggestions] = useState<CareerSuggestion[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleAddItem = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    resetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (item.trim()) {
      setter((prev) => [...prev, item.trim()]);
      resetter('');
    }
  };

  const handleRemoveItem = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGetSuggestions = () => {
    startTransition(async () => {
      const result = await getCareerSuggestions({ interests, skills });
      setSuggestions(result.suggestions);
    });
  };

  return (
    <>
      <PageHeader
        title="AI Career Guide"
        description="Get personalized career suggestions based on your interests and skills."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Skills & Interests</CardTitle>
            <CardDescription>
              Your skills and interests from your profile are pre-filled. Add or remove them to tailor your results.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Your Interests</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1.5">
                    {interest}
                    <button onClick={() => handleRemoveItem(index, setInterests)} className="hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest..."
                  onKeyDown={(e) => e.key === 'Enter' && handleAddItem(newInterest, setInterests, setNewInterest)}
                />
                <Button size="icon" variant="outline" onClick={() => handleAddItem(newInterest, setInterests, setNewInterest)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Your Skills</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill, index) => (
                  <Badge key={index} className="flex items-center gap-1.5">
                    {skill}
                    <button onClick={() => handleRemoveItem(index, setSkills)} className="hover:text-destructive-foreground/80">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  onKeyDown={(e) => e.key === 'Enter' && handleAddItem(newSkill, setSkills, setNewSkill)}
                />
                <Button size="icon" variant="outline" onClick={() => handleAddItem(newSkill, setSkills, setNewSkill)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Button onClick={handleGetSuggestions} disabled={isPending}>
              {isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Getting Suggestions...
                </>
              ) : (
                'Get Suggestions'
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Career Suggestions</CardTitle>
            <CardDescription>AI-powered recommendations will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <LoaderCircle className="h-12 w-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Generating your personalized career path...</p>
              </div>
            ) : suggestions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <Wand2 className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Review your skills and interests to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/50">
                    <h3 className="font-semibold flex items-center gap-2 mb-1">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      {suggestion.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
