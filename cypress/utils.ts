import { Store } from 'redux';
import { AppState } from '../src/redux';

export const getStore = (): Store<AppState> => (window as any).store;
export const currentUser = (): string =>
  getStore().getState().auth.profile?.username || 'admin'