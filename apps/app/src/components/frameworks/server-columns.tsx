import { getGT } from 'gt-next/server';

export async function getServerColumnHeaders() {
  const gt = await getGT();
  return {
    name: gt('Control'),
    status: gt('Status'),
    artifacts: gt('Artifacts'),
  };
}
