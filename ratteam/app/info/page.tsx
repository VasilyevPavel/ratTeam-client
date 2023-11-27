"use client";
export default function Info() {
  async function testHendler() {
    try {
      const res = await fetch(`http://195.80.50.230:3001/api/auth/test`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "no-cors",
      });
      const test = await res.json();
      console.log(test);
    } catch (err) {
      console.log(err);
    }
  }
  return <button onClick={testHendler}>test</button>;
}
