'use client';

import { useIntegrationMutations } from '@/hooks/use-integration-platform';
import { Button } from '@comp/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@comp/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@comp/ui/tabs';
import { T, Var, useGT } from 'gt-next';
import { Loader2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface CloudProvider {
  id: string; // Provider slug (aws, gcp, azure)
  connectionId: string; // The actual connection ID
  name: string;
}

interface CloudSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  connectedProviders: CloudProvider[];
  onUpdate: () => void;
}

export function CloudSettingsModal({
  open,
  onOpenChange,
  connectedProviders,
  onUpdate,
}: CloudSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<string>(connectedProviders[0]?.id || 'aws');
  const [isDeleting, setIsDeleting] = useState(false);
  const { disconnectConnection } = useIntegrationMutations();
  const gt = useGT();

  const handleDisconnect = async (provider: CloudProvider) => {
    if (
      !confirm(
        gt('Are you sure you want to disconnect this cloud provider? All scan results will be deleted.'),
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      const result = await disconnectConnection(provider.connectionId);

      if (result.success) {
        toast.success(gt('Cloud provider disconnected'));
        onUpdate();
        onOpenChange(false);
      } else {
        toast.error(result.error || gt('Failed to disconnect'));
      }
    } catch (error) {
      console.error('Disconnect error:', error);
      toast.error(gt('An unexpected error occurred'));
    } finally {
      setIsDeleting(false);
    }
  };

  if (connectedProviders.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <T>
            <DialogTitle>Manage Cloud Connections</DialogTitle>
          </T>
          <T>
            <DialogDescription>
              Manage your cloud provider connections. To update credentials, disconnect and reconnect.
            </DialogDescription>
          </T>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList
            className="grid w-full"
            style={{ gridTemplateColumns: `repeat(${connectedProviders.length}, 1fr)` }}
          >
            {connectedProviders.map((provider) => (
              <TabsTrigger key={provider.id} value={provider.id}>
                {provider.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {connectedProviders.map((provider) => (
            <TabsContent key={provider.id} value={provider.id} className="space-y-4">
              <div className="bg-muted/50 rounded-lg border p-4">
                <T>
                  <p className="text-muted-foreground text-sm">
                    <Var>{provider.name}</Var> is connected. Credentials are securely stored using IAM Role assumption.
                  </p>
                </T>
              </div>

              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <T>
                    <span className="text-sm font-medium">Connection Status</span>
                  </T>
                  <T>
                    <span className="text-sm text-green-600 dark:text-green-400">Active</span>
                  </T>
                </div>
                <T>
                  <p className="text-xs text-muted-foreground">
                    To update credentials, disconnect this provider and reconnect with new IAM role settings.
                  </p>
                </T>
              </div>

              <DialogFooter className="flex justify-end">
                <Button
                  variant="destructive"
                  onClick={() => handleDisconnect(provider)}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <T>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Disconnecting...
                    </T>
                  ) : (
                    <T>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Disconnect
                    </T>
                  )}
                </Button>
              </DialogFooter>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
