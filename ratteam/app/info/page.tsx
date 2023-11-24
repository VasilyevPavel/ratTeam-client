"use client";
export default function Info() {
  async function testHendler() {
    try {
      const res = await fetch(`https://5pg67c-3002.csb.app/api/auth/test`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const test = await res.json();
      console.log(test);
    } catch (err) {
      console.log(err);
    }
  }
  return <button onClick={testHendler}>test</button>;
}
