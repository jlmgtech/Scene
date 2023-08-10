import React, { useState } from 'react';

function Wrapper({comp}) {

  // @onPreprocessComponent:
  while (typeof comp === "function") {
    // eslint-disable-next-line
    comp = comp(...useState(null));
  }

  return <>{comp}</>;
}

export default function WrapperShot(classDef) {
  return function(...args) {

    classDef.apply(this, args);

    const oldShow = this.show;
    this.show = async function(comp, opts) {
      oldShow(<Wrapper comp={comp} />, opts);
    }
  };
};
