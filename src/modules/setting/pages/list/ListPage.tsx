import { useMemo } from "react";

import { useOne, useTranslation, useUpdate } from "@refinedev/core";
import { Brush, Bell, Database, Info, ServerCog, ShieldCheck } from "lucide-react";

import { LanguageSwitcher } from "@/core/components/shared/language-switcher";
import { PageHeader } from "@/core/components/shared/page-header";
import { ThemeSelect } from "@/core/components/shared/theme/theme-select";
import { Button } from "@/core/components/ui/button";
import { Progress } from "@/core/components/ui/progress";
import { Separator } from "@/core/components/ui/separator";
import { SettingsSectionCard } from "@/modules/setting/components/SettingsSectionCard";
import { SettingsToggleItem } from "@/modules/setting/components/SettingsToggleItem";
import type { Settings } from "@/modules/setting/types";

export default function SettingListPage() {
  const { translate } = useTranslation();

  const { query } = useOne<Settings>({
    resource: "settings",
    id: "default",
  });

  const { mutate: update } = useUpdate<Settings>();

  const settings = query.data?.data;

  const handlePatch = (patch: Partial<Settings>) => {
    if (!settings) return;

    update({
      resource: "settings",
      id: settings.id,
      values: {
        ...settings,
        ...patch,
      },
      mutationMode: "pessimistic",
    });
  };

  const storageUsage = useMemo(() => {
    if (!settings) return null;
    const usage = settings.dataStorage.storageUsage;
    const percentUsed = (usage.totalUsedGb / usage.totalCapacityGb) * 100;
    return { ...usage, percentUsed };
  }, [settings]);

  if (query.isLoading || !settings) {
    return (
      <div className="space-y-4 p-6">
        <div className="h-6 w-40 rounded bg-muted" />
        <div className="h-4 w-64 rounded bg-muted" />
        <div className="h-40 w-full rounded-lg bg-muted" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={translate("setting.page_title", "Settings")}
        description={translate(
          "setting.page_description",
          "Manage your dashboard preferences, notifications, storage, and security.",
        )}
      />

      {/* Layout: 2-column on desktop, single column on mobile */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <div className="space-y-6">
          {/* Appearance */}
          <SettingsSectionCard
            icon={<Brush className="h-4 w-4" />}
            title={translate("setting.sections.appearance.title", "Appearance")}
            description={translate(
              "setting.sections.appearance.description",
              "Customize the look and feel of your dashboard.",
            )}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  {translate(
                    "setting.sections.appearance.theme_mode_label",
                    "Theme Mode",
                  )}
                </p>
                <ThemeSelect />
                <p className="text-[11px] text-muted-foreground md:text-xs">
                  {`${translate(
                    "setting.sections.appearance.theme_mode_helper",
                    "Currently using",
                  )} ${settings.themeMode} mode.`}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  {translate(
                    "setting.sections.appearance.language_label",
                    "Language",
                  )}
                </p>
                {/* Language select inlined, no extra border wrapper so it matches header */}
                <LanguageSwitcher className="w-[120px] md:w-[150px]" />
              </div>
            </div>
          </SettingsSectionCard>

          {/* Notifications */}
          <SettingsSectionCard
            icon={<Bell className="h-4 w-4" />}
            title={
              translate("setting.sections.notifications.title", "Notifications")
            }
            description={translate(
              "setting.sections.notifications.description",
              "Configure how you receive alerts and notifications.",
            )}
          >
            <div className="space-y-3">
              <SettingsToggleItem
                label={translate(
                  "setting.sections.notifications.browser_notifications_label",
                  "Browser Notifications",
                )}
                description={translate(
                  "setting.sections.notifications.browser_notifications_description",
                  "Receive desktop notifications for critical alerts.",
                )}
                checked={settings.notifications.browserNotifications}
                onCheckedChange={(value) =>
                  handlePatch({
                    notifications: {
                      ...settings.notifications,
                      browserNotifications: value,
                    },
                  })
                }
              />

              <SettingsToggleItem
                label={translate(
                  "setting.sections.notifications.sound_alerts_label",
                  "Sound Alerts",
                )}
                description={translate(
                  "setting.sections.notifications.sound_alerts_description",
                  "Play a sound when fire or smoke is detected.",
                )}
                checked={settings.notifications.soundAlerts}
                onCheckedChange={(value) =>
                  handlePatch({
                    notifications: {
                      ...settings.notifications,
                      soundAlerts: value,
                    },
                  })
                }
              />

              <SettingsToggleItem
                label={translate(
                  "setting.sections.notifications.daily_email_label",
                  "Daily Email Digest",
                )}
                description={translate(
                  "setting.sections.notifications.daily_email_description",
                  "Receive a daily summary of detection events.",
                )}
                checked={settings.notifications.dailyEmailDigest}
                onCheckedChange={(value) =>
                  handlePatch({
                    notifications: {
                      ...settings.notifications,
                      dailyEmailDigest: value,
                    },
                  })
                }
              />
            </div>
          </SettingsSectionCard>

          {/* Security */}
          <SettingsSectionCard
            icon={<ShieldCheck className="h-4 w-4" />}
            title={translate("setting.sections.security.title", "Security")}
            description={translate(
              "setting.sections.security.description",
              "Manage security and access control settings.",
            )}
          >
            <div className="space-y-4">
              <SettingsToggleItem
                label={translate(
                  "setting.sections.security.two_factor_label",
                  "Two-Factor Authentication",
                )}
                description={translate(
                  "setting.sections.security.two_factor_description",
                  "Add an extra layer of security to your account.",
                )}
                checked={settings.security.twoFactorEnabled}
                onCheckedChange={(value) =>
                  handlePatch({
                    security: {
                      ...settings.security,
                      twoFactorEnabled: value,
                    },
                  })
                }
              />

              <div className="rounded-lg border border-border/60 bg-background/60 p-3 md:p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-medium md:text-sm">
                      {translate(
                        "setting.sections.security.session_timeout_label",
                        "Auto Session Timeout",
                      )}
                    </p>
                    <p className="text-[11px] text-muted-foreground md:text-xs">
                      {translate(
                        "setting.sections.security.session_timeout_description",
                        "Automatically log out after inactivity.",
                      )}
                    </p>
                  </div>
                  <span className="text-xs font-medium md:text-sm">
                    {settings.security.autoSessionTimeoutMinutes} min
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-dashed bg-background/40 p-3 md:p-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
                  <Info className="h-4 w-4 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="font-medium">
                      {translate(
                        "setting.sections.security.active_sessions_label",
                        "Active Sessions",
                      )}
                    </p>
                    {settings.security.activeSessions.map((session) => (
                      <p key={session.id} className="text-[11px] md:text-xs">
                        <span className="font-medium">
                          {translate(
                            "setting.sections.security.current_session_label",
                            "Current Session",
                          )}
                          :
                        </span>{" "}
                        {session.device}  b7 {session.location}  b7
                        {" "}
                        {session.lastActive}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SettingsSectionCard>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Data & Storage */}
          <SettingsSectionCard
            icon={<Database className="h-4 w-4" />}
            title={
              translate("setting.sections.data_storage.title", "Data & Storage")
            }
            description={translate(
              "setting.sections.data_storage.description",
              "Manage data retention and storage preferences.",
            )}
          >
            <div className="space-y-4">
              <SettingsToggleItem
                label={translate(
                  "setting.sections.data_storage.auto_cleanup_label",
                  "Automatic data cleanup",
                )}
                description={
                  `${translate(
                    "setting.sections.data_storage.auto_cleanup_description",
                    "Automatically delete detection events older than",
                  )} ${settings.dataStorage.automaticCleanupDays} days.`
                }
                checked={settings.dataStorage.automaticCleanupEnabled}
                onCheckedChange={(value) =>
                  handlePatch({
                    dataStorage: {
                      ...settings.dataStorage,
                      automaticCleanupEnabled: value,
                    },
                  })
                }
              />

              <SettingsToggleItem
                label={translate(
                  "setting.sections.data_storage.save_snapshots_label",
                  "Save Detection Snapshots",
                )}
                description={translate(
                  "setting.sections.data_storage.save_snapshots_description",
                  "Store image snapshots of detection events.",
                )}
                checked={settings.dataStorage.saveDetectionSnapshots}
                onCheckedChange={(value) =>
                  handlePatch({
                    dataStorage: {
                      ...settings.dataStorage,
                      saveDetectionSnapshots: value,
                    },
                  })
                }
              />

              {storageUsage && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span>
                      {translate(
                        "setting.sections.data_storage.storage_usage_label",
                        "Storage Usage",
                      )}
                    </span>
                    <span className="font-medium">
                      {storageUsage.totalUsedGb.toFixed(1)} GB {" "}
                      <span className="text-muted-foreground">
                        {`${translate(
                          "setting.sections.data_storage.of_capacity",
                          "of",
                        )} ${storageUsage.totalCapacityGb} GB`}
                      </span>
                    </span>
                  </div>
                  <Progress value={storageUsage.percentUsed} />
                  <ul className="space-y-1 text-[11px] text-muted-foreground md:text-xs">
                    <li>
                      {translate(
                        "setting.sections.data_storage.detection_records",
                        "Detection Records",
                      )}
                      {": "}
                      <span className="font-medium text-foreground">
                        {storageUsage.detectionRecordsGb.toFixed(1)} GB
                      </span>
                    </li>
                    <li>
                      {translate(
                        "setting.sections.data_storage.image_snapshots",
                        "Image Snapshots",
                      )}
                      {": "}
                      <span className="font-medium text-foreground">
                        {storageUsage.imageSnapshotsGb.toFixed(1)} GB
                      </span>
                    </li>
                    <li>
                      {translate(
                        "setting.sections.data_storage.total_used",
                        "Total used",
                      )}
                      {": "}
                      <span className="font-medium text-foreground">
                        {storageUsage.totalUsedGb.toFixed(1)} GB
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </SettingsSectionCard>

          {/* System Information */}
          <SettingsSectionCard
            icon={<ServerCog className="h-4 w-4" />}
            title={
              translate("setting.sections.system_info.title", "System Information")
            }
            description={translate(
              "setting.sections.system_info.description",
              "About this AI vision system.",
            )}
          >
            <div className="space-y-4 text-xs md:text-sm">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {translate(
                      "setting.sections.system_info.application_name",
                      "Application Name",
                    )}
                  </span>
                  <span className="font-medium">
                    {settings.system.applicationName}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {translate(
                      "setting.sections.system_info.version",
                      "Version",
                    )}
                  </span>
                  <span className="font-medium">{settings.system.version}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {translate(
                      "setting.sections.system_info.build_date",
                      "Build Date",
                    )}
                  </span>
                  <span className="font-medium">{settings.system.buildDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {translate(
                      "setting.sections.system_info.environment",
                      "Environment",
                    )}
                  </span>
                  <span className="font-medium">
                    {settings.system.environment}
                  </span>
                </div>
                <Separator className="my-1" />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {translate(
                      "setting.sections.system_info.edge_platform",
                      "Edge Platform",
                    )}
                  </span>
                  <span className="font-medium">
                    {settings.system.edgePlatform}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {translate(
                      "setting.sections.system_info.cloud_provider",
                      "Cloud Provider",
                    )}
                  </span>
                  <span className="font-medium">
                    {settings.system.cloudProvider}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Button variant="outline" size="sm">
                  <ServerCog className="mr-1 h-4 w-4" />
                  {translate(
                    "setting.sections.system_info.view_docs",
                    "View Documentation",
                  )}
                </Button>
                <Button variant="secondary" size="sm">
                  {translate(
                    "setting.sections.system_info.check_updates",
                    "Check for Updates",
                  )}
                </Button>
              </div>
            </div>
          </SettingsSectionCard>
        </div>
      </div>
    </div>
  );
}
