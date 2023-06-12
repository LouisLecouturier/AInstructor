"use client"

import React from 'react'

import clsx from "clsx";
import { ChangeEvent, useRef, useState } from "react";

export default function Upload() {
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [isDragging , setDragging] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("input changed")
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            
      
            const formData = new FormData();
            formData.append('file', file);
      
            const response = fetch('http://localhost:8000/api/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                }
            )     
        }
    };
  
    const handleClick = () => {
      if (hiddenFileInput.current) {
        hiddenFileInput.current.click();
      }
    };


    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Empêche le comportement par défaut du navigateur pour l'événement de dépôt
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {

            const fileInput = hiddenFileInput.current;
            if (fileInput) {
                fileInput.files = event.dataTransfer.files; // Assigner les fichiers à l'élément d'entrée de fichier
                handleChange({ target: fileInput } as ChangeEvent<HTMLInputElement>); // Appeler la fonction handleChange pour traiter le fichier
            }
          }
    }
   
    return (
        <div className="flex-1 h-screen flex flex-col gap-8 px-20 pt-16 pb-32">

            <input type="file" ref={hiddenFileInput} onChange={handleChange} accept="image/*" style={{ display: 'none' }} />

            <h1 className="text-6xl font-black">
                Import a course
            </h1>

            <span className="text-lg">
                Donec ultricies mauris a nunc posuere, et sodales sem efficitur. In hac habitasse platea dictumst. Vestibulum vulputate quam at dapibus euismod. Praesent vulputate lorem vel cursus lacinia. 
            </span>


            <div className="flex w-full flex-1 justify-center items-center">

                <div 
                className={clsx("flex w-2/3 h-full rounded-3xl border-dashed border-2 border-accent-900 justify-center items-center",
                    isDragging ? 'bg-primary-200' : '',
                )}
                onDragEnter={() => {setDragging(true); console.log("drag enter")}}
                onDragOver={(event: React.DragEvent<HTMLDivElement>) => {setDragging(true); handleDrop(event); event.preventDefault();}}
                onDragLeave={() => {setDragging(false); console.log("drag leave")}}
                onDrop={(event: React.DragEvent<HTMLDivElement>) => {setDragging(false); handleDrop(event); event.preventDefault();}}

                >
                    <div className="flex flex-col gap-5 items-center">
                        <div className="w-24 h-24 bg-accent-500"/>
                        <div className="flex flex-col items-center">

                            <span className="text-2xl font-bold">
                                Drop file to upload
                            </span>

                            <span className="text-lg italic">
                                or <span onClick={() => handleClick()} className="text-primary-400">browse</span> to choose a file
                            </span>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
