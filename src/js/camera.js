import {
  PerspectiveCamera,
  Vector3
} from "three";
import {
  component
} from "bidello";
import OrbitControls from "orbit-controls-es6";
import renderer from "/js/renderer";


function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

class Camera extends component(PerspectiveCamera) {
  constructor() {
    super(35, 0, 0.1, 1000);
  }

  init() {
    this.position.set(90, 40, 0);
    this.lookAt(new Vector3(0, 0, 0));

    if (!detectMob()) {
      this.initOrbitControl();
    }
  }

  initOrbitControl() {
    const controls = new OrbitControls(this, renderer.domElement);

    controls.enabled = true;
    controls.maxDistance = 1500;
    controls.minDistance = 0;
  }

  calculateUnitSize(distance = this.position.z) {
    const vFov = (this.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFov / 2) * distance;
    const width = height * this.aspect;

    return {
      width,
      height,
    };
  }

  onResize({
    ratio
  }) {
    this.aspect = ratio;
    this.unit = this.calculateUnitSize();
    this.updateProjectionMatrix();
  }
}

export default new Camera();