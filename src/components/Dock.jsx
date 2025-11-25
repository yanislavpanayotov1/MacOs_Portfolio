import React from 'react'
import {Tooltip} from 'react-tooltip'
import {dockApps} from '#constants/index.js'
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";
import useWindowStore from '#store/window.js';

const Dock = () => {

    const {openWindow, closeWindow, focusWindow, windows} =  useWindowStore();

    const dockRef = React.useRef(null);

    useGSAP(() => {
        const dock = dockRef.current;
        if (!dock) return;

        const icons = dock.querySelectorAll('.dock-icon');

        const animateIcons = (mousex) => {
            const {left} = dock.getBoundingClientRect();
            icons.forEach(icon => {
                const {left: l, width: w} = icon.getBoundingClientRect();
                const center = l - left + w / 2;
                const distance = Math.abs(mousex - center);
                const intensity = Math.exp(-(distance ** 2.5) / 20000);
                gsap.to(icon, {duration: 0.25, ease: 'power2.out',
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.20, 
                    ease: 'power2.out'
                });
            });
        };
        const handleMouseMove = (e) => { 
            const {left} = dock.getBoundingClientRect()
            animateIcons(e.clientX - left);
        }
        const resetIcons = () => {
            icons.forEach(icon => {
                gsap.to(icon, {duration: 0.3, ease: 'power1.out',
                    scale: 1,
                    y: 0
                });
            });
            dock.addEventListener('mousemove', handleMouseMove);
        };

        dock.addEventListener('mousemove', handleMouseMove);
        dock.addEventListener('mouseleave', resetIcons);

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove);
            dock.removeEventListener('mouseleave', resetIcons);

        }
    }, []);
    const toggleApp = (app) => {
        if (!app.canOpen) return;
        const win = windows[app.id];

        if (win.isOpen) {
            closeWindow(app.id);
        } else {
            openWindow(app.id);
        }
    }

  return <section id='dock'>
    <div ref={dockRef} className='dock-container'>
        {dockApps.map(({id, name, icon, canOpen}) => (
            <div key={id ?? name} className='relative flex justify-center'>
                <button type='button' className='dock-icon'
                aria-label={name}
                data-tooltip-id = "dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({id, canOpen})}
                >
                    <img src={`/images/${icon}`} alt={name} 
                    loading='lazy'
                    className={canOpen ? '' : 'opacity-50 cursor-not-allowed'}/>
                </button>
            </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip"/>
    </div>
  </section>
}

export default Dock