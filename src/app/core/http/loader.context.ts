import { HttpContextToken } from '@angular/common/http';

export type LoaderKind = 'global' | 'auth' | 'none';

export const LOADER_KIND = new HttpContextToken<LoaderKind>(() => 'global');
