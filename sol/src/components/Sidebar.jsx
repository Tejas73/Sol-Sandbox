import React, { useState } from 'react';
import { Button, Input, Stack, Text } from '@chakra-ui/react';

const Sidebar = ({ fileStructure, onCreateFile, onCreateFolder, onSelectFile }) => {
    const [fileName, setFileName] = useState('');
    const [folderName, setFolderName] = useState('');

    const handleCreateFile = () => {
        onCreateFile(fileName);
        setFileName('');
    };

    const handleCreateFolder = () => {
        onCreateFolder(folderName);
        setFolderName('');
    };

    return (
        <Stack spacing={4}>
            <Text>Create File</Text>
            <Input
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
            />
            <Button onClick={handleCreateFile} style={{ width: '50px' }}>Create</Button>

            <Text>Create Folder</Text>
            <Input
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
            <Button onClick={handleCreateFolder} style={{ width: '50px' }}>Create</Button>

            <Text>File Structure</Text>
            <ul>
                {fileStructure.map((item, index) => (
                    <li key={index}>
                        <button onClick={() => onSelectFile(item)}>{item.type === 'file' ? `📄 ${item.name}` : `📁 ${item.name}`}</button>
                    </li>
                ))}
            </ul>
        </Stack>
    );
};

export default Sidebar;
