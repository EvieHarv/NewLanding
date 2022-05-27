import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { gsap } from "gsap"

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        this.setInstance()
        this.setControls()

        if(!this.debug.active)
            this.initAnimation()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000)
        // this.instance.position.set(0, 0, 25)
        this.instance.position.set(13, -12, 20)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enabled = false
        if (this.debug.active){
            this.controls.enabled = true
        }
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    initAnimation()
    {
        gsap.to(this.instance.position, 
            { delay: 0.5, duration: 5, ease: "power2.inOut", 
            x: 0, y: 0, z: 30}
        )
    }

    update()
    {
        this.controls.update()
    }
}