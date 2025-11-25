import type { BaseRecord } from "@refinedev/core";

export type ThemeMode = "light" | "dark" | "system";

export interface NotificationSettings {
  browserNotifications: boolean;
  soundAlerts: boolean;
  dailyEmailDigest: boolean;
}

export interface StorageUsage {
  detectionRecordsGb: number;
  imageSnapshotsGb: number;
  totalUsedGb: number;
  totalCapacityGb: number;
}

export interface DataStorageSettings {
  automaticCleanupEnabled: boolean;
  automaticCleanupDays: number;
  saveDetectionSnapshots: boolean;
  storageUsage: StorageUsage;
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  autoSessionTimeoutMinutes: number;
  activeSessions: ActiveSession[];
}

export interface SystemInformation {
  applicationName: string;
  version: string;
  buildDate: string;
  environment: string;
  edgePlatform: string;
  cloudProvider: string;
}

export interface Settings extends BaseRecord {
  id: string;
  themeMode: ThemeMode;
  language: string;
  notifications: NotificationSettings;
  dataStorage: DataStorageSettings;
  security: SecuritySettings;
  system: SystemInformation;
}
