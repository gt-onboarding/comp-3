'use client';

import { useEffect } from 'react';
import { T } from 'gt-next';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('app/(app)/(dashboard)/[orgId]/frameworks/error.tsx', error);
  }, [error]);

  return (
    <div>
      <T>
        <h2>Something went wrong!</h2>
      </T>
      <button onClick={reset} type="button">
        <T>Try again</T>
      </button>
    </div>
  );
}
