/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/eye_tracking` | `/(tabs)/home` | `/(tabs)/progress` | `/(tabs)/settings` | `/(tabs)/signup` | `/(tabs)/training` | `/(tabs)/two` | `/_sitemap` | `/eye_tracking` | `/home` | `/modal` | `/progress` | `/settings` | `/signup` | `/training` | `/two`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
