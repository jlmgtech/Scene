import React from 'react';
import ReactDOM from 'react-dom/client';
import Scene from "./lib/Scene";
import { delay } from "./lib/utils";

const inventory = {
  items: [
    //{
    //  name: 'Banana',
    //  price: 1.99,
    //  quantity: 10
    //},
    //{
    //  name: 'Apple',
    //  price: 2.99,
    //  quantity: 5
    //},
    //{
    //  name: 'Orange',
    //  price: 3.99,
    //  quantity: 2
    //}
  ]
};

async function main(shot) {
  //await shot.show((a, seta) => <div>hi</div>);
  //await delay(1000);
  //await shot.show((a, seta) => (b, setb) => <div>there</div>);
  //await delay(1000);
  //await shot.show(<div>done</div>);
  //return;

  await shot.show(<>
    <h1>Inventory Setup Wizard</h1>
    <hr />
    <Scene director={inventorySetup} />
  </>);
}

async function inventorySetup(shot) {
  for (;;) {
    if (inventory.items.length === 0) {
      await shot.show(<>
        <h2 style={{opacity:0}}>Inventory is empty</h2>
      </>);
      await delay(500);
      await shot.show(<>
        <h2 style={{opacity:1, transition:"opacity 1s linear"}}>Inventory is empty</h2>
      </>);
      await delay(1000);
      await shot.capture(<>
        <h2>Inventory is empty</h2>
        <div> You'll need at least one item to continue </div>
        <button onClick={() => shot.yeet()}>+ Add Item</button>
      </>);
    } else {
      await shot.capture(<>
        <h2>Inventory</h2>
        <ul>
          {inventory.items.map(item => (
            <li key={item.name}>{item.name} - {item.quantity} @ ${item.price}</li>
          ))}
        </ul>
        <button onClick={() => shot.yeet()}>+ Add Item</button>
      </>);
    }
    await addItem(shot);
    await delay(1000);
    console.log("inventory", inventory);
  }
}

async function addItem(shot) {
  let feedback = [];
  let item;
  for (;;) {
    item = await shot.capture(
      (name, setname) =>
      (price, setprice) =>
      (quantity, setquantity) =>
        <>
      <h2>Add Item</h2>
      <div>{feedback.map(f => <div key={f}>{f}</div>)}</div>
      <form onSubmit={(e) => {e.preventDefault(); shot.yeet({name, price, quantity}); return false;}}>
        <label>
          Name:
          <input type="text" value={name??""} onChange={e => setname(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price??""} onChange={e => setprice(e.target.value)} />
        </label>
        <label>
          Quantity:
          <input type="number" value={quantity??""} onChange={e => setquantity(e.target.value)} />
        </label>
        <button type="submit">Add</button>
      </form>
    </>);

    feedback = [];

    if (!item.name) {
      feedback.push("Name is required");
    }
    if (!item.price) {
      feedback.push("Price is required");
    }
    if (!item.quantity && item.quantity !== 0) {
      feedback.push("Quantity is required");
    }

    if (feedback.length === 0) {
      break;
    }
  }

  await shot.show(<div>Adding {item.name}...</div>);
  await delay(1000);
  inventory.items.push(item);
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Scene director={main} />);
