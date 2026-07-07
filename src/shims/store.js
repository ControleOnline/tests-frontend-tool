import { readStoredSession, clearStoredSession, writeStoredSession, hasStoredSession } from '../lib/session';
import {
  getLoggedUser as getLoggedUserAction,
  getUserStatus as getUserStatusAction,
  gSignIn as gSignInAction,
  isLogged as isLoggedAction,
  logIn as logInAction,
  logOut as logOutAction,
  restoreSession as restoreSessionAction,
  setIndexRoute as setIndexRouteAction,
  signIn as signInAction,
  signUp as signUpAction,
} from '@controleonline/ui-login/src/store/modules/auth/actions';

const DEFAULT_THEME_COLORS = {
  pageBackground: '#050816',
  textPrimary: '#f8fafc',
  textSecondary: '#cbd5e1',
  surface: '#0f172a',
  overlayBackground: 'rgba(2, 6, 23, 0.7)',
  containerTransparentBackground: 'rgba(255, 255, 255, 0)',
  inputBackground: 'rgba(15, 23, 42, 0.9)',
  inputBorder: '#334155',
  inputFilledBorder: '#475569',
  inputErrorBorder: '#f87171',
  inputErrorBackground: 'rgba(127, 29, 29, 0.35)',
  inputErrorText: '#fecaca',
  inputText: '#f8fafc',
  inputPlaceholderText: '#94a3b8',
  inputIcon: '#7dd3fc',
  buttonBackground: '#7dd3fc',
  buttonShadow: '#0f172a',
  buttonText: '#082f49',
  dividerBackground: '#334155',
  dividerText: '#cbd5e1',
  buttonBackgroundSecondary: '#0f172a',
  buttonBorderSecondary: '#475569',
  buttonDisabledOpacity: 0.6,
  buttonDisabledText: '#94a3b8',
  buttonIconSecondary: '#7dd3fc',
  buttonTextSecondary: '#f8fafc',
  linkText: '#93c5fd',
  modalOverlay: 'rgba(2, 6, 23, 0.74)',
  modalBackground: '#0b1220',
  modalBorder: '#1e293b',
  modalHeaderText: '#f8fafc',
  modalText: '#cbd5e1',
  modalCloseIcon: '#e2e8f0',
  modalShadow: '#000000',
};

const DEFAULT_COMPANY = {};

const authState = {
  user: readStoredSession() || {},
  isLoading: false,
  isLogged: hasStoredSession(),
  sessionChecked: true,
  error: '',
  violations: null,
  indexRoute: 'HomeIndex',
  peopleStatus: null,
};

function commit(type, payload) {
  switch (type) {
    case 'LOGIN_SET_USER':
      authState.user = payload || {};
      authState.isLogged = !!payload;
      if (payload) {
        writeStoredSession(payload);
      } else {
        clearStoredSession();
      }
      return 'user';
    case 'LOGIN_SET_ERROR':
      authState.error = payload || '';
      return 'error';
    case 'LOGIN_SET_ISLOADING':
      authState.isLoading = payload !== false;
      return 'isLoading';
    case 'LOGIN_SET_IS_LOGGED':
      authState.isLogged = !!payload;
      return 'isLogged';
    case 'LOGIN_SET_SESSION_CHECKED':
      authState.sessionChecked = payload === true;
      return 'sessionChecked';
    case 'LOGIN_SET_VIOLATIONS':
      authState.violations = payload || null;
      return 'violations';
    case 'LOGIN_SET_INDEX_ROUTE':
      authState.indexRoute = payload || 'HomeIndex';
      return 'indexRoute';
    case 'SET_PEOPLE_STATUS':
      authState.peopleStatus = payload || null;
      return 'peopleStatus';
    default:
      return null;
  }
}

const authContext = {
  state: authState,
  commit,
};

const authGetters = {
  get user() {
    return authState.user;
  },
  get error() {
    return authState.error;
  },
  get isLoading() {
    return authState.isLoading;
  },
  get violations() {
    return authState.violations;
  },
  get isLogged() {
    return authState.isLogged;
  },
  get sessionChecked() {
    return authState.sessionChecked;
  },
  get type() {
    return authState.user?.type;
  },
  get indexRoute() {
    return authState.indexRoute;
  },
};

const authActions = {
  signIn(values) {
    return signInAction(authContext, values);
  },
  gSignIn(values) {
    return gSignInAction(authContext, values);
  },
  signUp(values) {
    return signUpAction(authContext, values);
  },
  restoreSession(values) {
    return restoreSessionAction(authContext, values);
  },
  logIn(values) {
    return logInAction(authContext, values);
  },
  logOut(values) {
    return logOutAction(authContext, values);
  },
  isLogged(values) {
    return isLoggedAction(authContext, values);
  },
  getLoggedUser(values) {
    return getLoggedUserAction(authContext, values);
  },
  setIndexRoute(values) {
    return setIndexRouteAction(authContext, values);
  },
  getUserStatus(values) {
    return getUserStatusAction(authContext, values);
  },
};

const themeStore = {
  state: {
    colors: DEFAULT_THEME_COLORS,
  },
  getters: {
    get colors() {
      return DEFAULT_THEME_COLORS;
    },
  },
  actions: {},
};

const peopleStore = {
  state: {
    defaultCompany: DEFAULT_COMPANY,
    currentCompany: DEFAULT_COMPANY,
  },
  getters: {
    get defaultCompany() {
      return DEFAULT_COMPANY;
    },
    get currentCompany() {
      return DEFAULT_COMPANY;
    },
  },
  actions: {},
};

const fallbackStore = {
  state: {},
  getters: {},
  actions: {},
};

const stores = {
  auth: {
    state: authState,
    getters: authGetters,
    actions: authActions,
  },
  theme: themeStore,
  people: peopleStore,
};

export function useStore(name) {
  return stores[name] || fallbackStore;
}

export function useStores() {
  return stores;
}

export function getAllStores() {
  return stores;
}
