import { spawn } from 'child_process';

export default function SpawnCommandPromise (cmd: string, opt: {}): Promise<any> {
  return new Promise((r, d) => {
    const child = spawn(cmd, { shell: true, ...opt } as any);
    const handler = f => (resp) => {
      f(resp);
      child.unref();
    };
    child.once('exit', handler(r));
    child.once('error', handler(d));
  });
}