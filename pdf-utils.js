// PDF Upload Utility
// Uses PDF.js library to extract text from PDF files

export async function extractTextFromPDF(file) {
    // Load PDF.js library dynamically if not already loaded
    if (typeof pdfjsLib === 'undefined') {
        await loadPDFJS();
    }

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        
        fileReader.onload = async function() {
            try {
                const typedarray = new Uint8Array(this.result);
                
                // Load the PDF document
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let fullText = '';
                
                // Extract text from each page
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const textContent = await page.getTextContent();
                    
                    const pageText = textContent.items
                        .map(item => item.str)
                        .join(' ');
                    
                    fullText += pageText + '\n\n';
                }
                
                resolve(fullText.trim());
            } catch (error) {
                reject(new Error(`Failed to extract PDF text: ${error.message}`));
            }
        };
        
        fileReader.onerror = function() {
            reject(new Error('Failed to read PDF file'));
        };
        
        fileReader.readAsArrayBuffer(file);
    });
}

async function loadPDFJS() {
    return new Promise((resolve, reject) => {
        // Load PDF.js from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.onload = () => {
            // Set worker
            pdfjsLib.GlobalWorkerOptions.workerSrc = 
                'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve();
        };
        script.onerror = () => reject(new Error('Failed to load PDF.js library'));
        document.head.appendChild(script);
    });
}

export function isPDFFile(file) {
    return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}
