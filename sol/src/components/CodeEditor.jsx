import React, { useRef, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';

const CodeEditor = ({ value, onCompile, onChange }) => {
    const editorRef = useRef();

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.setValue(value);
        }
    }, [value]);

    const handleCompile = () => {
        const code = editorRef.current.getValue();
        onCompile(code);
    };

    return (
        <Box>
            <Editor
                height="60vh"
                theme='vs-dark'
                defaultLanguage="sol"
                value={value}
                onMount={onMount}
                onChange={onChange}
            />
            <Button onClick={handleCompile} mt={4}>Compile</Button>
        </Box>
    );
};

export default CodeEditor;
