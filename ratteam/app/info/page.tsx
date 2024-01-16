'use client';
export default function Info() {
  async function testHendler() {
    try {
      const res = await fetch('https://z65zk9-3002.csb.app/api/auth/test', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      const test = await res.json();
    } catch (err) {
      console.log(err);
    }
  }
  return <button onClick={testHendler}>test</button>;
}
