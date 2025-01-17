'use client'

import { useState } from "react";
import styles from "./page.module.css";
import { FiUpload, FiImage, FiLoader } from 'react-icons/fi';
import { RiFileWarningLine } from 'react-icons/ri';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3333/detect-cat", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      setError("Ocorreu um erro ao processar a imagem");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🐱 Detector de Gatos</h1>
          <p>Upload uma imagem para detectar gatos automaticamente</p>
        </div>

        <div className={styles.content}>
          <div className={styles.uploadSection}>
            <form onSubmit={handleSubmit}>
              <div 
                className={styles.dropzone}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                  id="fileInput"
                />
                <label htmlFor="fileInput" className={styles.uploadLabel}>
                  {preview ? (
                    <img src={preview} alt="Preview" className={styles.previewImage} />
                  ) : (
                    <>
                      <FiUpload size={40} />
                      <span>Arraste uma imagem ou clique para selecionar</span>
                      <small>Suporta JPG, PNG</small>
                    </>
                  )}
                </label>
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={!file || loading}
              >
                {loading ? (
                  <>
                    <FiLoader className={styles.spinner} />
                    Processando...
                  </>
                ) : (
                  <>
                    <FiImage />
                    Detectar Gatos
                  </>
                )}
              </button>
            </form>
          </div>

          {error && (
            <div className={styles.error}>
              <RiFileWarningLine size={24} />
              <span>{error}</span>
            </div>
          )}

          {resultado && (
            <div className={styles.resultSection}>
              <div className={styles.resultHeader}>
                <h2>Resultado da Detecção</h2>
                <span className={styles.badge}>
                  {resultado.detectados} {resultado.detectados === 1 ? 'gato' : 'gatos'} encontrado{resultado.detectados !== 1 ? 's' : ''}
                </span>
              </div>
              
              {resultado.image && (
                <div className={styles.imageResult}>
                  <img 
                    src={`data:image/jpeg;base64,${resultado.image}`} 
                    alt="Imagem processada"
                    className={styles.processedImage}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
