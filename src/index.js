import React from 'react';
import ReactDOM from 'react-dom/client';
import Scene from "./lib/Scene";
import { delay } from "./lib/utils";

async function sub(shot) {
  shot.defer(() => console.log("deferred A"));
  shot.defer(() => console.log("deferred B"));
  await shot.show(
    (a, setA) => 
      <div>
        <div> clicked {a} times. </div>
        <button onClick={() => setA(a + 1)}> click me </button>
      </div>
  );
}

async function main(shot) {
  const rsp = await shot.capture(<button onClick={() => shot.yeet(1)}> click me </button>);
  await shot.show(<div> result is {rsp} </div>);
  await delay(1000);
  await shot.show(<div> loaded </div>);
  for (;;) {
    for (let i = 0; i < 5; i++) {
      await shot.show(<>
        <div> counted {i} seconds. </div>
        <Scene director={sub} />
        <Scene director={sub} />
        <Scene director={sub} />
        <Scene director={sub} />
      </>);
      await delay(1000);
    }
    await shot.show(<div> done </div>);
    await delay(1000);
    await shot.reset();
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Scene director={main} />);
