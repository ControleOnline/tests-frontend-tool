import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SignInPage from '@controleonline/ui-login/src/react/pages/sign-in';
import { hasStoredSession, readStoredSession } from './lib/session';
import { MessageProvider } from './shims/messageService';
import { NavigationProvider } from './shims/navigation';

const ROUTE_NAMES = ['SignInPage', 'HomePage'];

function createNavigation(route, setRoute, onAuthenticated) {
  return {
    getState() {
      return {
        index: 0,
        routeNames: ROUTE_NAMES,
        routes: [route],
      };
    },
    reset(nextState = {}) {
      const nextRoute =
        Array.isArray(nextState.routes) && nextState.routes[0]
          ? nextState.routes[0]
          : { name: 'HomePage', params: {} };

      setRoute(nextRoute);

      if (nextRoute.name === 'SignInPage') {
        return;
      }

      const session = readStoredSession();
      if (hasStoredSession(session) && typeof onAuthenticated === 'function') {
        onAuthenticated(session);
      }
    },
    navigate(name, params = {}) {
      setRoute({ name, params });
    },
    goBack() {},
    dispatch() {},
  };
}

export default function LoginScreen({ onAuthenticated }) {
  const [route, setRoute] = useState({
    name: 'SignInPage',
    params: {},
  });

  const navigation = useMemo(
    () => createNavigation(route, setRoute, onAuthenticated),
    [onAuthenticated, route],
  );

  return (
    <View style={styles.shell}>
      <MessageProvider>
        <NavigationProvider navigation={navigation} route={route}>
          <SignInPage navigation={navigation} />
        </NavigationProvider>
      </MessageProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#050816',
  },
});
