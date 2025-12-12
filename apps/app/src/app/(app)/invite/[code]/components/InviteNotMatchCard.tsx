'use client';

import { SignOut } from '@/components/sign-out';
import { InviteStatusCard } from './InviteStatusCard';
import { T, Var, msg } from 'gt-next';

export function InviteNotMatchCard({
  currentEmail,
  invitedEmail,
}: {
  currentEmail: string;
  invitedEmail: string;
}) {
  return (
    <InviteStatusCard
      title={msg("Wrong account")}
      description={msg("You're signed in with a different email than the one this invite was sent to. Please sign out and sign back in with the invited email.")}
    >
      <div className="mx-auto max-w-[42ch] text-muted-foreground leading-relaxed flex flex-col gap-4">
        <div className="space-y-2 text-sm">
          <T>
            <p>
              You are signed in as
              <span className="mx-1 inline-flex items-center rounded-xs border border-muted bg-muted/40 px-2 py-0.5 text-sm">
                <Var>{currentEmail}</Var>
              </span>
            </p>
          </T>
          <T>
            <p>
              This invite is for
              <span className="mx-1 inline-flex items-center rounded-xs border border-muted bg-muted/40 px-2 py-0.5 text-sm">
                <Var>{invitedEmail}</Var>
              </span>
            </p>
          </T>
        </div>
      </div>
      <SignOut asButton className="w-full" />
    </InviteStatusCard>
  );
}
