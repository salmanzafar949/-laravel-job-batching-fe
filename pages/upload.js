import React, {useRef, useEffect, useState} from 'react';
import Layout from "../components/Layout";

export default function upload(){

    const fileRef = useRef();
    const API_URL = "http://127.0.0.1:8000/api/";
    const [batchId, setBatchId] = useState(null);
    const [batchInfo, setBatchInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    function handleForm(e)
    {
        e.preventDefault();
        setIsLoading(true);

        const inputFile = fileRef.current;
        const file = inputFile.files[0];
        if (!file) return;

        const fd = new FormData();

        fd.append('file', file)

        fetch(`${API_URL}upload`, {method: "post", body: fd})
            .then(res => res.json())
            .then(data => {
                setBatchId(data.id)
                batchDetails(data.id)
                setIsLoading(false)
            })
    }

    function batchDetails(id=null)
    {
        const currentBatchId = id ?? batchId;

        fetch(`${API_URL}batch?id=${currentBatchId}`)
            .then(res => res.json())
            .then(data => setBatchInfo(data))
    }

    function updateProgress()
    {
        setInterval(() => batchDetails(), 2000)
    }

    useEffect(() => {
        if (batchId !== null)
        {
            updateProgress()
        }

    },[batchId]);

    return (
        <Layout>
            {
                batchInfo.progress !== undefined &&
                <section>
                    <p>
                        Upload is in Progress ({batchInfo.progress}%)
                    </p>
                    <div className="w-full h-4 rounded-lg shadow-inner border">
                        <div className="bg-blue-700 w-full h-4" style={{
                            width: `${batchInfo.progress}%`
                        }}>

                        </div>
                    </div>
                    <progress value={batchInfo.progress} max={100}/>
                </section>
            }
            {
                batchInfo.progress === undefined &&
                <section>
                    <h1 className="text-xl text-gray-800 text-center mb-5">
                        Choose a File to Upload
                    </h1>
                    <form onSubmit={handleForm} className="border rounded p-4">
                        <input type="file" ref={fileRef}/>
                        <input type="submit" disabled={isLoading} className={`px-4 py-2 rounded text-white ${isLoading ? "bg-gray-400 outline-none" : "bg-gray-700"}`}/>
                    </form>
                </section>
            }
        </Layout>
    )
}