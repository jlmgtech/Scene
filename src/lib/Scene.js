import {useEffect, useState} from "react";
import Shot from "./plugins/Shot";
import WrapperShot from "./plugins/WrapperShot";
import DeferredShot from "./plugins/DeferredShot";
import CaptureShot from "./plugins/CaptureShot";

export default function Scene({director}) {
  const [comp, setComp] = useState(<div>loading</div>);
  useEffect(() => {

    // plugins are class decorators:
    const ShotClass = CaptureShot(WrapperShot(DeferredShot(Shot)));

    const opts = {setComp};
    const shot = new ShotClass(opts);
    shot.initialize().then(() => director(shot))
    return async () => {
      await shot.finalize();
    };
  }, [director]);

  return comp;
}
