import React from 'react'
import { NavBar, Welcome, Dock } from "#components"
import { Draggable } from 'gsap/all'
import { Terminal } from '#windows/index.js'
import { gsap } from "gsap";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
       <NavBar/>
       <Welcome/>
       <Dock/>
       <Terminal/>
    </main>
  )
}

export default App