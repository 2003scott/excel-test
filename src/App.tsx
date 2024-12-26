import './App.css'
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

function App() {

  const [data, setData] = useState<any[]>([]);

  const onDrop = (acceptedFiles: any[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && event.target.result) {
        const data = new Uint8Array(event.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setData(json);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      <p>Arrastra y suelta un archivo Excel aquí, o haz clic para seleccionar uno</p>
      {data.length > 0 && (
        <>
          {JSON.stringify(data)}
        </>
      )}
    </div>
  );
};

import { CSSProperties, useState } from 'react';

const styles: { dropzone: CSSProperties } = {
  dropzone: {
    border: '2px dashed #cccccc',
    borderRadius: '5px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  },
};

export default App
