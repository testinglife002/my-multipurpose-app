import React from 'react'

import "./text-settings.css";
import { IText } from 'fabric';
import { useCanvasHook } from '../../context/CanvasContext';

const TextSettings = () => {

    // const { canvasEditor} = useCanavsHook();
    const { canvasEditor} = useCanvasHook();

    const onAddTextClick = (type) => {
        if (canvasEditor) {
            if (type == 'Heading') {
                const textRef = new IText('Add Heading', {
                    fontSize: 30,
                    fontWeight: 'bold',
                    fontFamily: 'Arial',
                    fill: 'black',
                    left: 100,
                    top: 100
                });
                
                canvasEditor.add(textRef);
                canvasEditor.setActiveObject(textRef);
                canvasEditor.requestRenderAll();

            } else if (type == 'Subheading') {
                // Code for subheading
                const textRef = new IText('Add Sub Heading', {
                    fontSize: 20,
                    fontWeight: '400',
                    fontFamily: 'Arial',
                    fill: 'black',
                    left: 100,
                    top: 100
                });
                canvasEditor.add(textRef);
                canvasEditor.setActiveObject(textRef);
                canvasEditor.requestRenderAll();
            } else  {
                // Code for subheading
                const textRef = new IText('Add Paragraph', {
                    fontSize: 13,
                    fontWeight: 'normal',
                    fontFamily: 'Arial',
                    fill: 'black',
                    left: 100,
                    top: 100
                });
                canvasEditor.add(textRef);
                canvasEditor.setActiveObject(textRef);
                canvasEditor.requestRenderAll();
            }
        }
    }

  return (
    
    <div className="text-panel">
        <div>Text Settings</div>
        <h2
            className="text-item text-heading"
            onClick={() => onAddTextClick("Heading")}
        >
            Add Heading
        </h2>

        <h2
            className="text-item text-subheading"
            onClick={() => onAddTextClick("Subheading")}
        >
            Add Subheading
        </h2>

        <h2
            className="text-item text-paragraph"
            onClick={() => onAddTextClick("Para")}
        >
            Paragraph
        </h2>
    </div>

  )
}

export default TextSettings