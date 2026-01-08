import React, { useState } from 'react'
import ImageKit from "imagekit";
import { FabricImage } from 'fabric';
import { useCanvasHook } from '../../context/CanvasContext';
import { useParams } from 'react-router-dom';


// or

// var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
});

function UploadImage() {
  const { designId } = useParams();
   const { canvasEditor } = useCanvasHook();
  const [loading, setLoading] = useState(false);

  var imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
  });

  const onFileUpload = async (event) => {
    setLoading(true);

    const file = event.target.files[0];
    const imageRef = await imagekit.upload({
      file: file,
      fileName: designId + ".png",
      isPublished: true
    });
    
    console.log(imageRef?.url);
    const canvasImageRef = await FabricImage.fromURL(
        imageRef?.url,
        {
            crossOrigin: 'anonymous'
        }
    )
    
    canvasImageRef.set({
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
    })
    
    canvasEditor.add(canvasImageRef);
    canvasEditor.renderAll();
    canvasEditor.requestRenderAll();

    setLoading(false);
  }

    return (
        <div>
            <div>
            <label htmlFor='uploadImage'>
                <h2 style={{padding:'1%', color:'black'}} >Upload Image</h2>
            </label>
            </div>
            <input 
                type='file' 
                id="uploadImage"
                // className='hidden'
                // style={{display:'hidden'}}
                multiple={false}
                onChange={onFileUpload}
            />
        </div>
    )
}

export default UploadImage

