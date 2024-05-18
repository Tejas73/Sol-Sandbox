import React, { useEffect, useState, useRef } from 'react';
import { Box, Button } from "@chakra-ui/react";
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';

function App() {
    const initialFileStructure = JSON.parse(localStorage.getItem('fileStructure')) || [];
    const [fileStructure, setFileStructure] = useState(initialFileStructure);
    const [output, setOutput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [editorValue, setEditorValue] = useState('');
    const workerRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('fileStructure', JSON.stringify(fileStructure));
    }, [fileStructure]);

    useEffect(() => {
        workerRef.current = new Worker(new URL('./solidityWorker.js', import.meta.url));
        workerRef.current.onmessage = function (e) {
            const { error, result } = e.data;
            if (error) {
                setOutput(error);
            } else {
                setOutput(result);
            }
        };

        return () => {
            workerRef.current.terminate();
        };
    }, []);

    const handleCreateFile = (fileName) => {
        setFileStructure([...fileStructure, { type: 'file', name: fileName }]);
    };

    const handleCreateFolder = (folderName) => {
        setFileStructure([...fileStructure, { type: 'folder', name: folderName, files: [] }]);
    };

    const handleSelectFile = (file) => {
        if (file.type === 'file') {
            const fileContent = localStorage.getItem(file.name);
            setSelectedFile(file);
            setEditorValue(fileContent || `// ${file.name}\n\n// Add your code here`);
        }
    };

    const handleSaveFile = () => {
        if (selectedFile) {
            localStorage.setItem(selectedFile.name, editorValue);
            const updatedStructure = fileStructure.map(file => {
                if (file.name === selectedFile.name) {
                    return { ...file, content: editorValue };
                }
                return file;
            });
            setFileStructure(updatedStructure);
        }
    };

    const handleCompile = (code) => {
        workerRef.current.postMessage(code);
    };

    return (
        <div>
            <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
                <Sidebar
                    fileStructure={fileStructure}
                    onCreateFile={handleCreateFile}
                    onCreateFolder={handleCreateFolder}
                    onSelectFile={handleSelectFile}
                />
                <Box flex="1" display="flex" flexDirection="column">
                    <Button onClick={handleSaveFile} disabled={!selectedFile} style={{ width: '50px' }}>Save</Button>
                    <CodeEditor value={editorValue} onCompile={handleCompile} onChange={(value) => setEditorValue(value)} />
                    <OutputPanel output={output} />
                </Box>
            </Box>
        </div>
    );
}

export default App;
