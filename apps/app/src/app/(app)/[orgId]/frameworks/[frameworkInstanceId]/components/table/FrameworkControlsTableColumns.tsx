'use client';

import { StatusIndicator, StatusType } from '@/components/status-indicator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@comp/ui/tooltip';
import type { Policy } from '@db';
import type { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { T, Var, useGT } from 'gt-next';

export type OrganizationControlType = {
  id: string;
  name: string;
  description: string | null;
  frameworkInstanceId: string;
  policies: Policy[];
};

export function getControlStatusForPolicies(policies: Policy[]): StatusType {
  if (!policies || policies.length === 0) return 'not_started';

  const totalPolicies = policies.length;

  const completedPolicies = policies.filter((policy) => {
    return policy.status === 'published';
  }).length;

  if (completedPolicies === 0) return 'not_started';
  if (completedPolicies === totalPolicies) return 'completed';
  return 'in_progress';
}

function isPolicyCompleted(policy: Policy): boolean {
  if (!policy) return false;
  return policy.status === 'published';
}

export function FrameworkControlsTableColumns(): ColumnDef<OrganizationControlType>[] {
  const { orgId } = useParams<{ orgId: string }>();
  const gt = useGT();

  return [
    {
      id: 'name',
      accessorKey: 'name',
      header: gt('Control'),
      cell: ({ row }) => {
        return (
          <div className="flex w-[300px] flex-col">
            <Link href={`/${orgId}/controls/${row.original.id}`} className="flex flex-col">
              <span className="truncate font-medium">{row.original.name}</span>
            </Link>
          </div>
        );
      },
    },
    {
      id: 'category',
      accessorKey: 'name',
      header: gt('Category'),
      cell: ({ row }) => (
        <div className="w-[200px]">
          <span className="text-sm">{row.original.name}</span>
        </div>
      ),
    },
    {
      id: 'status',
      accessorKey: 'policies',
      header: gt('Status'),
      cell: ({ row }) => {
        const policies = row.original.policies || [];
        const status = getControlStatusForPolicies(policies);

        const totalPolicies = policies.length;
        const completedPolicies = policies.filter(isPolicyCompleted).length;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-[200px]">
                  <StatusIndicator status={status} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <T>
                  <div className="text-sm">
                    <p>Progress: <Var>{Math.round((completedPolicies / totalPolicies) * 100) || 0}</Var>%</p>
                    <p>
                      Completed: <Var>{completedPolicies}</Var>/<Var>{totalPolicies}</Var> policies
                    </p>
                  </div>
                </T>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];
}
