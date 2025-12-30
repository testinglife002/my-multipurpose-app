import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import RotateLoader from "react-spinners/RotateLoader";
import newRequest from "../../api/newRequest";
import CreateComponent from "./CreateComponent";

const CreateDesign = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);

  // ❗ guard: no state = invalid entry
  useEffect(() => {
    if (!state?.width || !state?.height) {
      navigate("/designs/canva-home", { replace: true });
    }
  }, [state, navigate]);

  if (!state?.width || !state?.height) return null;

  const mainFrame = {
    id: Date.now(),
    name: "main_frame",
    type: "rect",
    width: Number(state.width),
    height: Number(state.height),
    left: 0,
    top: 0,
    rotate: 0,
    z_index: 1,
    color: "#ffffff",
    opacity: 1,
    image: "",
  };

  useEffect(() => {
    const createDesign = async () => {
      try {
        const blob = await htmlToImage.toBlob(ref.current);
        if (!blob) throw new Error("Canvas snapshot failed");

        const formData = new FormData();
        formData.append("design", JSON.stringify(mainFrame));
        formData.append("image", blob);

        const { data } = await newRequest.post(
          "/create-user-design",
          formData
        );

        navigate(`/designs/${data.design._id}/edit`, { replace: true });
      } catch (err) {
        console.error("Create design failed:", err);
        navigate("/designs/canva-home");
      }
    };

    if (ref.current) createDesign();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100 position-relative">
      <div ref={ref} style={{ visibility: "hidden" }}>
        <CreateComponent info={mainFrame} current_component={{}} />
      </div>

      <RotateLoader color="#000" />
    </div>
  );
};

export default CreateDesign;











/*
import React, { useRef } from 'react'
import * as htmlToImage from 'html-to-image';
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from "../../api/newRequest";
import RotateLoader from 'react-spinners/RotateLoader';
import { useState } from 'react';
import { useEffect } from 'react';
import CreateComponent from './CreateComponent';




const CreateDesign = () => {

    const ref = useRef()

     const {state} = useLocation();
     // console.log(state);

     const location = useLocation();
     const navigate = useNavigate();

    const designState = location.state;



    if (!state || !state.width || !state.height) {
      return <div className="text-center mt-5">No design data provided.</div>;
    }

    // const navigate = useNavigate();

    useEffect(() => {
      if (!designState?.width || !designState?.height) {
        navigate("/designs/canva-home");
      }
    }, [designState, navigate]);

    if (!designState) return null;

    const obj = {
        name: 'main_frame',
        type: 'rect',
        // id: Math.floor((Math.random() * 100) + 1),
        id: Date.now(),
        height: state.height,
        width: state.width,
        z_index: 1,
        color: '#fff',
        image: ''
    }

    const [loader, setLoader] = useState(false);

    const createDesign = async () => {
    const image = await htmlToImage.toBlob(ref.current)
     const design = JSON.stringify(obj)
    if(image){
      const formData = new FormData()
      formData.append('design',design)
      formData.append('image',image)
      try {
        setLoader(true)
         const {data} = await newRequest.post('/create-user-design',formData)
         navigate(`/designs/${data.design._id}/edit`)
         setLoader(false)
      } catch (error) {
        setLoader(false)
        console.log(error.response?.data)
      }
    }
  }

  useEffect(() => {
    if(state && ref.current){
      createDesign()
    }else{
      navigate('/')
    }
  },[state,ref])

  return (
    <>
  
    <div className='w-screen h-screen flex justify-center items-center relative' >
        <div ref={ref} className='relative w-auto h-auto overflow-auto'>
            <CreateComponent info={obj} current_component={{}} />
        </div>
    </div>
  
    <div className='px-5 mx-5 w-100 h-100 d-flex justify-content-center align-items-center position-relative' >
        <div ref={ref} className="px-2 mx-5 position-relative overflow-auto">
            <CreateComponent info={obj} current_component={{}} />
        </div>

      {
        loader && 
        <div className='w-100 h-100 left-0 top-0 d-flex justify-content-center align-items-center bg-black position-absolute' >
          <RotateLoader color="white" />
        </div>
      }

    </div>
    </>
  )
}

export default CreateDesign
*/
