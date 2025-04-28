import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SiteStats {
  views: number;
  unique_visitors: string[];
  browsers: { [key: string]: number };
  devices: { [key: string]: number };
  referrers: { [key: string]: number };
  bounce_rate: number;
  avg_time: number;
  last_updated: string;
}

export default function Stats({ siteId }: { siteId: string }) {
  const [stats, setStats] = useState<SiteStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/hosted/${siteId}/stats`
        );
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [siteId]);

  if (!stats) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Website Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Page Views Card */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Views</h3>
          <p className="text-4xl font-bold text-green-600">{stats.views}</p>
          <p className="text-sm text-gray-500 mt-2">
            Unique Visitors: {stats.unique_visitors.length}
          </p>
        </Card>

        {/* Browser Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Browser Distribution</h3>
          {Object.entries(stats.browsers).map(([browser, count]) => (
            <div key={browser} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm">{browser}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
              <Progress value={(count / stats.views) * 100} />
            </div>
          ))}
        </Card>

        {/* Device Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Device Types</h3>
          {Object.entries(stats.devices).map(([device, count]) => (
            <div key={device} className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm">{device}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
              <Progress value={(count / stats.views) * 100} />
            </div>
          ))}
        </Card>

        {/* Referrers */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top Referrers</h3>
          <div className="space-y-3">
            {Object.entries(stats.referrers).map(([referrer, count]) => (
              <div key={referrer} className="flex justify-between">
                <span className="text-sm truncate">{referrer}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Last Updated */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
          <p className="text-sm text-gray-500">
            {new Date(stats.last_updated).toLocaleString()}
          </p>
        </Card>
      </div>
    </div>
  );
}
