'use client';

import { updateOrganizationAdvancedModeAction } from '@/actions/organization/update-organization-advanced-mode-action';
import { organizationAdvancedModeSchema } from '@/actions/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@comp/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@comp/ui/form';
import { Switch } from '@comp/ui/switch';
import { zodResolver } from '@hookform/resolvers/zod';
import { T, useGT } from 'gt-next';
import { Loader2 } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

export function UpdateOrganizationAdvancedMode({
  advancedModeEnabled,
}: {
  advancedModeEnabled: boolean;
}) {
  const gt = useGT();
  const updateAdvancedMode = useAction(updateOrganizationAdvancedModeAction, {
    onSuccess: () => {
      toast.success(gt('Advanced mode setting updated'));
    },
    onError: () => {
      toast.error(gt('Error updating advanced mode setting'));
    },
  });

  const form = useForm<z.infer<typeof organizationAdvancedModeSchema>>({
    resolver: zodResolver(organizationAdvancedModeSchema),
    defaultValues: {
      advancedModeEnabled,
    },
  });

  const onSubmit = (data: z.infer<typeof organizationAdvancedModeSchema>) => {
    updateAdvancedMode.execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <T>Advanced Mode</T>
            </CardTitle>
            <CardDescription>
              <T>
                <div className="max-w-[600px]">
                  Enable advanced mode to access additional features like the Controls page. This
                  setting is designed for users who need access to more detailed compliance management
                  tools.
                </div>
              </T>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="advancedModeEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-xs border p-3">
                  <div className="space-y-0.5">
                    <T>
                      <div className="text-base">Advanced Mode</div>
                    </T>
                    <T>
                      <div className="text-muted-foreground text-sm">
                        Show advanced features and pages
                      </div>
                    </T>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        // Auto-submit when switch is toggled
                        form.handleSubmit(onSubmit)();
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <T>
              <div className="text-muted-foreground text-xs">
                Changes are saved automatically when toggled.
              </div>
            </T>
            {updateAdvancedMode.status === 'executing' && (
              <T>
                <div className="flex items-center text-muted-foreground text-sm">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </div>
              </T>
            )}
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
