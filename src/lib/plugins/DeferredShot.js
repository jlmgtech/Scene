//import ShotPlugin from "./ShotPlugin";

//export default class DeferredShot extends ShotPlugin {
//  constructor(parent) {
//    super(parent);
//    this.deferrals = [];
//  }
//  defer(action) {
//    this.deferrals.push(action);
//  }
//  async finalize() {
//    let action;
//    while (action = this.deferrals.pop()) {
//      await action();
//    }
//    return this.parent.finalize();
//  }
//};

export default function DeferredShot(classDef) {
  return function(...args) {

    classDef.apply(this, args);

    this.deferrals = [];
    this.defer = function(action) {
      this.deferrals.push(action);
    };

    const oldFinalize = this.finalize;
    this.finalize = async function(...args) {
      let action;
      while (action = this.deferrals.pop()) {
        await action();
      }
      return await oldFinalize(...args);
    };
  };
}
