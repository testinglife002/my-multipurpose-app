// ✅ Shapes.jsx (Fabric 6)
// import { Circle, Rect, Triangle, Line } from "fabric";
import { Circle, Line, Rect, Triangle } from 'fabric'
import { ShapeList } from "../Options";
import { useCanvasHook } from "../../context/CanvasContext";

const Shapes = () => {
  const { canvasEditor } = useCanvasHook();
    const onShapeSelect = (shape) => {
        const properties = {
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            radius: 50,
            fill: 'black',
            stroke: 'black',
            // strokeWidth: 0
        }
        if(shape.name=='Circle'){
            const circleRef = new Circle({
                ...properties
            })
            canvasEditor.add(circleRef);
        } else if(shape.name=='Square'){
            const squareRef = new Rect({
                ...properties
            })
            canvasEditor.add(squareRef);
        } else if(shape.name=='Triangle'){
            const squareRef = new Triangle({
                ...properties
            })
            canvasEditor.add(squareRef);
        } else if(shape.name=='Line'){
            const squareRef = new Line([50,50,200,200],{
                stroke: 'black',
                strokeWidth: 5
            })
            canvasEditor.add(squareRef);
        }
        canvasEditor.requestRenderAll();


    }

  return (
    <div className="shapes-panel">
      {ShapeList.map((shape, i) => (
        <div key={i} onClick={() => onShapeSelect(shape)}>
          <img src={shape.icon} alt={shape.name} width={40} height={40} />
          <span>{shape.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Shapes;
