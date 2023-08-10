export default function Shot({setComp}) {
  this.initialize = async () => {};
  this.show = async (comp, _opts) => {
    setComp(comp);
  };
  this.reset = async () => {
    return this.show(<div></div>);
  };
  this.finalize = async () => {};
}
