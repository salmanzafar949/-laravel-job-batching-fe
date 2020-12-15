import React, {useRef, useEffect, useState} from 'react';
import Layout from "../components/Layout";

export default function upload(){

    const fileRef = useRef();
    const API_URL = "http://127.0.0.1:8000/api/";
    const [batchInfo, setBatchInfo] = useState({});

    function handleForm(e)
    {
        e.preventDefault();
        const inputFile = fileRef.current;
        const file = inputFile.files[0];
        if (!file) return;

        const fd = new FormData();
        fd.append('file', file)

        fetch(`${API_URL}upload`, {method: "post", body: fd})
            .then(res => res.json())
            .then(data => setBatchInfo(data))
    }

    function batchDetails()
    {
        const batchId = "923fcef0-5ffc-4c89-8725-0a80e42b37f7";

        fetch(`${API_URL}batch?id=${batchId}`)
            .then(res => res.json())
            .then(data => setBatchInfo(data))
    }

    useEffect(() => {
        batchDetails();
    },[]);

    return (
        <Layout>
            {
                batchInfo &&
                <section>
                    Upload is in Progress
                    <p>
                        <progress value={batchInfo.progress} max={100}/>
                    </p>
                </section>
            }
            {
                !batchInfo &&
                <section>
                    <h1 className="text-xl text-gray-800 text-center mb-5">
                        Choose a File to Upload
                    </h1>
                    <form onSubmit={handleForm} className="border rounded p-4">
                        <input type="file" ref={fileRef}/>
                        <input type="submit" className="px-4 py-2 bg-gray-700 rounded text-white"/>
                    </form>
                </section>
            }
        </Layout>
    )
}