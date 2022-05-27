import './style.css'

import Experience from './Experience/Experience.js'

import { gsap } from "gsap"

const experience = new Experience(document.querySelector('canvas.webgl'))

gsap.to("#overlay", 
    { delay: 7, duration: 2, ease: "power2.inOut", 
    opacity: .95}
)

gsap.to("#mainText", 
    { delay: 9, duration: .1, ease: "power2.inOut", 
    opacity: 1}
)