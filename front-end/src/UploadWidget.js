import { useEffect, useRef } from 'react'


const UploadWidget = () => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'dhivdofhu',
            uploadPreset: 'wl73jysw'
        }, (err, res) => { console.log(res) })
    }, [])
    return (
        <button onClick={() => widgetRef.current.open()}>Select File</button>
    )
}

export default UploadWidget