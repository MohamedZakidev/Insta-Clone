import { useState } from 'react'
import useShowToast from './useShowToast'

function usePreviewImg() {
    const [selectedFile, setSelectedFile] = useState(null)
    const showToast = useShowToast()
    const maxFileSizeInBytes = 2 * 1024 * 1024 //2MB

    function handleImageChange(e) {
        const file = e.target.files[0]
        const isImage = file.type.startsWith("image/")

        if (file && isImage) {
            if (file.size > maxFileSizeInBytes) {
                showToast("Error", "File size must be less than 2MB", "error")
                setSelectedFile(null)
                return
            }
            const reader = new FileReader()
            reader.onloadend = () => {
                setSelectedFile(reader.result)
            }
            reader.readAsDataURL(file)

        } else {
            showToast("Error", "Please select an image file", "error")
            setSelectedFile(null)
        }
    }

    return { selectedFile, setSelectedFile, handleImageChange }
}

export default usePreviewImg
