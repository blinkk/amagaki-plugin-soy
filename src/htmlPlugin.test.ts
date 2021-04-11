import test, { ExecutionContext } from 'ava';

import {Pod} from '@amagaki/amagaki/src/pod';

test('Doc sort', async (t: ExecutionContext) => {
  const pod = new Pod('./example/');
  await pod.builder.export();
  t.pass();
});