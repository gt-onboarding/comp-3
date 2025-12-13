'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { useGT } from 'gt-next';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { RequirementTableData } from './ControlRequirementsTable';

export function useControlRequirementsTableColumns(): ColumnDef<RequirementTableData>[] {
  const gt = useGT();

  return [
    {
      id: 'type',
      accessorKey: 'type',
      header: gt('Type'),
      cell: ({ row }) => {
        const requirement = row.original;
        return requirement.policy ? gt('policy') : requirement.task ? gt('task') : '';
      },
      size: 100,
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: gt('Description'),
      size: 1000,
      cell: ({ row }) => {
        const description = row.original.description || ''; // Default to empty string if null
        const maxLength = 300; // Increased character limit
        const displayText =
          description.length > maxLength ? `${description.substring(0, maxLength)}...` : description;

        return (
          <div className="w-full pr-4" title={description}>
            {displayText}
          </div>
        );
      },
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: gt('Status'),
      size: 80,
      cell: ({ row }) => {
        const requirement = row.original;
        const isCompleted = requirement.policy
          ? requirement.policy?.status === 'published'
          : requirement.task
            ? requirement.task?.status === 'done' || requirement.task?.status === 'not_relevant'
            : false;

        return (
          <div className="flex items-center justify-center">
            {isCompleted ? (
              <CheckCircle2 size={16} className="text-primary" />
            ) : (
              <XCircle size={16} className="text-red-500" />
            )}
          </div>
        );
      },
    },
  ];
}
