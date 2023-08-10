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
      // eslint-disable-next-line no-cond-assign
      while (action = this.deferrals.pop()) {
        await action();
      }
      return await oldFinalize(...args);
    };
  };
}
