

import React from 'react'
import Home from "./home"
import { pdfjs } from 'react-pdf';
import PdfWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjs.GlobalWorkerOptions.workerSrc = PdfWorker;



export default function App() {

  return (

    <Home />

  )
}

