importScripts('https://binaries.soliditylang.org/bin/soljson-latest.js');

self.onmessage = function (e) {
    const code = e.data;
    const input = {
        language: 'Solidity',
        sources: {
            'test.sol': {
                content: code
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    try {
        const output = JSON.parse(soljson.compile(JSON.stringify(input)));
        if (output.errors) {
            const errors = output.errors.map(error => error.formattedMessage).join('\n');
            self.postMessage({ error: errors });
        } else {
            const compiled = JSON.stringify(output, null, 2);
            self.postMessage({ result: compiled });
        }
    } catch (error) {
        self.postMessage({ error: 'Error compiling Solidity code. See console for details.' });
        console.error('Error compiling Solidity code:', error);
    }
};
