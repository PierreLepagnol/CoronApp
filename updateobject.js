export const updateStateObject = (object, keyToUpdate, newValue) => {

    let updatedObject = {};
  
    // Iterate over the object
    Object.entries(object).forEach(([key, value]) => {
  
      // Update the chosen key
      if (key === keyToUpdate) Object.assign(updatedObject, { [key]: newValue });
  
      // If the iterated key doesn't match the given key return the current value
      else if (key !== keyToUpdate) Object.assign(updatedObject, { [key]: value });
    });
  
    return updatedObject;
  };

    /*  const createPDF=async ()=>{
      
      const page1 = PDFPage .create()
      .setMediaBox(200, 200).drawText("fr", {
        x: 5,
        y: 235,
        color: '#F62727',
      })
      const docsDir = await PDFLib.getDocumentsDirectory();
      const pdfPath = `${docsDir}/sample.pdf`;
      PDFDocument
        .create('/storage/emulated/0/Download/sample.pdf')
        .addPages(page1)
        .write() // Returns a promise that resolves with the PDF's path
        .then(path => {
          console.log('PDF created at: ' + path);
          // Do stuff with your shiny new PDF!
        });
      }
 */
