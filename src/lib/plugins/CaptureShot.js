export default function CaptureShot(classDef) {
  return function(...args) {
    classDef.apply(this, args);
    this.resolver = () => {};

    this.yeet = async (value) => {
      // yeet just resolves the promise returned by show
      this.resolver(value);
    };

    this.capture = async (comp, opts) => {
      const result = await Promise.all([
        this.show(comp, opts),
        new Promise(resolve => {
          this.resolver = resolve;
        })
      ]);
      return result[1];
    }
  };
}
