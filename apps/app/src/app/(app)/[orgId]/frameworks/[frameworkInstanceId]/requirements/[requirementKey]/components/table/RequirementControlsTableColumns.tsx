'use client';

import { StatusIndicator } from '@/components/status-indicator';
import { isPolicyCompleted } from '@/lib/control-compliance';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@comp/ui/tooltip';
import type { Control, Policy, Task } from '@db';
import type { ColumnDef } from '@tanstack/react-table';
import { T, Num, useGT } from 'gt-next';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getControlStatus } from '../../../../../lib/utils';

export type OrganizationControlType = Control & {
  policies: Policy[];
};

export function RequirementControlsTableColumns({
  tasks,
}: {
  tasks: (Task & { controls: Control[] })[];
}): ColumnDef<OrganizationControlType>[] {
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
      id: 'status',
      accessorKey: 'policies',
      header: gt('Status'),
      cell: ({ row }) => {
        const controlData = row.original;
        const policies = controlData.policies || [];

        const status = getControlStatus(policies, tasks, controlData.id);

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
                <div className="text-sm">
                  <T>
                    <p>
                      Progress: <Num>{Math.round((completedPolicies / totalPolicies) * 100) || 0}</Num>%
                    </p>
                  </T>
                  <T>
                    <p>
                      Completed: <Num>{completedPolicies}</Num>/<Num>{totalPolicies}</Num> policies
                    </p>
                  </T>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];
}
