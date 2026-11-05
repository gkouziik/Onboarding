import React, { PropsWithChildren } from 'react';

import { useAppSelector } from '@/store/hooks.ts';
import { selectAuth } from '@/store/auth/selectors';
import { LockScreen } from '@/screens/Lock';

export function AppLockGate({ children }: PropsWithChildren) {
  const { initialized, isLocked } = useAppSelector(selectAuth);

  if (!initialized) {
    return null; // or your splash screen — avoids flashing app content
  }

  return (
    <>
      {children}
      {isLocked && <LockScreen />}
    </>
  );
}
