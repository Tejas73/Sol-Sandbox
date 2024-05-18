import React from 'react';
import { Text } from '@chakra-ui/react';

const OutputPanel = ({ output }) => {
    return (
        <Text mt={4} whiteSpace="pre-wrap">{output}</Text>
    );
};

export default OutputPanel;
