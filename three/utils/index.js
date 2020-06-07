import * as THREE from '../build/three.module.js'

export const createLight = (color, intensity) => {
  const light = new THREE.DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)
  return light
}

export const createBoxGeometry = (boxOpts) => {
  return function () {
    const { boxWidth, boxHeight, boxDepth } = boxOpts
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    return geometry
  }
}

export const createPhongMaterial = (mateOpts) => {
  return function () {
    const material = new THREE.MeshPhongMaterial(mateOpts)
    return material
  }
}

export const createMaterial = (type, mateOpts) => {
  return function () {
    switch (type) {
      case 'Phong':
        return new THREE.MeshPhongMaterial(mateOpts)
      default:
        return new THREE.MeshBasicMaterial(mateOpts)
    }
  }
}
