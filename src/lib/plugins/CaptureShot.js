//import ShotPlugin from "./ShotPlugin";
//export default class CaptureShot extends ShotPlugin {
//
//  constructor(parent) {
//    super(parent);
//    this.resolver = () => {};
//  }
//
//  // by adding a function here, it is now available to all plugins in the
//  // passthrough pipeline
//  async yeet(value) {
//    // yeet just resolves the promise returned by show
//    this.resolver(value);
//  }
//
//  async capture(comp, opts) {
//    const [_, result] = await Promise.all([
//      this.show(comp, opts),
//      new Promise(resolve => {
//        this.resolver = resolve;
//      })
//    ]);
//    return result;
//  }
//
//};

export default function CaptureShot(classDef) {
  return function(...args) {
    classDef.apply(this, args);
    this.resolver = () => {};

    this.yeet = async (value) => {
      // yeet just resolves the promise returned by show
      this.resolver(value);
    };

    this.capture = async (comp, opts) => {
      const [_, result] = await Promise.all([
        this.show(comp, opts),
        new Promise(resolve => {
          this.resolver = resolve;
        })
      ]);
      return result;
    }
  };
}
