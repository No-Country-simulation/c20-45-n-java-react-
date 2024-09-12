import { Button } from '@nextui-org/button';
import { ErrorMessage } from 'formik';
import React, { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from '../../config/firebase';
import { v4 as uuidv4 } from 'uuid';


interface ImageUploadProps {
    imageName?: string;
    onImageUploadSuccess?: (url: string) => void; 
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageName, onImageUploadSuccess }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            setUploading(true);

            const uniqueFileName = `${uuidv4()}.${file.name.split('.').pop()}`;

            const storage = getStorage(app);
            const storageRef = ref(storage, `images/${uniqueFileName}`);

            try {
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);

                setUploading(false);

                if (onImageUploadSuccess) {
                    onImageUploadSuccess(downloadURL);
                }
            } catch (error) {
                console.error("Error al subir la imagen a Firebase: ", error);
                setUploading(false);
            }
        }
    };

    return (
        <div className="mx-auto max-w-md p-6 rounded-lg bg-white">
            <div
                className="h-36 w-48- mb-6 rounded-lg bg-gray-200 overflow-hidden flex items-center justify-center flex-col"
                data-img={imageName || ''}
            >
                {selectedImage ? (
                    <img src={selectedImage} alt="Previsualización de imagen" className='h-48' />
                ) : (
                    <>
                        <IoCloudUploadOutline className="bx bxs-cloud-upload icon text-4xl" />
                        <h3 className="text-xl font-medium mb-1">Subir imagen</h3>
                        <p className="text-gray-600">
                            Máximo <span>2MB</span>
                        </p>
                    </>
                )}
            </div>
            <input
                type="file"
                id="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
            />
            <Button
                type="button"
                className="w-full px-4 py-1 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-700 transition duration-300"
                onClick={() => document.getElementById("file")?.click()}
            >
                {uploading ? "Subiendo..." : "Seleccionar imagen"}
            </Button>
            <ErrorMessage
                name="foto"
                component="div"
                className="text-red-500 text-sm"
            />
        </div>
    );
};

export default ImageUpload;
