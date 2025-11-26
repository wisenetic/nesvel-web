import { useMemo } from "react";

import { useList, useTranslation } from "@refinedev/core";
import {
  AlertTriangle,
  Bell,
  Camera,
  CheckCircle2,
  CircleDot,
  CloudFog,
  Flame,
  Video,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageHeader } from "@/core/components/shared/page-header";
import { StatsOverview } from "@/core/components/shared/stats/StatsOverview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/core/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import type { Detection } from "@/modules/detection/types";

const TOTAL_CAMERAS = 10;
const ACTIVE_CAMERAS = 9;

const detectionTrendData = [
  { time: "00:00", fire: 0, smoke: 1, person: 2 },
  { time: "02:00", fire: 1, smoke: 1, person: 3 },
  { time: "04:00", fire: 0, smoke: 2, person: 2 },
  { time: "06:00", fire: 1, smoke: 1, person: 4 },
  { time: "08:00", fire: 2, smoke: 3, person: 5 },
  { time: "10:00", fire: 3, smoke: 4, person: 7 },
  { time: "12:00", fire: 4, smoke: 5, person: 6 },
  { time: "14:00", fire: 3, smoke: 4, person: 5 },
  { time: "16:00", fire: 2, smoke: 3, person: 4 },
  { time: "18:00", fire: 1, smoke: 2, person: 3 },
  { time: "20:00", fire: 1, smoke: 1, person: 2 },
  { time: "22:00", fire: 0, smoke: 1, person: 1 },
];

const weeklyHeatmapData = [
  { day: "Sun", night: 3, morning: 5, afternoon: 7, evening: 4 },
  { day: "Mon", night: 2, morning: 4, afternoon: 6, evening: 5 },
  { day: "Tue", night: 1, morning: 3, afternoon: 5, evening: 4 },
  { day: "Wed", night: 2, morning: 4, afternoon: 6, evening: 5 },
  { day: "Thu", night: 3, morning: 5, afternoon: 8, evening: 6 },
  { day: "Fri", night: 4, morning: 6, afternoon: 9, evening: 7 },
  { day: "Sat", night: 3, morning: 4, afternoon: 7, evening: 5 },
];

// Match detection card colors:
// person: sky, smoke: amber, fire: red, vehicle: violet
const DETECTION_TYPE_COLORS: Record<string, string> = {
  person: "rgb(2 132 199)", // sky-600
  smoke: "rgb(217 119 6)", // amber-600
  vehicle: "rgb(124 58 237)", // violet-600
  fire: "rgb(220 38 38)", // red-600
};

// Status/severity colors: info (blue), warning (yellow), critical (red)
const SEVERITY_COLORS: Record<string, string> = {
  critical: "rgb(220 38 38)", // red-600
  warning: "rgb(217 119 6)", // amber-600
  info: "rgb(37 99 235)", // blue-600
};

const cameraStatusData = [
  { status: "online", value: ACTIVE_CAMERAS },
  { status: "error", value: TOTAL_CAMERAS - ACTIVE_CAMERAS },
];

const detectionTrendConfig: ChartConfig = {
  fire: {
    label: "Fire",
    color: "var(--chart-1)",
  },
  smoke: {
    label: "Smoke",
    color: "var(--chart-2)",
  },
  person: {
    label: "Person",
    color: "var(--chart-3)",
  },
};

const cameraStatusChartConfig: ChartConfig = {
  online: {
    label: "Online",
    // success/online: green
    color: "rgb(22 163 74)", // emerald-600
  },
  error: {
    label: "Error",
    // error: red
    color: "rgb(220 38 38)", // red-600
  },
};

