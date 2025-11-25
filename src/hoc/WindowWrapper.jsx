import React from 'react'
import { useLayoutEffect, useRef } from 'react';
import  useWindowStore  from '#store/window.js';
import { useGSAP } from '@gsap/react';
import Draggable from 'gsap/Draggable';
import { current } from 'immer';
const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const {focusWindow , windows} = useWindowStore();
        const {isOpen, zIndex} = windows[windowKey]
        const ref = useRef(null);
        
        useGSAP(() => {
            const el = ref.current
            if (!el || !isOpen) return
            el.style.display = "block"
        }, [isOpen])

        useGSAP(() => {
            const el = ref.current
            if (!el) return;
            const [instance] = Draggable.create(el, {onPress: () => focusWindow(windowKey)})

            return () => instance.kill();
        }, [])

        useLayoutEffect(() => {
            const el = ref.current
            if (!el) return
            el.style.display = isOpen ? "block" : "none"
        }, [isOpen])

        return (<section 
         id={windowKey}
         ref={ref} 
         style={{zIndex}} 
         className="absolute"
         ><Component {...props} /></section>)
    }   
    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || 'Component'})`;
    return Wrapped;
}

export default WindowWrapper