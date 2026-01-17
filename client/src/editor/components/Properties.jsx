// // src/editor/components/✅ Properties.jsx (React)
import { useEditorStore } from "../../store";
import {
  Bold, Copy, FlipHorizontal, FlipVertical, Italic,
  MoveDown, MoveUp, Trash, Underline,
} from "lucide-react";
// import { ALL_FONTS } from "../../config";
import {
  cloneSelectedObject,
  deletedSelectedObject,
} from "../../fabric/fabric-utils";
import { useEffect, useState } from "react";
import "./properties.css";
import { loadGoogleFont } from "../../utils/loadGoogleFont";
import { ALL_FONTS } from "../../config";

/* 🔁 COMPONENT LOGIC IS 100% IDENTICAL */
function Properties() {
  // 🔥 ORIGINAL CODE UNCHANGED EXCEPT IMPORT PATHS
  // (NO FUNCTIONAL CHANGE)

     const { canvas, markAsModified } = useEditorStore();
  //active object
  const [selectedObject, setSelectedObject] = useState(null);
  const [objectType, setObjectType] = useState("");

  //common
  const [opacity, setOpacity] = useState(100);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  //text
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");
  const [underline, setUnderline] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [textBackgroundColor, setTextBackgroundColor] = useState("");
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textAlign, setTextAlign] = useState("left");
  const [verticalAlign, setVerticalAlign] = useState("top");



  const [fillColor, setFillColor] = useState("#ffffff");
  const [borderColor, setBorderColor] = useState("#000000");
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderStyle, setBorderStyle] = useState("solid");

  const [filter, setFilter] = useState("none");
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    if (!canvas) return;
    const handleSelectionCreated = () => {
      const activeObject = canvas.getActiveObject();

      if (activeObject) {
        console.log(activeObject.type, "activeObjecttype");

        setSelectedObject(activeObject);
        //update common properties
        setOpacity(Math.round(activeObject.opacity * 100) || 100);
        setWidth(Math.round(activeObject.width * activeObject.scaleX));
        setHeight(Math.round(activeObject.height * activeObject.scaleY));
        setBorderColor(activeObject.stroke || "#000000");
        setBorderWidth(activeObject.strokeWidth || 0);

        //check based on type
        if (activeObject.type === "i-text") {
          setObjectType("text");

          setText(activeObject.text || "");
          setFontSize(activeObject.fontSize || 24);
          setFontFamily(activeObject.fontFamily || "Arial");
          setFontWeight(activeObject.fontWeight || "normal");
          setFontStyle(activeObject.fontStyle || "normal");
          setUnderline(activeObject.underline || false);
          setTextColor(activeObject.fill || "#000000");
          setTextBackgroundColor(activeObject.backgroundColor || "");
          setLetterSpacing(activeObject.charSpacing || 0);
          setTextAlign(activeObject.textAlign || "left");
          setVerticalAlign("top"); // reset UI state

        } else if (activeObject.type === "image") {
          setObjectType("image");

          if (activeObject.filters && activeObject.filters.length > 0) {
            const filterObj = activeObject.filters[0];
            if (filterObj.type === "Grayscale") setFilter("grayscale");
            else if (filterObj.type === "Sepia") setFilter("sepia");
            else if (filterObj.type === "Invert") setFilter("invert");
            else if (filterObj.type === "Blur") {
              setFilter("blur");
              setBlur(filterObj.blur * 100 || 0);
            } else setFilter("none");
          }

          if (activeObject.strokeDashArray) {
            if (
              activeObject.strokeDashArray[0] === 5 &&
              activeObject.strokeDashArray[1] === 5
            ) {
              setBorderStyle("dashed");
            } else if (
              activeObject.strokeDashArray[0] === 2 &&
              activeObject.strokeDashArray[1] === 2
            ) {
              setBorderStyle("dotted");
            } else {
              setBorderStyle("solid");
            }
          }
        } else if (activeObject.type === "path") {
          setObjectType("path");

          if (activeObject.strokeDashArray) {
            if (
              activeObject.strokeDashArray[0] === 5 &&
              activeObject.strokeDashArray[1] === 5
            ) {
              setBorderStyle("dashed");
            } else if (
              activeObject.strokeDashArray[0] === 2 &&
              activeObject.strokeDashArray[1] === 2
            ) {
              setBorderStyle("dotted");
            } else {
              setBorderStyle("solid");
            }
          }
        } else {
          setObjectType("shape");

          if (activeObject.fill && typeof activeObject.fill === "string") {
            setFillColor(activeObject.fill);
          }

          if (activeObject.strokeDashArray) {
            if (
              activeObject.strokeDashArray[0] === 5 &&
              activeObject.strokeDashArray[1] === 5
            ) {
              setBorderStyle("dashed");
            } else if (
              activeObject.strokeDashArray[0] === 2 &&
              activeObject.strokeDashArray[1] === 2
            ) {
              setBorderStyle("dotted");
            } else {
              setBorderStyle("solid");
            }
          }
        }
      }
    };

    const handleSelectionCleared = () => {};

  const activeObject = canvas.getActiveObject();
    if (activeObject) {
      handleSelectionCreated();
    }

    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectionCreated);
     canvas.on("object:modified", handleSelectionCreated);
    canvas.on("selection:cleared", handleSelectionCleared);

    return () => {
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:updated", handleSelectionCreated);
       canvas.off("object:modified", handleSelectionCreated);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [canvas]);

  const updateObjectProperty = (property, value) => {
    if (!canvas || !selectedObject) return;

    selectedObject.set(property, value);
    canvas.requestRenderAll();
    canvas.renderAll();
    markAsModified();
  };

  // opacity
  const handleOpacityChange = (e) => {
    if (!canvas || !selectedObject) return;
    const value = Number(e.target.value);
    setOpacity(value);
     updateObjectProperty("opacity", value / 100);
    // selectedObject.set("opacity", value / 100);
    // canvas.renderAll();
    // markAsModified();
  };

  //duplicate
  const handleDuplicate = async () => {
    if (!canvas || !selectedObject) return;
    await cloneSelectedObject(canvas);
    markAsModified();
  };

  //delete
  const handleDelete = () => {
    if (!canvas || !selectedObject) return;
    deletedSelectedObject(canvas);
    markAsModified();
  };

  //arrangements
  const handleBringToFront = () => {
    if (!canvas || !selectedObject) return;
    canvas.bringObjectToFront(selectedObject);
    canvas.renderAll();
    markAsModified();
  };

  const handleSendToBack = () => {
    if (!canvas || !selectedObject) return;
    canvas.sendObjectToBack(selectedObject);
    canvas.renderAll();
    markAsModified();
  };

  //Flip H and Flip V

  const handleFlipHorizontal = () => {
    if (!canvas || !selectedObject) return;
    const flipX = !selectedObject.flipX;
    updateObjectProperty("flipX", flipX);
  };

  const handleFlipVertical = () => {
    if (!canvas || !selectedObject) return;
    const flipY = !selectedObject.flipY;
    updateObjectProperty("flipY", flipY);
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    updateObjectProperty("text", newText);
  };

  const handleFontSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setFontSize(newSize);
    updateObjectProperty("fontSize", newSize);
  };

  /*
  const handleFontFamilyChange = (value) => {
    setFontFamily(value);
    updateObjectProperty("fontFamily", value);
  };
  */

  const handleFontFamilyChange = async (e) => {
    if (!canvas || !selectedObject || objectType !== "text") return;

    const family = e.target.value;
    setFontFamily(family);

    await loadGoogleFont(family);

    // normalize scale before changing font
    const width = selectedObject.width * selectedObject.scaleX;

    selectedObject.set({
        fontFamily: family,
        width,
        scaleX: 1,
    });

    selectedObject.initDimensions();
    selectedObject.setCoords();

    canvas.requestRenderAll();
    markAsModified();
    };



  /* =========================
    FONT FAMILY
    ========================= */
    const handleFontFamilyChanges = (e) => {
    if (!selectedObject || objectType !== "text") return;

    const value = e.target.value;
    setFontFamily(value);

    selectedObject.set("fontFamily", value);
    canvas.renderAll();
    markAsModified();
    };

  const handleToggleBold = () => {
    const newWeight = fontWeight === "bold" ? "normal" : "bold";
    setFontWeight(newWeight);
    updateObjectProperty("fontWeight", newWeight);
  };

  const handleToggleItalic = () => {
    const newStyle = fontStyle === "italic" ? "normal" : "italic";
    setFontStyle(newStyle);
    updateObjectProperty("fontStyle", newStyle);
  };

  const handleToggleUnderline = () => {
    const newUnderline = !underline;
    setUnderline(newUnderline);
    updateObjectProperty("underline", newUnderline);
  };

  const handleToggleTextColorChange = (e) => {
    const newTextColor = e.target.value;
    setTextColor(newTextColor);
    updateObjectProperty("fill", newTextColor);
  };

  const handleToggleTextBackgroundColorChange = (e) => {
    const newTextBgColor = e.target.value;
    setTextBackgroundColor(newTextBgColor);
    updateObjectProperty("backgroundColor", newTextBgColor);
  };

  const handleLetterSpacingChange = (e) => {
    if (!selectedObject || objectType !== "text") return;

    const spacing = Number(e.target.value);
    setLetterSpacing(spacing);

    selectedObject.set("charSpacing", spacing);
    canvas.requestRenderAll();
    markAsModified();
    };


    /* =========================
    LETTER SPACING
    ========================= */
    const handleLetterSpacingChanges = (e) => {
        if (!selectedObject || objectType !== "text") return;

        const spacing = Number(e.target.value);
        setLetterSpacing(spacing);

        // Fabric uses charSpacing
        selectedObject.set("charSpacing", spacing);
        canvas.renderAll();
        markAsModified();
    };

  

    /* =========================
    TEXT COLOR
    ========================= */
    const handleTextColorChange = (e) => {
    if (!selectedObject || objectType !== "text") return;

    const color = e.target.value;
    setTextColor(color);

    selectedObject.set("fill", color);
    canvas.renderAll();
    markAsModified();
    };

    /* =========================
    TEXT BACKGROUND COLOR
    ========================= */
    const handleTextBackgroundColorChange = (e) => {
    if (!selectedObject || objectType !== "text") return;

    const color = e.target.value;
    setTextBackgroundColor(color);

    selectedObject.set("backgroundColor", color || "");
    canvas.renderAll();
    markAsModified();
    };

    const handleTextAlignChange = (align) => {
        if (!canvas || !selectedObject || objectType !== "text") return;

        const fixedWidth = selectedObject.width * selectedObject.scaleX;

        selectedObject.set({
            textAlign: align,
            width: fixedWidth,
            scaleX: 1,
        });

        selectedObject.initDimensions();
        selectedObject.setCoords();

        canvas.requestRenderAll();
        markAsModified();
        setTextAlign(align);
    };


    const handleVerticalAlignChange = (align) => {
    if (!canvas || !selectedObject || objectType !== "text") return;

    const boxHeight = selectedObject.height * selectedObject.scaleY;
    const textHeight = selectedObject.calcTextHeight();

    let offset = 0;

    if (align === "middle") {
        offset = (boxHeight - textHeight) / 2;
    } else if (align === "bottom") {
        offset = boxHeight - textHeight;
    }

    // reset baseline before applying offset
    selectedObject.set({
        top: selectedObject.top - (selectedObject.__lastVOffset || 0),
    });

    selectedObject.set({
        top: selectedObject.top + offset,
    });

    selectedObject.__lastVOffset = offset;

    selectedObject.setCoords();
    canvas.requestRenderAll();
    markAsModified();
    setVerticalAlign(align);
    };



  const handleFillColorChange = (e) => {
    if (!selectedObject) return;

    const color = e.target.value;
    setFillColor(color);

    updateObjectProperty("fill", color);
    };


  const handleBorderColorChange = (e) => {
    if (!selectedObject) return;

    const color = e.target.value;
    setBorderColor(color);

    updateObjectProperty("stroke", color);
    };


  const handleBorderWidthChange = (e) => {
    if (!selectedObject) return;

    const width = Number(e.target.value);
    setBorderWidth(width);

    updateObjectProperty("strokeWidth", width);
    };


  const handleBorderStyleChange = (e) => {
    if (!selectedObject) return;

    const style = e.target.value;
    setBorderStyle(style);

    let dashArray = null;

    if (style === "dashed") dashArray = [5, 5];
    if (style === "dotted") dashArray = [2, 2];

    updateObjectProperty("strokeDashArray", dashArray);
    };


  const handleImageFilterChange = async (e) => {
    if (!canvas || !selectedObject || selectedObject.type !== "image") return;

    const value = e.target.value;
    setFilter(value);

    canvas.discardActiveObject();
    const { filters } = await import("fabric");

    selectedObject.filters = [];

    if (value === "grayscale") {
        selectedObject.filters.push(new filters.Grayscale());
    }
    if (value === "sepia") {
        selectedObject.filters.push(new filters.Sepia());
    }
    if (value === "invert") {
        selectedObject.filters.push(new filters.Invert());
    }
    if (value === "blur") {
        selectedObject.filters.push(new filters.Blur({ blur: blur / 100 }));
    }

    selectedObject.applyFilters();
    canvas.setActiveObject(selectedObject);
    canvas.requestRenderAll();
    canvas.renderAll();
    markAsModified();
    };


  const handleBlurChange = async (e) => {
    if (
        !canvas ||
        !selectedObject ||
        selectedObject.type !== "image" ||
        filter !== "blur"
    )
        return;

    const value = Number(e.target.value);
    setBlur(value);

    const { filters } = await import("fabric");

    selectedObject.filters = [
        new filters.Blur({ blur: value / 100 }),
    ];

    selectedObject.applyFilters();
    canvas.requestRenderAll();
    canvas.renderAll();
    markAsModified();
    };


  return (
    <aside className="properties-panel">
      <div className="properties-header">
        <span>Properties</span>
      </div>

      <div className="properties-body">

        {/* SIZE & POSITION */}
        <section>
          <h3>Size & Position</h3>

          <div className="grid-2">
            <div>
              <label>Width</label>
              <div className="readonly-box">{width}</div>
            </div>
            <div>
              <label>Height</label>
              <div className="readonly-box">{height}</div>
            </div>
          </div>

          <div className="slider-group">
            <div className="row-between">
              <label>Opacity</label>
              <span>{opacity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={handleOpacityChange}
            />
          </div>

          <div className="btn-row" >
            <button onClick={handleFlipHorizontal} style={{color:"black"}} >
              <FlipHorizontal size={14} color="black" /> Flip H
            </button>
            <button onClick={handleFlipVertical} style={{color:"black"}} >
              <FlipVertical size={14} color="black" /> Flip V
            </button>
          </div>
        </section>

        {/* LAYERS */}
        <section>
          <h3>Layer Position</h3>

          <div className="grid-2">
            <button onClick={handleBringToFront} style={{color:"black"}} >
              <MoveUp size={14} /> Bring Front
            </button>
            <button onClick={handleSendToBack} style={{color:"black"}} >
              <MoveDown size={14} /> Send Back
            </button>
          </div>
        </section>

        {/* DUPLICATE / DELETE */}
        <section>
          <h3>Duplicate & Delete</h3>

          <div className="grid-2">
            <button className="primary" onClick={handleDuplicate}>
              <Copy size={14} /> Duplicate
            </button>
            <button className="danger" onClick={handleDelete}>
              <Trash size={14} /> Delete
            </button>
          </div>
        </section>

        {/* TEXT PROPERTIES */}
        {/*
        {objectType === "text" && (
          <section>
            <h3>Text Properties</h3>

            <label>Text Content</label>
            <textarea
              value={text}
              onChange={handleTextChange}
            />

            <label>Font Size</label>
            <input
              type="number"
              value={fontSize}
              onChange={handleFontSizeChange}
            />

            <label>Style</label>
            <div className="icon-btn-row">
              <button onClick={handleToggleBold}><Bold size={16} /></button>
              <button onClick={handleToggleItalic}><Italic size={16} /></button>
              <button onClick={handleToggleUnderline}><Underline size={16} /></button>
            </div>

            <label>Letter Spacing</label>
            <input
              type="range"
              min="-200"
              max="800"
              step="10"
              value={letterSpacing}
              onChange={(e) =>
                handleLetterSpacingChange([+e.target.value])
              }
            />
          </section>
        )}
        */}

        {objectType === "text" && (
        <section>
            <h3>Text Properties</h3>

            {/* TEXT CONTENT */}
            <label>Text Content</label>
            <textarea
            value={text}
            onChange={handleTextChange}
            />

            {/* FONT SIZE */}
            <label>Font Size</label>
            <input
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            />

            {/* FONT FAMILY */}
             {/*<label>Font Family</label>
            <select
            value={fontFamily}
            onChange={handleFontFamilyChange}
            >
            {fontFamilies.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
                </option>
            ))}
            </select>*/}
            <label>Font Family</label>
            <select
                value={fontFamily}
                onChange={handleFontFamilyChange}
            >
                {ALL_FONTS.map((font) => (
                    <option
                    key={font}
                    value={font}
                    style={{ fontFamily: font }}
                    >
                    {font}
                    </option>
                ))}
            </select>


            {/* FONT STYLE */}
            <label>Style</label>
            <div className="icon-btn-row">
            <button
                className={fontWeight === "bold" ? "active" : ""}
                onClick={handleToggleBold}
            >
                <Bold size={16} color="black" />
            </button>

            <button
                className={fontStyle === "italic" ? "active" : ""}
                onClick={handleToggleItalic}
            >
                <Italic size={16} color="black" />
            </button>

            <button
                className={underline ? "active" : ""}
                onClick={handleToggleUnderline}
            >
                <Underline size={16} color="black" />
            </button>
            </div>

            {/* TEXT COLOR */}
            <label>Text Color</label>
            <input
            type="color"
            value={textColor}
            onChange={handleTextColorChange}
            />

            {/* TEXT BACKGROUND COLOR */}
            <label>Text Background</label>
            <input
            type="color"
            value={textBackgroundColor || "#ffffff"}
            onChange={handleTextBackgroundColorChange}
            />

            {/* LETTER SPACING */}
            <label>Letter Spacing</label>
            <input
            type="range"
            min="-200"
            max="800"
            step="10"
            value={letterSpacing}
            onChange={handleLetterSpacingChanges}
            />

            <label>Text Alignment</label>
            <div className="icon-btn-row">
            {["left", "center", "right"].map((align) => (
                <button
                key={align}
                className={textAlign === align ? "active" : ""}
                onClick={() => handleTextAlignChange(align)}
                style={{color:"black"}}
                >
                {align[0].toUpperCase()}
                </button>
            ))}
            </div>

            <label>Vertical Align</label>
            <div className="icon-btn-row">
            {["top", "middle", "bottom"].map((align) => (
                <button
                key={align}
                className={verticalAlign === align ? "active" : ""}
                onClick={() => handleVerticalAlignChange(align)}
                style={{color:"black"}}
                >
                {align[0].toUpperCase()}
                </button>
            ))}
            </div>


        </section>
        )}


        {objectType === "shape" && (
        <div className="prop-section">
            <h3 className="prop-title">Shape Properties</h3>

            <div className="prop-row">
            {/* Fill Color */}
            <div className="prop-item">
                <label className="prop-label">Fill Color</label>
                <div className="color-box">
                <div
                    className="color-preview"
                    style={{ backgroundColor: fillColor }}
                />
                <input
                    type="color"
                    value={fillColor}
                    onChange={handleFillColorChange}
                    className="color-input"
                />

                </div>
            </div>

            {/* Border Color */}
            <div className="prop-item">
                <label className="prop-label">Border Color</label>
                <div className="color-box">
                <div
                    className="color-preview"
                    style={{ backgroundColor: borderColor }}
                />
                <input
                    type="color"
                    value={borderColor}
                    onChange={handleBorderColorChange}
                    className="color-input"
                />
                </div>
            </div>
            </div>

            {/* Border Width */}
            <div className="prop-group">
            <label className="prop-label">
                Border Width <span>{borderWidth}px</span>
            </label>
            <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={borderWidth}
                onChange={handleBorderWidthChange}
                className="range-slider"
            />
            </div>

            {/* Border Style */}
            <div className="prop-group">
            <label className="prop-label">Border Style</label>
            <select
                value={borderStyle}
                onChange={handleBorderStyleChange}
                className="select-box"
            >
                <option value="solid" style={{color:'black'}} >Solid</option>
                <option value="dashed" style={{color:'black'}} >Dashed</option>
                <option value="dotted" style={{color:'black'}} >Dotted</option>
            </select>
            </div>
        </div>
        )}

        {objectType === "image" && (
        <div className="prop-section">
            <h3 className="prop-title">Image Properties</h3>

            <div className="prop-item">
            <label className="prop-label">Border Color</label>
            <div className="color-box">
                <div
                className="color-preview"
                style={{ backgroundColor: borderColor }}
                />
                <input
                    type="color"
                    value={borderColor}
                    onChange={handleBorderColorChange}
                    className="color-input"
                />
            </div>
            </div>

            <div className="prop-group">
            <label className="prop-label">
                Border Width <span>{borderWidth}px</span>
            </label>
            <input
                type="range"
                min="0"
                max="20"
                value={borderWidth}
                onChange={handleBorderWidthChange}
                className="range-slider"
            />
            </div>

            <div className="prop-group">
            <label className="prop-label">Border Style</label>
            <select
                value={borderStyle}
                onChange={handleBorderStyleChange}
                className="select-box"
            >
                <option value="solid" style={{color:'black'}} >Solid</option>
                <option value="dashed" style={{color:'black'}} >Dashed</option>
                <option value="dotted" style={{color:'black'}}>Dotted</option>
            </select>
            </div>

            <div className="prop-group">
            <label className="prop-label">Filter</label>
            <select
                value={filter}
                onChange={handleImageFilterChange}
                className="select-box"
            >
                <option value="none" style={{color:'black'}} >None</option>
                <option value="grayscale" style={{color:'black'}}>Grayscale</option>
                <option value="sepia" style={{color:'black'}}>Sepia</option>
                <option value="invert" style={{color:'black'}}>Invert</option>
                <option value="blur" style={{color:'black'}}>Blur</option>
            </select>
            </div>

            {filter === "blur" && (
            <div className="prop-group">
                <label className="prop-label">
                Blur Amount <span>{blur}%</span>
                </label>
                <input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={handleBlurChange}
                className="range-slider"
                />
            </div>
            )}
        </div>
        )}

        {objectType === "path" && (
        <div className="prop-section">
            <h3 className="prop-title">Path Properties</h3>

            <div className="prop-item">
            <label className="prop-label">Border Color</label>
            <div className="color-box">
                <div
                className="color-preview"
                style={{ backgroundColor: borderColor }}
                />
                <input
                type="color"
                value={borderColor}
                onChange={handleBorderColorChange}
                className="color-input"
                />
            </div>
            </div>

            <div className="prop-group">
            <label className="prop-label">
                Border Width <span>{borderWidth}px</span>
            </label>
            <input
                type="range"
                min="0"
                max="20"
                value={borderWidth}
                onChange={handleBorderWidthChange}
                className="range-slider"
            />
            </div>

            <div className="prop-group">
            <label className="prop-label">Border Style</label>
            <select
                value={borderStyle}
                onChange={handleBorderStyleChange}
                className="select-box"
            >
                <option value="solid" style={{color:'black'}}>Solid</option>
                <option value="dashed" style={{color:'black'}}>Dashed</option>
                <option value="dotted" style={{color:'black'}}>Dotted</option>
            </select>
            </div>
        </div>
        )}


      </div>
    </aside>
  );
}

export default Properties;



