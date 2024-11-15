function readableStreamToBuffer(readableStream: ReadableStream) {
    return new Promise((resolve, reject) => {
        const reader = readableStream.getReader()
        const chunks: any[] = []
        function pump() {
            reader
                .read()
                .then(({ done, value }) => {
                    if (done) {
                        resolve(Buffer.concat(chunks))
                        return
                    }
                    chunks.push(Buffer.from(value))
                    pump()
                })
                .catch(reject)
        }
        pump()
    })
}
