import { useEffect, useState } from 'react';

import * as api from '@/api/vm.ts';
import { attempt } from '@/lib/feedback.ts';

export type RebootReason = 'hostname' | 'overdrive' | 'systemUpdate';

// What waits for a reboot, read from the server. `refreshOn` values that change (a new device
// name saved) read it again.
export function useRebootPending(...refreshOn: unknown[]) {
  const [reasons, setReasons] = useState<RebootReason[]>([]);

  useEffect(() => {
    attempt(() => api.getRebootPending(), { quiet: true }).then((rsp) => {
      if (rsp?.data?.reasons) setReasons(rsp.data.reasons);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refreshOn);

  return reasons;
}
