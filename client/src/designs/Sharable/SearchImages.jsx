// SearchImages.jsx


import axios from "axios";

import { useEffect, useState } from "react";
import "./search-image.css";
import { SearchIcon } from "lucide-react";
import { useCanvasHook } from '../../context/CanvasContext';
import { FabricImage } from "fabric";

export default function SearchImages() {
  const [imageList, setImageList] = useState([]);
  const [searchInput,setSearchInput] = useState();
  const [loading, setLoading] = useState(false);
  const { canvasEditor } = useCanvasHook();

  useEffect(() => {
    getImageList("Gradient");
  }, []);

  const getImageList = async (searchInput) => {
    try {
      setLoading(true);

      const result = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: searchInput,
            page: 1,
            per_page: 20,
          },
          headers: {
            Authorization:
              "Client-ID " +
              process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
          },
        }
      );

      // ✅ FIX IS HERE
      setImageList(result?.data?.results);
    } catch (err) {
      console.error("Unsplash error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addImageToCanvas = async (imageUrl) => {
    const canvasImageRef = await FabricImage.fromURL(
        imageUrl,
        {
            crossOrigin: 'anonymous'
        }
    )
    canvasEditor.add(canvasImageRef);
    canvasEditor.renderAll();
    canvasEditor.requestRenderAll();

  }

  return (
    <div>
      <h3>Search Images</h3>
      
      <div>
        <input placeholder="Search ..." onChange={(e)=>setSearchInput(e.target.value)} />
        <button onClick={()=>getImageList(searchInput)} ><SearchIcon /></button>  
      </div>  
      
      {loading && <p>Loading images…</p>}

      <div className="image-grid">
        {imageList.map((image) => (
            <div key={image.id} className="image-card" onClick={()=>addImageToCanvas(image?.urls?.regular)} >
            
            <img 
              src={image.urls.thumb}
                alt={image.alt_description || "Unsplash image"}
                width={300}
                height={300}
            />
            </div>
        ))}
        </div>

    </div>
  );
}

