import {
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  Globe,
  LineChart,
  Users,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

export default function AnalyticsDashboard() {
  const [hostedSites, setHostedSites] = useState<
    Array<{
      id: string;
      stats: any;
      url: string;
    }>
  >([]);

  useEffect(() => {
    fetchAllHostedSites();
  }, []);

  const fetchAllHostedSites = async () => {
    try {
      // First, get list of hosted sites from public/hosted directory
      const response = await fetch("http://localhost:5000/hosted-sites");
      const sites = await response.json();

      // Then fetch stats for each site
      const sitesWithStats = await Promise.all(
        sites.map(async (siteId: string) => {
          const statsResponse = await fetch(
            `http://localhost:5000/hosted/${siteId}/stats`
          );
          const stats = await statsResponse.json();
          return {
            id: siteId,
            stats,
            url: `http://localhost:5000/hosted/${siteId}`,
          };
        })
      );

      setHostedSites(sitesWithStats);
    } catch (error) {
      console.error("Failed to fetch hosted sites:", error);
    }
  };

  const countries = [
    { name: "United States", visitors: 12453 },
    { name: "Canada", visitors: 8765 },
    { name: "United Kingdom", visitors: 5432 },
    { name: "Germany", visitors: 4321 },
    { name: "France", visitors: 3210 },
  ];

  const pages = [
    { path: "/", views: 32453 },
    { path: "/products", views: 18765 },
    { path: "/blog", views: 12432 },
    { path: "/about", views: 8210 },
    { path: "/contact", views: 5198 },
  ];

  const referrers = [
    { name: "google.com", visitors: 12453 },
    { name: "facebook.com", visitors: 8765 },
    { name: "twitter.com", visitors: 5432 },
    { name: "linkedin.com", visitors: 4321 },
    { name: "direct", visitors: 3210 },
  ];

  const browsers = [
    { name: "Chrome", percentage: 68.4 },
    { name: "Safari", percentage: 18.7 },
    { name: "Firefox", percentage: 7.2 },
    { name: "Edge", percentage: 3.1 },
    { name: "Other", percentage: 2.6 },
  ];

  const devices = [
    { name: "Desktop", percentage: 72.4 },
    { name: "Mobile", percentage: 24.1 },
    { name: "Tablet", percentage: 3.5 },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <LineChart className="h-6 w-6" />
          <span>WebStats</span>
        </a>
        <nav className="hidden flex-1 items-center gap-6 md:flex">
          <a href="#" className="text-sm font-medium">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground">
            Reports
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground">
            Settings
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                example.com
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>example.com</DropdownMenuItem>
              <DropdownMenuItem>blog.example.com</DropdownMenuItem>
              <DropdownMenuItem>store.example.com</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          <h1 className="flex-1 text-2xl font-semibold">Analytics</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" />
              Last 7 days
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>


        {/* Add Hosted Websites Section */}
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Hosted Websites</CardTitle>
              <CardDescription>
                Overview of all your hosted websites and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Website ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Total Views
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Unique Visitors
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Bounce Rate
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Avg. Time
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hostedSites.map((site) => (
                      <tr
                        key={site.id}
                        className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                      >
                        <td className="p-4 align-middle">{site.id}</td>
                        <td className="p-4 align-middle">
                          {site.stats.views || 0}
                        </td>
                        <td className="p-4 align-middle">
                          {site.stats.unique_visitors?.length || 0}
                        </td>
                        <td className="p-4 align-middle">
                          {site.stats.bounce_rate || 0}%
                        </td>
                        <td className="p-4 align-middle">
                          {site.stats.avg_time || 0}s
                        </td>
                        <td className="p-4 align-middle">
                          <a
                            href={`${site.url}/index.html`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Site
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function VisitorChart() {
  return (
    <div className="h-[200px]">
      <svg viewBox="0 0 500 200" className="w-full h-full">
        <path
          d="M 0,100 C 150,50 300,150 500,100"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        <path
          d="M 0,100 C 150,50 300,150 500,100 L 500,200 L 0,200 Z"
          fill="hsl(var(--primary)/0.1)"
          stroke="none"
        />
        {/* Data points */}
        <circle cx="0" cy="100" r="4" fill="hsl(var(--primary))" />
        <circle cx="71" cy="79" r="4" fill="hsl(var(--primary))" />
        <circle cx="142" cy="65" r="4" fill="hsl(var(--primary))" />
        <circle cx="213" cy="75" r="4" fill="hsl(var(--primary))" />
        <circle cx="284" cy="100" r="4" fill="hsl(var(--primary))" />
        <circle cx="355" cy="125" r="4" fill="hsl(var(--primary))" />
        <circle cx="426" cy="110" r="4" fill="hsl(var(--primary))" />
        <circle cx="500" cy="100" r="4" fill="hsl(var(--primary))" />

        {/* X-axis labels */}
        <text x="0" y="220" fontSize="10" textAnchor="middle">
          Mon
        </text>
        <text x="71" y="220" fontSize="10" textAnchor="middle">
          Tue
        </text>
        <text x="142" y="220" fontSize="10" textAnchor="middle">
          Wed
        </text>
        <text x="213" y="220" fontSize="10" textAnchor="middle">
          Thu
        </text>
        <text x="284" y="220" fontSize="10" textAnchor="middle">
          Fri
        </text>
        <text x="355" y="220" fontSize="10" textAnchor="middle">
          Sat
        </text>
        <text x="426" y="220" fontSize="10" textAnchor="middle">
          Sun
        </text>
        <text x="500" y="220" fontSize="10" textAnchor="middle">
          Mon
        </text>
      </svg>
    </div>
  );
}

function PageViewChart() {
  return (
    <div className="h-[200px]">
      <svg viewBox="0 0 500 200" className="w-full h-full">
        <path
          d="M 0,120 C 100,80 200,40 300,60 S 400,100 500,70"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        <path
          d="M 0,120 C 100,80 200,40 300,60 S 400,100 500,70 L 500,200 L 0,200 Z"
          fill="hsl(var(--primary)/0.1)"
          stroke="none"
        />
        {/* Data points */}
        <circle cx="0" cy="120" r="4" fill="hsl(var(--primary))" />
        <circle cx="71" cy="100" r="4" fill="hsl(var(--primary))" />
        <circle cx="142" cy="80" r="4" fill="hsl(var(--primary))" />
        <circle cx="213" cy="60" r="4" fill="hsl(var(--primary))" />
        <circle cx="284" cy="50" r="4" fill="hsl(var(--primary))" />
        <circle cx="355" cy="60" r="4" fill="hsl(var(--primary))" />
        <circle cx="426" cy="80" r="4" fill="hsl(var(--primary))" />
        <circle cx="500" cy="70" r="4" fill="hsl(var(--primary))" />

        {/* X-axis labels */}
        <text x="0" y="220" fontSize="10" textAnchor="middle">
          Mon
        </text>
        <text x="71" y="220" fontSize="10" textAnchor="middle">
          Tue
        </text>
        <text x="142" y="220" fontSize="10" textAnchor="middle">
          Wed
        </text>
        <text x="213" y="220" fontSize="10" textAnchor="middle">
          Thu
        </text>
        <text x="284" y="220" fontSize="10" textAnchor="middle">
          Fri
        </text>
        <text x="355" y="220" fontSize="10" textAnchor="middle">
          Sat
        </text>
        <text x="426" y="220" fontSize="10" textAnchor="middle">
          Sun
        </text>
        <text x="500" y="220" fontSize="10" textAnchor="middle">
          Mon
        </text>
      </svg>
    </div>
  );
}

function BounceRateChart() {
  return (
    <div className="h-[200px]">
      <svg viewBox="0 0 500 200" className="w-full h-full">
        <path
          d="M 0,80 C 100,100 200,120 300,90 S 400,60 500,70"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        <path
          d="M 0,80 C 100,100 200,120 300,90 S 400,60 500,70 L 500,200 L 0,200 Z"
          fill="hsl(var(--primary)/0.1)"
          stroke="none"
        />
        {/* Data points */}
        <circle cx="0" cy="80" r="4" fill="hsl(var(--primary))" />
        <circle cx="71" cy="90" r="4" fill="hsl(var(--primary))" />
        <circle cx="142" cy="100" r="4" fill="hsl(var(--primary))" />
        <circle cx="213" cy="110" r="4" fill="hsl(var(--primary))" />
        <circle cx="284" cy="100" r="4" fill="hsl(var(--primary))" />
        <circle cx="355" cy="80" r="4" fill="hsl(var(--primary))" />
        <circle cx="426" cy="70" r="4" fill="hsl(var(--primary))" />
        <circle cx="500" cy="70" r="4" fill="hsl(var(--primary))" />

        {/* X-axis labels */}
        <text x="0" y="220" fontSize="10" textAnchor="middle">
          Mon
        </text>
        <text x="71" y="220" fontSize="10" textAnchor="middle">
          Tue
        </text>
        <text x="142" y="220" fontSize="10" textAnchor="middle">
          Wed
        </text>
        <text x="213" y="220" fontSize="10" textAnchor="middle">
          Thu
        </text>
        <text x="284" y="220" fontSize="10" textAnchor="middle">
          Fri
        </text>
        <text x="355" y="220" fontSize="10" textAnchor="middle">
          Sat
        </text>
        <text x="426" y="220" fontSize="10" textAnchor="middle">
          Sun
        </text>
        <text x="500" y="220" fontSize="10" textAnchor="middle">
          Mon
        </text>
      </svg>
    </div>
  );
}

const topPagesByViews = [
  { path: "/", views: 32453 },
  { path: "/products", views: 18765 },
  { path: "/blog", views: 12432 },
  { path: "/about", views: 8210 },
  { path: "/contact", views: 5198 },
];

const pageViewDetails = [
  {
    path: "/",
    views: 32453,
    uniqueViews: 24321,
    avgTime: "1m 45s",
    exitRate: 22.4,
  },
  {
    path: "/products",
    views: 18765,
    uniqueViews: 14532,
    avgTime: "2m 12s",
    exitRate: 18.7,
  },
  {
    path: "/blog",
    views: 12432,
    uniqueViews: 9876,
    avgTime: "3m 05s",
    exitRate: 15.2,
  },
  {
    path: "/about",
    views: 8210,
    uniqueViews: 6543,
    avgTime: "1m 10s",
    exitRate: 32.1,
  },
  {
    path: "/contact",
    views: 5198,
    uniqueViews: 4321,
    avgTime: "0m 58s",
    exitRate: 45.6,
  },
  {
    path: "/pricing",
    views: 4987,
    uniqueViews: 3987,
    avgTime: "1m 32s",
    exitRate: 28.3,
  },
  {
    path: "/blog/latest-post",
    views: 3654,
    uniqueViews: 2987,
    avgTime: "4m 12s",
    exitRate: 12.8,
  },
];

const bounceRateBySource = [
  { name: "social-media.com", rate: 68.4 },
  { name: "email-campaign.com", rate: 42.1 },
  { name: "partner-site.com", rate: 38.7 },
  { name: "search-engine.com", rate: 31.2 },
  { name: "direct", rate: 28.5 },
];

const bounceRateByPage = [
  {
    path: "/landing-page-1",
    visitors: 4321,
    rate: 72.4,
    avgTimeBeforeBounce: "0m 32s",
  },
  {
    path: "/contact",
    visitors: 3210,
    rate: 65.8,
    avgTimeBeforeBounce: "0m 45s",
  },
  {
    path: "/blog/article-3",
    visitors: 2198,
    rate: 58.3,
    avgTimeBeforeBounce: "1m 12s",
  },
  {
    path: "/pricing",
    visitors: 1876,
    rate: 45.2,
    avgTimeBeforeBounce: "0m 58s",
  },
  { path: "/about", visitors: 1543, rate: 42.7, avgTimeBeforeBounce: "1m 05s" },
  { path: "/", visitors: 12453, rate: 32.1, avgTimeBeforeBounce: "0m 48s" },
  {
    path: "/products",
    visitors: 8765,
    rate: 28.4,
    avgTimeBeforeBounce: "1m 10s",
  },
];
