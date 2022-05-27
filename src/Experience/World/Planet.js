import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Planet
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.mainObjectGroup = this.experience.world.mainObjectGroup

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(5, 128, 128)
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
            color: "#5daac6",
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mainObjectGroup.add(this.mesh)
    }
}