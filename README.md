# Scene
Reusable UI flows

### Getting Started

```js
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import Scene from "@jlmgtech/scene";
    import { delay } from "@jlmgtech/scene-utils";

    // look here:
    async function main(shot) {
        await shot.show(<div>Hello</div>);
        await delay(1000);
        await show.show(<div>world!</div>);
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Scene director={main} />);
```

### Reference

#### shot.show(component): Promise<void>

```js
    await show(<div>hi</div>);
```

There's also a shortcut for doing local useState:

```js
    await show(
        (fname, setFname) =>
        (lname, setLname) =>
        <>
            <div>Hello, {fname} {lname}!</div>
            <input onChange={e => setFname(e.target.value)} />
            <input onChange={e => setLname(e.target.value)} />
        </>
    );
```

#### shot.defer(action)

```js
    await shot.show("hi");
    await shot.defer(() => console.log("world!");
    await shot.defer(() => console.log("Hello ");
    // when the function ends or is interrupted, deferred actions are run in
    // reverse order.
```

#### shot.capture(component): Promise<any>
#### shot.yeet(value: any): void

```js
    await shot.capture(<button onClick={shot.yeet}>ok</button>);
    await shot.capture(
        (fname, setFname) =>
        (lname, setLname) =>
        <>
            <div>Hello, {fname} {lname}!</div>
            <input onChange={e => setFname(e.target.value)} />
            <input onChange={e => setLname(e.target.value)} />
            <button onClick={()=> shot.yeet({fname, lname})}>OK</button>
        </>
    );
```

#### shot.reset(): Promise<void>

```js
    await shot.show(<div><input /></div>);
    // if we show again, the input will contain whatever it had before:
    await shot.show(<div><input /></div>);
    await shot.reset();
    // but not anymore...
    await shot.show(<div><input /></div>);
```

### Coming Soon:
* animatable transitions between show calls (anim decorator)
* realtime updates from external data sources (realtime decorator)
