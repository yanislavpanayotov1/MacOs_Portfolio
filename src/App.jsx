import React from 'react'
import { NavBar, Welcome, Dock } from "#components"
import { Draggable } from 'gsap/all'
import { Terminal, Safari, Resume, Finder, Text, Image, Contact } from '#windows/index.js'
import { gsap } from "gsap";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
       <NavBar/>
       <Welcome/>
       <Dock/>

       <Terminal/>
       <Safari/>
       <Resume/>
      <Finder/>
      <Text/>
      <Image/>
      <Contact/>
    </main>
  )
}

export default App