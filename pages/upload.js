import React, {useRef} from 'react';
import Layout from "../components/Layout";

export default function upload(){

    const fileRef = useRef();

    function handleForm(e)
    {
        e.preventDefault();
        const inputFile = fileRef.current;
        const file = inputFile.files[0];
        if (!file) return;
        console.log(file);
    }

    return (
        <Layout>
            <h1 className="text-xl text-gray-800 text-center mb-5">
                Choose a File to Upload
            </h1>
            <form onSubmit={handleForm} className="border rounded p-4">
                <input type="file" ref={fileRef}/>
                <input type="submit" className="px-4 py-2 bg-gray-700 rounded text-white"/>
            </form>
        </Layout>
    )
}