import { useTranslation } from "@refinedev/core";
import {
  Activity,
  AlertTriangle,
  Camera,
  Clock3,
  Download,
  FileText,
  LineChart,
  Mic,
  Paperclip,
  Play,
  Sparkles,
  Video,
} from "lucide-react";

import { Badge } from "@/core/components/ui/badge";
import { Button } from "@/core/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { ScrollArea } from "@/core/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/core/components/ui/tabs";
import { Textarea } from "@/core/components/ui/textarea";

import type { Detection } from "@/modules/detection/types";

export type DetectionDetailsTabsProps = {
  detection: Detection;
};

export const DetectionDetailsTabs = ({ detection }: DetectionDetailsTabsProps) => {
  const { translate } = useTranslation();

  return (
    <Tabs defaultValue="ai-summary" className="space-y-4">
      <TabsList className="w-full max-w-full overflow-x-auto">
        <TabsTrigger value="ai-summary">
          <Sparkles className="size-4" />
          {translate("detection.details.tabs.ai_summary", "AI Summary")}
        </TabsTrigger>
        <TabsTrigger value="evidence">
          <Video className="size-4" />
          {translate("detection.details.tabs.evidence", "Evidence")}
        </TabsTrigger>
        <TabsTrigger value="analysis">
          <LineChart className="size-4" />
          {translate("detection.details.tabs.analysis", "Analysis")}
        </TabsTrigger>
        <TabsTrigger value="timeline">
          <Clock3 className="size-4" />
          {translate("detection.details.tabs.timeline", "Timeline")}
        </TabsTrigger>
        <TabsTrigger value="notes">
          <FileText className="size-4" />
          {translate("detection.details.tabs.notes", "Notes")}
        </TabsTrigger>
        <TabsTrigger value="actions">
          <Activity className="size-4" />
          {translate("detection.details.tabs.actions", "Actions")}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ai-summary">
        <AiSummaryTab />
      </TabsContent>
      <TabsContent value="evidence">
        <EvidenceTab />
      </TabsContent>
      <TabsContent value="analysis">
        <AnalysisTab detection={detection} />
      </TabsContent>
      <TabsContent value="timeline">
        <TimelineTab />
      </TabsContent>
      <TabsContent value="notes">
        <NotesTab />
      </TabsContent>
      <TabsContent value="actions">
        <ActionsTab />
      </TabsContent>
    </Tabs>
  );
};

