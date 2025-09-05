import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Heart, 
  MessageSquare, 
  Settings, 
  Plus, 
  TrendingUp,
  Eye,
  Calendar,
  User
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { t } = useTranslation();
  const { role } = useParams<{ role: string }>();
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirection si le rôle ne correspond pas à l’URL
  useEffect(() => {
    if (profile && role && profile.role !== role) {
      const correctPath = `/dashboard/${profile.role}`;
      navigate(correctPath, { replace: true });
    }
  }, [profile, role, navigate]);

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "You have been signed out successfully.",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  // --- Mock data UI (ancien front) ---
  const stats = [
    { title: "Active Listings", value: "3", change: "+1", icon: Home, color: "text-blue-600" },
    { title: "Total Views", value: "1,234", change: "+12%", icon: Eye, color: "text-green-600" },
    { title: "Messages", value: "8", change: "+2", icon: MessageSquare, color: "text-purple-600" },
    { title: "Favorites", value: "15", change: "+3", icon: Heart, color: "text-red-600" }
  ];

  const recentActivity = [
    { id: 1, type: "message", title: "New message from John Smith", description: "Interested in your downtown apartment", time: "2 hours ago", icon: MessageSquare },
    { id: 2, type: "view", title: "Property viewed", description: "Your villa listing was viewed 5 times", time: "4 hours ago", icon: Eye },
    { id: 3, type: "favorite", title: "Property favorited", description: "Someone added your apartment to favorites", time: "1 day ago", icon: Heart }
  ];

  const myProperties = [
    { id: 1, title: "Modern Downtown Apartment", price: "$2,500", status: "Active", views: 234, messages: 12, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop" },
    { id: 2, title: "Cozy Family Villa", price: "$4,200", status: "Active", views: 156, messages: 8, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop" },
    { id: 3, title: "Studio Near University", price: "$1,200", status: "Rented", views: 89, messages: 3, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop" }
  ];

  if (!profile || !role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {t('dashboard.welcome')}, {profile.display_name || user?.email}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your properties and track your real estate journey
            </p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSignOut} variant="outline">
              Sign Out
            </Button>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Property</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{stat.change}</span> from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="properties" className="space-y-4">
              <TabsList>
                <TabsTrigger value="properties">{t('dashboard.properties')}</TabsTrigger>
                <TabsTrigger value="favorites">{t('dashboard.favorites')}</TabsTrigger>
                <TabsTrigger value="messages">{t('dashboard.messages')}</TabsTrigger>
              </TabsList>

              {/* Properties */}
              <TabsContent value="properties" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Properties</CardTitle>
                    <CardDescription>
                      Manage and track your property listings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {myProperties.map((property) => (
                      <div key={property.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{property.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {property.price}/month
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{property.views}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{property.messages}</span>
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={property.status === 'Active' ? 'default' : 'secondary'}
                            className={property.status === 'Active' ? 'bg-success text-success-foreground' : ''}
                          >
                            {property.status}
                          </Badge>
                          <div className="mt-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Favorites */}
              <TabsContent value="favorites" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Properties</CardTitle>
                    <CardDescription>
                      Properties you've saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No favorites yet</h3>
                      <p className="text-muted-foreground">
                        Start browsing properties to add them to your favorites
                      </p>
                      <Button className="mt-4" asChild>
                        <a href="/explore">Browse Properties</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Messages */}
              <TabsContent value="messages" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>
                      Communicate with potential tenants and landlords
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">No messages yet</h3>
                      <p className="text-muted-foreground">
                        Your conversations will appear here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{profile.display_name || "John Doe"}</h3>
                    <p className="text-sm text-muted-foreground">{profile.email || user?.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  {t('dashboard.settings')}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Property
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Viewing
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
