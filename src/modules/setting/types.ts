import type { BaseRecord } from "@refinedev/core";

export type ThemeMode = "light" | "dark" | "system";

export type NotificationSettings = {
  browserNotifications: boolean;
  soundAlerts: boolean;
  dailyEmailDigest: boolean;
};

export type StorageUsage = {
  detectionRecordsGb: number;
  imageSnapshotsGb: number;
  totalUsedGb: number;
  totalCapacityGb: number;
};

export type DataStorageSettings = {
  automaticCleanupEnabled: boolean;
  automaticCleanupDays: number;
  saveDetectionSnapshots: boolean;
  storageUsage: StorageUsage;
};

export type ActiveSession = {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current: boolean;
};

export type SecuritySettings = {
  twoFactorEnabled: boolean;
  autoSessionTimeoutMinutes: number;
  activeSessions: ActiveSession[];
};

export type SystemInformation = {
  applicationName: string;
  version: string;
  buildDate: string;
  environment: string;
  edgePlatform: string;
  cloudProvider: string;
};

export type Settings = {
  id: string;
  themeMode: ThemeMode;
  language: string;
  notifications: NotificationSettings;
  dataStorage: DataStorageSettings;
  security: SecuritySettings;
  system: SystemInformation;
} & BaseRecord;
