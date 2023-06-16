"use client";

import React, { ChangeEvent, FC, useRef, useState } from "react";
import clsx from "clsx";

import UploadIcon from "@icons/Upload.svg";
<<<<<<< HEAD
=======
import Loading from "@icons/Loading.svg";
import Checkmark from "@icons/Checkmark.svg";
>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d

type FileInputProps = {
  id?: string;
  name: string;
  accept?: string;
};

const MyComponent: FC<FileInputProps> = (props) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append("file", file);

      fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Empêche le comportement par défaut du navigateur pour l'événement de dépôt
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileInput = hiddenFileInput.current;
      if (fileInput) {
        fileInput.files = e.dataTransfer.files; // Assigner les fichiers à l'élément d'entrée de fichier
        handleChange({ target: fileInput } as ChangeEvent<HTMLInputElement>); // Appeler la fonction handleChange pour traiter le fichier
      }
    }
  };

<<<<<<< HEAD
=======
  if (props.type === "loading") {
    return (
    <div
      id={props.id}
      className={clsx(
        "flex-1 flex flex-col gap-8",
        "p-6",
        "rounded-lg",
        "border-dashed border-spacing-60 border-2 border-accent-200",
        "transition cursor-pointer",
        "bg-accent-100",
      )}
      onClick={handleClick}
      
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleDrop(e);
      }}
    >
      <input
        type="file"
        name={props.name}
        className={"hidden"}
        ref={hiddenFileInput}
        // onChange={handleChange}
        accept={props.accept}
      />

      <div className={clsx("flex h-full justify-center items-center")}>
        <div className="flex flex-col gap-5 items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-500">
            <Loading className="w-3/5 h-3/5 text-white animate-spin" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">Uploading file</span>
          </div>
        </div>
      </div>
    </div>
    )
  }

  if (props.type === "uploaded") {
    return (
    <div
      id={props.id}
      className={clsx(
        "flex-1 flex flex-col gap-8",
        "p-6",
        "rounded-lg",
        "border-dashed border-spacing-60 border-2 border-green-200",
        "transition cursor-pointer",
        "bg-green-10",
      )}
      onClick={handleClick}
      
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleDrop(e);
      }}
    >
      <input
        type="file"
        name={props.name}
        className={"hidden"}
        ref={hiddenFileInput}
        // onChange={handleChange}
        accept={props.accept}
      />

      <div className={clsx("flex h-full justify-center items-center")}>
        <div className="flex flex-col gap-5 items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-green-600">
            <Checkmark className="w-3/5 h-3/5 text-white" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">File uploaded successfully !</span>
          </div>
        </div>
      </div>
    </div>
    )
  }



>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d
  return (
    <div
      id={props.id}
      className={clsx(
        "flex-1 flex flex-col gap-8",
        "p-6",
        "rounded-lg",
        "border-dashed border-spacing-60 border-2 border-dark-50 hover:border-accent-200 focus:border-accent-200",
        "hover:bg-accent-50 focus:bg-accent-50",
        "transition cursor-pointer",
<<<<<<< HEAD
        isDragging && "border-accent-200"
=======
        isDragging ? "bg-accent-100" : "bg-white"
>>>>>>> 3644213141a2c8eba3455065b2c95fa5f5f9b33d
      )}
      onClick={handleClick}
      onDragEnter={() => {
        setDragging(true);
      }}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
        handleDrop(e);
      }}
      onDragLeave={() => {
        setDragging(false);
      }}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        handleDrop(e);
      }}
    >
      <input
        type="file"
        name={props.name}
        className={"hidden"}
        ref={hiddenFileInput}
        onChange={handleChange}
        accept={props.accept}
      />

      <div className={clsx("flex h-full justify-center items-center")}>
        <div className="flex flex-col gap-5 items-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-500">
            <UploadIcon className="w-3/5 h-3/5 text-white" />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">Drop file to upload</span>

            <span className="text-sm italic font-medium">
              or <span className="text-accent-500 font-black">browse</span> to
              choose a file
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
