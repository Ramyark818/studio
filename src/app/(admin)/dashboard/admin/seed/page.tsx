'use client';
import { useState } from 'react';
import PageHeader from '@/components/common/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import apiClient from '@/lib/api-client';
import { Database, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

export default function SeedDatabasePage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setError(null);
    setSeedResult(null);

    try {
      const response = await apiClient.seedDatabase();
      
      if (response.success) {
        setSeedResult(response.data);
      } else {
        setError(response.message || 'Failed to seed database');
      }
    } catch (err) {
      setError('Network error occurred while seeding database');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Database Management"
        description="Initialize the database with demo data for testing and development."
      />
      
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Seed Database with Demo Data
            </CardTitle>
            <CardDescription>
              This will populate the database with sample students, faculty, activities, and placements for testing purposes.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Warning:</strong> This action will clear all existing data and replace it with demo data. 
                This operation cannot be undone.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h4 className="font-semibold">Demo data includes:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>5 sample students with complete profiles</li>
                <li>2 faculty members with qualifications and expertise</li>
                <li>8 student activities (approved, pending, and rejected)</li>
                <li>3 courses with enrollment data</li>
                <li>2 active placement opportunities</li>
                <li>Admin, faculty, and student user accounts</li>
              </ul>
            </div>

            {seedResult && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p><strong>Database seeded successfully!</strong></p>
                    <div className="space-y-1 text-sm">
                      <p><strong>Login Credentials:</strong></p>
                      <p>Admin: admin@sankalan.com / admin123</p>
                      <p>Faculty: faculty@sankalan.com / faculty123</p>
                      <p>Student: student@sankalan.com / student123</p>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={handleSeedDatabase} 
              disabled={isSeeding}
              className="w-full"
            >
              {isSeeding ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Seeding Database...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Seed Database
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}