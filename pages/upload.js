import React from 'react';
import Layout from "../components/Layout";

export default function upload(){

    return (
        <Layout>
            <h1 className="text-xl text-gray-800 text-center mb-5">
                Choose a File to Upload
            </h1>
            <form className="border rounded p-4">
                <input type="file"/>
                <input type="submit" className="px-4 py-2 bg-gray-700 rounded text-white"/>
            </form>
        </Layout>
    )
}