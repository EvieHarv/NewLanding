import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor
{
    constructor(dist)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.mainObjectGroup = this.experience.world.mainObjectGroup
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('ring')
        }

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.TorusGeometry(7.5, .175, 128, 128)
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            color: "#ffffff",
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.mainObjectGroup.add(this.mesh)

        if(this.debug.active) {
            this.debugFolder.add(this.mesh.rotation, 'x').min(-Math.PI).max(Math.PI).step(.01).name('xRotation')
            this.debugFolder.add(this.mesh.rotation, 'y').min(-Math.PI).max(Math.PI).step(.01).name('yRotation')
        }
    }
}