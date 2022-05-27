import * as THREE from 'three'
import Experience from '../Experience.js'
import { gsap } from "gsap"

export default class E
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.mainObjectGroup = this.experience.world.mainObjectGroup
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.resource = this.resources.items.EModel

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('E')
        }

        this.setMaterial()
        this.setMesh()

        this.initOpacityAnimation()
    }

    setMesh()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.model.position.x = -.5
        this.model.position.y = 0.2
        this.model.position.z = 1.05
        this.model.rotation.x = Math.PI/2
        this.model.rotation.y = -0.35 // kinda arbitrary
        this.mainObjectGroup.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.material = this.material
            }
        })

        if (this.debug.active)
        {
            this.debugFolder.add(this.model.position, "x").min(-10).max(10).step(.001).name("xPosition")
            this.debugFolder.add(this.model.position, "y").min(-10).max(10).step(.001).name("yPosition")
            this.debugFolder.add(this.model.position, "z").min(-10).max(10).step(.001).name("zPosition")
            this.debugFolder.add(this.model.rotation, "x").min(-Math.PI*2).max(Math.PI*2).step(.001).name('xRotation')
            this.debugFolder.add(this.model.rotation, "y").min(-Math.PI*2).max(Math.PI*2).step(.001).name('yRotation')
            this.debugFolder.add(this.model.rotation, "z").min(-Math.PI*2).max(Math.PI*2).step(.001).name('zRotation')
        }
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            color: "#ffffff",
            transparent: true,
            opacity: 0
        })
    }

    initOpacityAnimation()
    {
        gsap.to(this.material, 
            { delay: 3.0, duration: 5, ease: "power2.inOut", 
            opacity: 1}
        )
    }
}