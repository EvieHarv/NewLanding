import * as THREE from 'three'
import Experience from '../Experience.js'

export default class StarParticles 
{
    constructor(numParticles)
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        
        this.count = numParticles
        this.starColor = 0xffe2d5
        this.radius = 50

        this.setGeometry()
        this.setMaterial()
        this.setMesh()

        this.createNew()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('particles')
            this.debugFolder.add(this, "count").min(0).max(100000).step(1).onFinishChange(() => { this.createNew() })
            this.debugFolder.addColor(this, "starColor").onChange(() => { this.createNew(); console.log(this.starColor) })
        }        
    }

    setGeometry()
    {
        this.geometry = new THREE.BufferGeometry()

        const vertices = new Float32Array(this.count * 3)

        for (let i = 0; i < this.count; i++) {
            const u = Math.random()
            const v = Math.random()

            const rho = this.radius 
            const phi = Math.acos(2 * v - 1)
            const theta = 2 * Math.PI * u

            vertices[i*3 + 0] = rho * Math.sin(phi) * Math.cos(theta)
            vertices[i*3 + 1] = rho * Math.sin(phi) * Math.sin(theta)
            vertices[i*3 + 2] = rho * Math.cos(phi)
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial({ color: new THREE.Color(this.starColor), size: .2})
    }

    setMesh()
    {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    createNew()
    {
        this.geometry.dispose()
        this.scene.remove(this.mesh)
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }
}