const AiSummaryTab = () => {
  const { translate } = useTranslation();

  return (
    <Card className="py-8">
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-6" />
        </div>
        <CardTitle className="text-lg font-semibold">
          {translate(
            "detection.details.ai_summary.title",
            "AI-Powered Analysis",
          )}
        </CardTitle>
        <CardDescription>
          {translate(
            "detection.details.ai_summary.description",
            "Generate an intelligent summary and recommended response steps for this detection event.",
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <Button size="lg" className="mt-2">
          <Sparkles className="size-4" />
          {translate(
            "detection.details.ai_summary.cta",
            "Generate AI Summary",
          )}
        </Button>
        <p className="max-w-md text-center text-xs text-muted-foreground md:text-sm">
          {translate(
            "detection.details.ai_summary.hint",
            "The AI assistant will review evidence, analysis, and recent context to propose a concise incident report.",
          )}
        </p>
      </CardContent>
    </Card>
  );
};

const EvidenceTab = () => {
  const { translate } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Video evidence */}
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between gap-2 border-b bg-muted/40">
          <div>
            <CardTitle className="text-sm">
              {translate("detection.details.evidence.video_title", "Video Evidence")}
            </CardTitle>
            <CardDescription className="text-xs">
              {translate(
                "detection.details.evidence.video_hint",
                "Detection event video clip",
              )}
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Download className="size-3.5" />
              {translate("detection.details.evidence.download", "Download Video")}
            </Button>
            <Button variant="outline" size="sm">
              <Activity className="size-3.5" />
              {translate("detection.details.evidence.share", "Share")}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative aspect-video w-full bg-black/90">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-white">
                <Play className="size-4" />
                <span>Video player placeholder</span>
              </div>
              <p className="text-[11px] text-zinc-300">
                {translate(
                  "detection.details.evidence.video_placeholder",
                  "Embed your actual player component here.",
                )}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image snapshots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Camera className="size-4" />
            {translate("detection.details.evidence.snapshots_title", "Image Snapshots")}
          </CardTitle>
          <CardDescription>
            {translate(
              "detection.details.evidence.snapshots_hint",
              "Key frames before, during, and after the detection event.",
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <SnapshotPlaceholder label={translate("detection.details.evidence.snapshot_before", "Before")} />
            <SnapshotPlaceholder label={translate("detection.details.evidence.snapshot_detection", "Detection")} isHighlighted />
            <SnapshotPlaceholder label={translate("detection.details.evidence.snapshot_after", "After")} />
          </div>
          <Button variant="outline" size="sm" className="mt-1">
            <Download className="size-3.5" />
            {translate("detection.details.evidence.download_all", "Download All Images")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const SnapshotPlaceholder = ({
  label,
  isHighlighted,
}: {
  label: string;
  isHighlighted?: boolean;
}) => (
  <div className="space-y-1">
    <div
      className={`aspect-video w-full rounded-lg border bg-muted/40 ${isHighlighted ? "border-primary" : "border-dashed"}`}
    />
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
  </div>
);

const AnalysisTab = ({ detection }: { detection: Detection }) => {
  const { translate } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <LineChart className="size-4" />
              {translate("detection.details.analysis.title", "Detection Analysis")}
            </CardTitle>
            <CardDescription>
              {translate(
                "detection.details.analysis.subtitle",
                "Deep-dive into the AI model's interpretation of this event.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <AnalysisField
              label={translate("detection.details.analysis.object_class", "Object class")}
              value={detection.classLabel}
            />
            <AnalysisField
              label={translate("detection.details.analysis.subclass", "Sub-class")}
              value={translate("detection.details.analysis.subclass_value", "Adult")}
            />
            <AnalysisField
              label={translate("detection.details.analysis.motion_status", "Motion status")}
              value={translate("detection.details.analysis.motion_status_value", "Moving")}
            />
            <AnalysisField
              label={translate("detection.details.analysis.posture", "Posture")}
              value={translate("detection.details.analysis.posture_value", "Standing")}
            />
            <AnalysisField
              label={translate("detection.details.analysis.event_duration", "Event duration")}
              value={translate("detection.details.analysis.event_duration_value", "12 seconds")}
            />
            <AnalysisField
              label={translate("detection.details.analysis.velocity", "Estimated velocity")}
              value={translate("detection.details.analysis.velocity_value", "2.8 m/s")}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Activity className="size-4" />
              {translate(
                "detection.details.analysis.environment_title",
                "Environmental Conditions",
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
            <AnalysisField
              label={translate("detection.details.analysis.lighting", "Lighting")}
              value={translate("detection.details.analysis.lighting_value", "Indoor")}
            />
            <AnalysisField
              label={translate("detection.details.analysis.temperature", "Temperature")}
              value={translate("detection.details.analysis.temperature_value", "22°C")}
            />
            <AnalysisField
              label={translate("detection.details.analysis.weather", "Weather")}
              value={translate("detection.details.analysis.weather_value", "Clear")}
            />
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="size-4 text-destructive" />
              {translate("detection.details.analysis.rules_title", "Triggered Rules")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs md:text-sm">
              <span className="font-medium">
                {translate("detection.details.analysis.rule_name", "Fire Detection Alert")}
              </span>
              <Badge variant="destructive" className="text-[11px] uppercase tracking-wide">
                {translate("detection.details.analysis.rule_active", "Active")}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {translate(
                "detection.details.analysis.rule_hint",
                "Example placeholder for rule metadata, thresholds, and linked automations.",
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock3 className="size-4" />
              {translate(
                "detection.details.analysis.similar_title",
                "Similar Detections",
              )}
            </CardTitle>
            <CardDescription>
              {translate(
                "detection.details.analysis.similar_hint",
                "Recent events on this and nearby cameras.",
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-xs md:text-sm">
            <SimilarRow
              title={translate(
                "detection.details.analysis.similar_same_camera",
                "Same camera",
              )}
              time={translate("detection.details.analysis.similar_minutes_ago", "2 minutes ago")}
              confidence="89%"
            />
            <SimilarRow
              title={translate(
                "detection.details.analysis.similar_nearby_camera",
                "2 cameras nearby",
              )}
              time={translate("detection.details.analysis.similar_hours_ago", "1 hour ago")}
              confidence="82%"
            />
            <SimilarRow
              title={translate(
                "detection.details.analysis.similar_today",
                "Same camera",
              )}
              time={translate("detection.details.analysis.similar_today_time", "Earlier today")}
              confidence="73%"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const AnalysisField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-0.5">
    <p className="text-[11px] text-muted-foreground md:text-xs">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

const SimilarRow = ({
  title,
  time,
  confidence,
}: {
  title: string;
  time: string;
  confidence: string;
}) => (
  <div className="flex items-center justify-between rounded-md border px-3 py-2">
    <div className="space-y-0.5">
      <p className="text-xs font-medium md:text-sm">{title}</p>
      <p className="text-[11px] text-muted-foreground md:text-xs">{time}</p>
    </div>
    <Badge variant="outline" className="text-[11px]">
      {confidence}
    </Badge>
  </div>
);

const TimelineTab = () => {
  const { translate } = useTranslation();

  const steps = [
    {
      key: "object_entered",
      label: translate(
        "detection.details.timeline.object_entered",
        "Object entered frame",
      ),
      confidence: "72%",
    },
    {
      key: "confidence_increase",
      label: translate(
        "detection.details.timeline.confidence_increase",
        "Detection confidence increased",
      ),
      confidence: "88%",
    },
    {
      key: "rule_triggered",
      label: translate(
        "detection.details.timeline.rule_triggered",
        "Rule triggered",
      ),
      confidence: "89%",
    },
    {
      key: "alert_generated",
      label: translate(
        "detection.details.timeline.alert_generated",
        "Alert generated",
      ),
      confidence: "89%",
    },
    {
      key: "current_state",
      label: translate(
        "detection.details.timeline.current_state",
        "Current state",
      ),
      confidence: "89%",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Clock3 className="size-4" />
          {translate("detection.details.timeline.title", "Detection Timeline")}
        </CardTitle>
        <CardDescription>
          {translate(
            "detection.details.timeline.description",
            "Event progression and confidence changes over time.",
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative pl-4">
          <div className="absolute inset-y-2 left-1 w-px bg-border" />
          <ul className="space-y-4">
            {steps.map((step, index) => (
              <li key={step.key} className="relative flex items-start gap-3">
                <span className="relative mt-1.5 flex size-2 items-center justify-center">
                  <span className="bg-background relative z-10 size-2 rounded-full border border-primary" />
                  {index === steps.length - 1 && (
                    <span className="bg-primary/10 absolute inset-[-4px] rounded-full" />
                  )}
                </span>
                <div className="flex flex-1 items-center justify-between gap-3">
                  <p className="text-xs font-medium md:text-sm">{step.label}</p>
                  <Badge variant="outline" className="text-[11px]">
                    {step.confidence}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const NotesTab = () => {
  const { translate } = useTranslation();

  return (
    <Card className="flex min-h-[260px] flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-sm">
          <span>{translate("detection.details.notes.title", "Shared Notes & Timeline")}</span>
          <Badge variant="outline" className="text-[11px]">
            {translate("detection.details.notes.empty", "No notes yet")}
          </Badge>
        </CardTitle>
        <CardDescription>
          {translate(
            "detection.details.notes.description",
            "Collaborate with your team using structured notes and attachments.",
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="space-y-2">
          <Textarea
            placeholder={translate(
              "detection.details.notes.placeholder",
              "Add a note about this detection...",
            )}
          />
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="ghost" size="sm" className="px-2">
                <Paperclip className="size-3.5" />
                {translate("detection.details.notes.attach", "Attach")}
              </Button>
              <Button variant="ghost" size="sm" className="px-2">
                <Mic className="size-3.5" />
                {translate("detection.details.notes.voice", "Voice Note")}
              </Button>
            </div>
            <Button size="sm">
              {translate("detection.details.notes.send", "Send")}
            </Button>
          </div>
        </div>

        <ScrollArea className="mt-2 h-40 rounded-md border bg-muted/20">
          <div className="p-3 text-xs text-muted-foreground">
            {translate(
              "detection.details.notes.history_placeholder",
              "Notes history will appear here once your team starts collaborating.",
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const ActionsTab = () => {
  const { translate } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Activity className="size-4" />
          {translate("detection.details.actions.title", "Response Actions")}
        </CardTitle>
        <CardDescription>
          {translate(
            "detection.details.actions.description",
            "Design for this tab is pending. Use this placeholder to wire your workflows (escalations, tickets, automations).",
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-xs text-muted-foreground md:text-sm">
        <p>
          {translate(
            "detection.details.actions.body_1",
            "Once the final UI is available, replace this section with your action cards (e.g., create incident, dispatch security, mute alert).",
          )}
        </p>
        <p>
          {translate(
            "detection.details.actions.body_2",
            "The rest of the detection details drawer is fully functional and can be extended without changing this contract.",
          )}
        </p>
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          <Button variant="outline" size="sm" className="justify-start">
            <FileText className="size-3.5" />
            {translate(
              "detection.details.actions.sample_create_incident",
              "Sample: Create incident ticket",
            )}
          </Button>
          <Button variant="outline" size="sm" className="justify-start">
            <AlertTriangle className="size-3.5" />
            {translate(
              "detection.details.actions.sample_escalate",
              "Sample: Escalate to security",
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
