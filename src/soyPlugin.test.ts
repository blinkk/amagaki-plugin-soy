import test, { ExecutionContext } from 'ava';

import {Pod} from '@amagaki/amagaki/src/pod';

test('Build example', async (t: ExecutionContext) => {
  const pod = new Pod('./example/');
  await pod.builder.export();
  t.pass();
});