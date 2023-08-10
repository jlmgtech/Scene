import React, { useState, useEffect } from 'react';

function getWrapper() {
  let numStates = 0;
  return function Wrapper({comp, onmount}) {

    useEffect(() => {
      onmount();
    }, [comp, onmount]);

    let oldNumStates = numStates;
    numStates = 0;
    while (typeof comp === "function") {
      numStates++;
      if (numStates > oldNumStates && oldNumStates !== 0) {
        console.log("TOO MANY STATES");
      }
      // eslint-disable-next-line
      comp = comp(...useState(null));
    }
    if (numStates < oldNumStates) {
      console.log("TOO FEW STATES");
    }

    return <>{comp}</>;
  };
}

/// parse the function string to get the number of states
/// currently only supports arrow functions
/// this is a hack, but it works
/// we could make this more efficient by parsing only as much as we need.
function hashStates(comp) {
  const states = [];
  const parts = comp.toString().split(/=>/g).map(s => s.trim());
  for (const part of parts) {
    if (part[0] !== "(") break;
    states.push(part);
  }
  return states.join("|");
}

export default function WrapperShot(classDef) {
  return function(...args) {

    classDef.apply(this, args);

    let Wrapper = getWrapper();
    let oldStateHash = "";

    const oldShow = this.show;
    this.show = function(comp, opts) {

      /* flush the states when show is called with different states */
      const stateHash = hashStates(comp);
      if (stateHash !== oldStateHash) {
        // getting a new wrapper prevents react from trying to reuse the old one
        // and keeps it from complaining about "different number of hooks".
        Wrapper = getWrapper();
      }
      oldStateHash = stateHash;
      /* END clean slate */

      return new Promise(async (resolve) => {
        await oldShow(<Wrapper comp={comp} onmount={resolve} />, opts);
      });
    }
  };
};
