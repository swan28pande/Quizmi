import React, { useRef, useState } from "react";


const PDFDropBox = () => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState("");
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type === "application/pdf") {
                setFileName(file.name);
            } else {
                alert("Please upload a PDF file.");
            }
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type === "application/pdf") {
                setFileName(file.name);
            } else {
                alert("Please upload a PDF file.");
            }
        }
    };

    return (
        <div
            className={`w-48 h-48 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl shadow transition bg-gray-900 cursor-pointer select-none mb-2 ${dragActive ? 'border-blue-400 bg-gray-800' : 'border-gray-700 hover:bg-gray-800'}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
        >
            <input
                type="file"
                accept="application/pdf"
                className="hidden"
                ref={inputRef}
                onChange={handleChange}
            />
            {fileName ? (
                <span className="text-red-400 font-semibold text-center break-words px-2">
                    {fileName}
                </span>
            ) : (
                <span className="text-blue-300 font-semibold flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3m-9 5.25V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 17.25z" />
                    </svg>
                    Drag & Drop PDF
                    <span className="text-xs text-gray-400 mt-1">or click to upload</span>
                </span>
            )}
        </div>
    );
};

export default PDFDropBox;
