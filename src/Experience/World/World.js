import Experience from '../Experience.js'
import * as THREE from 'three'
import StarParticles from './StarParticles.js'
import Planet from './Planet.js'
import Ring from './Ring.js'
import E from './E.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.mainObjectGroup = new THREE.Group()
        this.scene.add(this.mainObjectGroup)

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            // this.environment = new Environment()
            this.planet = new Planet()
            this.eSky = new E()
            this.ring = new Ring()
            this.starParticles = new StarParticles(2500)
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
    }
}