export default function DashboardListPage() {
  const { translate } = useTranslation();

  const { result: detectionsResult, query: detectionsQuery } =
    useList<Detection>({
      resource: "detections",
    });

  const detections = useMemo(
    () => detectionsResult?.data ?? [],
    [detectionsResult],
  );

  const summaryStats = useMemo(() => {
    const totalDetections = detections.length;
    const fireDetections = detections.filter((d) => d.type === "fire").length;
    const smokeDetections = detections.filter((d) => d.type === "smoke").length;
    const unacknowledged = detections.filter((d) => d.status === "new").length;

    return {
      totalDetections,
      fireDetections,
      smokeDetections,
      unacknowledged,
    };
  }, [detections]);

  const topDetectionTypes = useMemo(() => {
    const counts: Record<string, number> = {};

    detections.forEach((detection) => {
      counts[detection.type] = (counts[detection.type] ?? 0) + 1;
    });

    return Object.entries(counts)
      .map(([type, value]) => ({ type, value }))
      .sort((a, b) => b.value - a.value);
  }, [detections]);

  const severityBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};

    detections.forEach((detection) => {
      counts[detection.severity] = (counts[detection.severity] ?? 0) + 1;
    });

    return ["critical", "warning", "info"].map((severity) => ({
      severity,
      value: counts[severity] ?? 0,
    }));
  }, [detections]);

  const recentDetections = useMemo(
    () => detections.slice(0, 5),
    [detections],
  );

  const statsItems = [
    {
      label: translate("dashboard.metrics.active_cameras", "Active Cameras"),
      value: `${ACTIVE_CAMERAS}/${TOTAL_CAMERAS}`,
      icon: <Video className="size-5" />,
      tone: "success" as const,
    },
    {
      label: translate("dashboard.metrics.fire_detections", "Fire Detections"),
      value: summaryStats.fireDetections,
      icon: <Flame className="size-5 text-destructive" />,
      tone: "danger" as const,
    },
    {
      label: translate("dashboard.metrics.smoke_detections", "Smoke Detections"),
      value: summaryStats.smokeDetections,
      icon: <CloudFog className="size-5 text-amber-500" />,
      tone: "warning" as const,
    },
    {
      label: translate(
        "dashboard.metrics.unacknowledged_alerts",
        "Unacknowledged Alerts",
      ),
      value: summaryStats.unacknowledged,
      icon: <Bell className="size-5 text-rose-500" />,
      tone: "default" as const,
    },
  ];

  if (detectionsQuery.isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        {translate("dashboard.loading", "Loading dashboard data...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={translate("dashboard.list_title", "Dashboard")}
        description={translate(
          "dashboard.list_description",
          "AI vision system overview, detections, and camera health.",
        )}
        rightSlot={
          <Button size="sm" variant="outline">
            <Camera className="mr-2 size-4" />
            {translate("dashboard.actions.live_view", "Live View")}
          </Button>
        }
      />

      <StatsOverview items={statsItems} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {translate("dashboard.charts.detections_24h", "Detection Trends (24h)")}
            </CardTitle>
            <CardDescription>
              {translate(
                "dashboard.charts.detections_24h_desc",
                "Real-time detection events by type.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={detectionTrendConfig} className="h-64">
              <AreaChart data={detectionTrendData} margin={{ left: 0, right: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Legend content={<ChartLegendContent />} />
                <Area
                  type="monotone"
                  dataKey="fire"
                  stroke="var(--color-fire)"
                  fill="var(--color-fire)"
                  fillOpacity={0.3}
                  name="fire"
                />
                <Area
                  type="monotone"
                  dataKey="smoke"
                  stroke="var(--color-smoke)"
                  fill="var(--color-smoke)"
                  fillOpacity={0.3}
                  name="smoke"
                />
                <Area
                  type="monotone"
                  dataKey="person"
                  stroke="var(--color-person)"
                  fill="var(--color-person)"
                  fillOpacity={0.3}
                  name="person"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {translate(
                "dashboard.charts.camera_status_distribution",
                "Camera Status Distribution",
              )}
            </CardTitle>
            <CardDescription>
              {translate(
                "dashboard.charts.camera_status_distribution_desc",
                "Current status of all cameras.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-2">
            <ChartContainer
              config={cameraStatusChartConfig}
              className="mx-auto h-48 w-full max-w-xs"
            >
              <PieChart>
                <Pie
                  data={cameraStatusData}
                  dataKey="value"
                  nameKey="status"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={4}
                >
                  {cameraStatusData.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={
                        entry.status === "online"
                          ? "rgb(22 163 74)" // emerald-600
                          : "rgb(220 38 38)" // red-600
                      }
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideIndicator />}
                />
              </PieChart>
            </ChartContainer>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span>
                    {translate("dashboard.status.online", "Online")}
                  </span>
                </div>
                <span className="font-semibold">{ACTIVE_CAMERAS}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  <span>{translate("dashboard.status.error", "Error")}</span>
                </div>
                <span className="font-semibold">
                  {TOTAL_CAMERAS - ACTIVE_CAMERAS}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {translate(
                "dashboard.charts.top_detection_types",
                "Top Detection Types",
              )}
            </CardTitle>
            <CardDescription>
              {translate(
                "dashboard.charts.top_detection_types_desc",
                "Most frequent detection types across the system.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={{}} className="h-64">
              <BarChart
                data={topDetectionTypes}
                layout="vertical"
                margin={{ top: 4, left: 8, right: 16 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="type"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: string) =>
                    translate(
                      `detection.types.${value}`,
                      value.charAt(0).toUpperCase() + value.slice(1),
                    )
                  }
                />
                <RechartsTooltip
                  formatter={(val: number, name: string) => [
                    val,
                    translate(
                      `detection.types.${name}`,
                      name.charAt(0).toUpperCase() + name.slice(1),
                    ),
                  ]}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {topDetectionTypes.map((item) => (
                    <Cell
                      key={item.type}
                      fill={
                        DETECTION_TYPE_COLORS[item.type] ?? "var(--primary)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {translate(
                "dashboard.charts.alert_severity_breakdown",
                "Alert Severity Breakdown",
              )}
            </CardTitle>
            <CardDescription>
              {translate(
                "dashboard.charts.alert_severity_breakdown_desc",
                "Distribution of alerts by severity.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={{}} className="h-64">
              <BarChart
                data={severityBreakdown}
                margin={{ top: 4, left: 0, right: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="severity"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value: string) =>
                    translate(
                      `dashboard.severity.${value}`,
                      value.charAt(0).toUpperCase() + value.slice(1),
                    )
                  }
                />
                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                <RechartsTooltip
                  formatter={(val: number, name: string) => [
                    val,
                    translate(
                      `dashboard.severity.${name}`,
                      name.charAt(0).toUpperCase() + name.slice(1),
                    ),
                  ]}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {severityBreakdown.map((item) => (
                    <Cell
                      key={item.severity}
                      fill={
                        SEVERITY_COLORS[item.severity] ?? "var(--primary)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {translate(
                "dashboard.charts.weekly_detection_heatmap",
                "Weekly Detection Heatmap",
              )}
            </CardTitle>
            <CardDescription>
              {translate(
                "dashboard.charts.weekly_detection_heatmap_desc",
                "Detections by day and time of day.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={{}} className="h-64">
              <BarChart
                data={weeklyHeatmapData}
                margin={{ top: 4, left: 0, right: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                <Legend />
                <RechartsTooltip
                  formatter={(val: number, name: string) => [
                    val,
                    translate(
                      `dashboard.time_of_day.${name}`,
                      name.charAt(0).toUpperCase() + name.slice(1),
                    ),
                  ]}
                />
                <Bar
                  dataKey="night"
                  stackId="time"
                  fill="rgb(147 51 234)" // purple-600
                  name={translate("dashboard.time_of_day.night", "Night")}
                />
                <Bar
                  dataKey="morning"
                  stackId="time"
                  fill="rgb(56 189 248)" // sky-400
                  name={translate("dashboard.time_of_day.morning", "Morning")}
                />
                <Bar
                  dataKey="afternoon"
                  stackId="time"
                  fill="rgb(234 179 8)" // yellow-400
                  name={translate("dashboard.time_of_day.afternoon", "Afternoon")}
                />
                <Bar
                  dataKey="evening"
                  stackId="time"
                  fill="rgb(249 115 22)" // orange-500
                  name={translate("dashboard.time_of_day.evening", "Evening")}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {translate(
                "dashboard.recent_detections.title",
                "Recent Detections",
              )}
            </CardTitle>
            <CardDescription>
              {translate(
                "dashboard.recent_detections.description",
                "Latest fire, smoke, and object detection events.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {translate(
                      "dashboard.recent_detections.columns.type",
                      "Type",
                    )}
                  </TableHead>
                  <TableHead>
                    {translate(
                      "dashboard.recent_detections.columns.camera",
                      "Camera",
                    )}
                  </TableHead>
                  <TableHead>
                    {translate(
                      "dashboard.recent_detections.columns.time",
                      "Time",
                    )}
                  </TableHead>
                  <TableHead className="text-right">
                    {translate(
                      "dashboard.recent_detections.columns.status",
                      "Status",
                    )}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentDetections.map((detection) => (
                  <TableRow key={detection.id}>
                    <TableCell className="flex items-center gap-2">
                      <DetectionTypeIcon type={detection.type} />
                      <span className="capitalize">{detection.type}</span>
                    </TableCell>
                    <TableCell>{detection.cameraName}</TableCell>
                    <TableCell>{detection.time}</TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={
                          detection.status === "new" ? "destructive" : "secondary"
                        }
                      >
                        {detection.status === "new" ? (
                          <CircleDot className="mr-1 size-3" />
                        ) : (
                          <CheckCircle2 className="mr-1 size-3" />
                        )}
                        {detection.status === "new"
                          ? translate(
                              "dashboard.recent_detections.status.new",
                              "New",
                            )
                          : translate(
                              "dashboard.recent_detections.status.acknowledged",
                              "Acknowledged",
                            )}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}

                {!recentDetections.length && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="py-6 text-center text-sm text-muted-foreground"
                    >
                      {translate(
                        "dashboard.recent_detections.empty",
                        "No detections yet. They will appear here once events are captured.",
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {translate("dashboard.camera_status.title", "Camera Status")}
          </CardTitle>
          <CardDescription>
            {translate(
              "dashboard.camera_status.description",
              "Overview of all connected cameras.",
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {translate("dashboard.camera_status.columns.camera", "Camera")}
                </TableHead>
                <TableHead>
                  {translate(
                    "dashboard.camera_status.columns.location",
                    "Location",
                  )}
                </TableHead>
                <TableHead>
                  {translate("dashboard.camera_status.columns.status", "Status")}
                </TableHead>
                <TableHead className="text-right">
                  {translate(
                    "dashboard.camera_status.columns.action",
                    "Action",
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cameraRows.map((camera) => (
                <TableRow key={camera.id}>
                  <TableCell className="flex items-center gap-2">
                    <Video className="size-4 text-muted-foreground" />
                    <span>{camera.name}</span>
                  </TableCell>
                  <TableCell>{camera.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        camera.status === "online" ? "secondary" : "destructive"
                      }
                    >
                      <CircleDot className="mr-1 size-3" />
                      {camera.status === "online"
                        ? translate("dashboard.status.online", "Online")
                        : translate("dashboard.status.error", "Error")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      {translate(
                        "dashboard.camera_status.actions.view_stream",
                        "View Stream",
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

const cameraRows = [
  {
    id: "cam-1",
    name: "Camera 1",
    location: "Building A - Floor 1",
    status: "online" as const,
  },
  {
    id: "cam-2",
    name: "Camera 2",
    location: "Building A - Floor 2",
    status: "online" as const,
  },
  {
    id: "cam-3",
    name: "Camera 3",
    location: "Warehouse - Entrance",
    status: "online" as const,
  },
  {
    id: "cam-4",
    name: "Camera 4",
    location: "Parking Lot - Gate 1",
    status: "online" as const,
  },
  {
    id: "cam-5",
    name: "Camera 5",
    location: "Parking Lot - Gate 2",
    status: "error" as const,
  },
];

function DetectionTypeIcon({ type }: { type: Detection["type"] }) {
  if (type === "fire") return <Flame className="size-4 text-destructive" />;
  if (type === "smoke") return <CloudFog className="size-4 text-amber-500" />;
  if (type === "person") return <CircleDot className="size-4 text-primary" />;
  if (type === "vehicle") return <Camera className="size-4 text-sky-500" />;
  return <AlertTriangle className="size-4 text-muted-foreground" />;
}
