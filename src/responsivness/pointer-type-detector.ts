import { PointerType } from "./pointer-type.js";

export default class PointerTypeDetector {
    static detect() {
        if (window.matchMedia('(pointer: fine)').matches) {
            return PointerType.Fine;
        }

        if (window.matchMedia('(pointer: coarse)').matches) {
            return PointerType.Coarse;
        }

        return PointerType.None;
    }
}
