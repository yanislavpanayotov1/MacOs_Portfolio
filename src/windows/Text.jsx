import React from 'react'
import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows?.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-4 bg-white space-y-6">
        
        {image && (
          <div className="mb-4">
            <img src={image} alt={name} className="w-full h-auto rounded-md" />
          </div>
        )}

        
        {subtitle && <p className="text-sm text-gray-600 mb-3">{subtitle}</p>}

        
        {Array.isArray(description) && (
          <div className="space-y-3">
            {description.map((p, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

const TextWindow = WindowWrapper(Text, 'txtfile')
export default TextWindow
