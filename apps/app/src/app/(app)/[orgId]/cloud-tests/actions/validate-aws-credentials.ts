'use server';

import { DescribeRegionsCommand, EC2Client } from '@aws-sdk/client-ec2';
import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';
import { getGT } from 'gt-next/server';
import { z } from 'zod';
import { authActionClient } from '../../../../../actions/safe-action';

const validateAwsCredentialsSchema = z.object({
  accessKeyId: z.string(),
  secretAccessKey: z.string(),
});

export const validateAwsCredentialsAction = authActionClient
  .inputSchema(validateAwsCredentialsSchema)
  .metadata({
    name: 'validate-aws-credentials',
    track: {
      event: 'validate-aws-credentials',
      channel: 'cloud-tests',
    },
  })
  .action(async ({ parsedInput: { accessKeyId, secretAccessKey } }) => {
    const gt = await getGT();
    try {
      // First, validate credentials using STS
      const stsClient = new STSClient({
        region: 'us-east-1', // Default region for validation
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });

      const identity = await stsClient.send(new GetCallerIdentityCommand({}));

      // Get available regions
      const ec2Client = new EC2Client({
        region: 'us-east-1',
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });

      const regionsResponse = await ec2Client.send(new DescribeRegionsCommand({}));

      // Map of common region codes to friendly names
      const regionNames: Record<string, string> = {
        'us-east-1': gt('US East (N. Virginia)'),
        'us-east-2': gt('US East (Ohio)'),
        'us-west-1': gt('US West (N. California)'),
        'us-west-2': gt('US West (Oregon)'),
        'eu-west-1': gt('Europe (Ireland)'),
        'eu-west-2': gt('Europe (London)'),
        'eu-west-3': gt('Europe (Paris)'),
        'eu-central-1': gt('Europe (Frankfurt)'),
        'eu-north-1': gt('Europe (Stockholm)'),
        'eu-south-1': gt('Europe (Milan)'),
        'ap-southeast-1': gt('Asia Pacific (Singapore)'),
        'ap-southeast-2': gt('Asia Pacific (Sydney)'),
        'ap-northeast-1': gt('Asia Pacific (Tokyo)'),
        'ap-northeast-2': gt('Asia Pacific (Seoul)'),
        'ap-northeast-3': gt('Asia Pacific (Osaka)'),
        'ap-south-1': gt('Asia Pacific (Mumbai)'),
        'ap-east-1': gt('Asia Pacific (Hong Kong)'),
        'ca-central-1': gt('Canada (Central)'),
        'sa-east-1': gt('South America (São Paulo)'),
        'me-south-1': gt('Middle East (Bahrain)'),
        'af-south-1': gt('Africa (Cape Town)'),
      };

      const regions = (regionsResponse.Regions || [])
        .filter((region) => region.RegionName)
        .map((region) => {
          const code = region.RegionName!;
          const friendlyName = regionNames[code] || code;
          return {
            value: code,
            label: `${friendlyName} (${code})`,
          };
        })
        .sort((a, b) => a.value.localeCompare(b.value));

      return {
        success: true,
        accountId: identity.Account,
        regions,
      };
    } catch (error) {
      console.error('AWS credential validation failed:', error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : gt('Failed to validate AWS credentials. Please check your access key and secret.'),
      };
    }
  });
