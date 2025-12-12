'use client';

import { createPolicyAction } from '@/actions/policies/create-new-policy';
import { createPolicySchema, type CreatePolicySchema } from '@/actions/schema';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@comp/ui/accordion';
import { Button } from '@comp/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@comp/ui/form';
import { Input } from '@comp/ui/input';
import { Textarea } from '@comp/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { T, useGT } from 'gt-next';
import { ArrowRightIcon } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { useQueryState } from 'nuqs';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function CreateNewPolicyForm() {
  const gt = useGT();
  const [_, setCreatePolicySheet] = useQueryState('create-policy-sheet');

  const createPolicy = useAction(createPolicyAction, {
    onSuccess: () => {
      toast.success(gt('Policy successfully created'));
      setCreatePolicySheet(null);
    },
    onError: () => {
      toast.error(gt('Failed to create policy'));
    },
  });

  const form = useForm<CreatePolicySchema>({
    resolver: zodResolver(createPolicySchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = (data: CreatePolicySchema) => {
    createPolicy.execute(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="scrollbar-hide h-[calc(100vh-250px)] overflow-auto">
          <div>
            <Accordion type="multiple" defaultValue={['policy']}>
              <AccordionItem value="policy">
                <AccordionTrigger>
                  <T>Policy Details</T>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <T>Title</T>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              autoFocus
                              className="mt-3"
                              placeholder={gt('Title')}
                              autoCorrect="off"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            <T>Description</T>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              className="mt-3 min-h-[80px]"
                              placeholder={gt('Description')}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit" variant="default" disabled={createPolicy.status === 'executing'}>
              <T>
                <div className="flex items-center justify-center">
                  Create
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </div>
              </T>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
