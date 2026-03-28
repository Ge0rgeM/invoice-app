import jsPDF from 'jspdf';
import { toJpeg } from 'html-to-image';
import {  useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function DownloadInvoice({headerRef, bodyRef, footerRef, client}) {
    const { t } = useTranslation();
    const [isDownloading, setIsDownloading] = useState(false);
    const [buttonText, setButtonText] = useState('');
        
    useEffect(() => {
            setButtonText(t('download_pdf')); // Ensure button text updates on language switch
    }, [t]);
    
    // PDF GENERATION LOGIC ---
    const handleDownloadPdf = async () => {
        if(isDownloading) 
            return;
    
        setIsDownloading(true);
        setButtonText(t('downloading...'));
        if (!headerRef.current || !bodyRef.current || !footerRef.current) return;
        
        try {
            // 1. Take Snapshots
            const headerData = await toJpeg(headerRef.current, { quality: 1, pixelRatio: 2, backgroundColor: '#ffffff' });
            const footerData = await toJpeg(footerRef.current, { quality: 1, pixelRatio: 2, backgroundColor: '#ffffff' });
            const bodyData = await toJpeg(bodyRef.current, { 
                quality: 0.8, 
                pixelRatio: 2, 
                backgroundColor: '#ffffff',
                filter: (node) => !(node.classList && node.classList.contains('no-print')) 
            });

            const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4', compress: true });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            // 2. Base Dimensions
            const headerProps = pdf.getImageProperties(headerData);
            const headerPdfHeight = (headerProps.height * pdfWidth) / headerProps.width;

            const footerProps = pdf.getImageProperties(footerData);
            const footerPdfHeight = (footerProps.height * pdfWidth) / footerProps.width;

            const bodyProps = pdf.getImageProperties(bodyData);
            const bodyTotalPdfHeight = (bodyProps.height * pdfWidth) / bodyProps.width;

            const availableBodySpace = pageHeight - headerPdfHeight - footerPdfHeight; 

            // ==========================================
            // SMART PAGINATION: Measure the blocks!
            // ==========================================
            const bodyWidthPx = bodyRef.current.offsetWidth;
            const pxToMm = (px) => (px * pdfWidth) / bodyWidthPx; 
            
            const bodyRect = bodyRef.current.getBoundingClientRect();
            const rowElements = Array.from(bodyRef.current.querySelectorAll('.item-row'));
            const totalsElement = bodyRef.current.querySelector('.totals-container');
            
            // Combine rows and the totals container into one array of "unbreakable blocks"
            const unbreakableBlocks = [...rowElements];
            if (totalsElement) {
                unbreakableBlocks.push(totalsElement);
            }
            const hiddenElementHeightPx = 50;
            // Get exact Top and Bottom mm coordinates for every block
            const blockPositions = unbreakableBlocks.map(block => {
                const rect = block.getBoundingClientRect();
                
                // Base pixel calculations
                let topPx = rect.top - bodyRect.top;
                let bottomPx = rect.bottom - bodyRect.top;

                // If this is the Totals container, adjust for the hidden button above it!
                if (block === totalsElement) {
                topPx -= hiddenElementHeightPx;
                bottomPx -= hiddenElementHeightPx;
                }

                return {
                top: pxToMm(topPx),
                bottom: pxToMm(bottomPx)
                };
            });

            const breakPoints = [];
            let currentLimit = availableBodySpace;
            
            // Figure out exactly where to cut the image
            for (let i = 0; i < blockPositions.length; i++) {
                // If this block's bottom edge crosses the page limit...
                if (blockPositions[i].bottom > currentLimit) {
                // Add a cut point right at the TOP of this block
                const cutPoint = blockPositions[i].top;
                breakPoints.push(cutPoint);
                // Set the limit for the NEXT page
                currentLimit = cutPoint + availableBodySpace;
                }
            }

            // ==========================================
            // DRAWING THE PDF
            // ==========================================
            
            // --- PAGE 1 ---
            pdf.addImage(bodyData, 'JPEG', 0, headerPdfHeight, pdfWidth, bodyTotalPdfHeight);
            
            // Calculate how much to white-out at the bottom of Page 1
            let maskY = pageHeight - footerPdfHeight; // Default: just mask the footer area
            if (breakPoints.length > 0) {
                // If there is a break, erase everything below the cut point so no rows get cut in half!
                maskY = headerPdfHeight + breakPoints[0]; 
            }
            
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, maskY, pdfWidth, pageHeight - maskY, 'F');
            
            pdf.addImage(headerData, 'JPEG', 0, 0, pdfWidth, headerPdfHeight);
            pdf.addImage(footerData, 'JPEG', 0, pageHeight - footerPdfHeight, pdfWidth, footerPdfHeight);

            // --- EXTRA PAGES ---
            for (let i = 0; i < breakPoints.length; i++) {
                pdf.addPage();
                const currentShift = breakPoints[i]; // Slide up exactly to the cut point!
                
                pdf.addImage(bodyData, 'JPEG', 0, headerPdfHeight - currentShift, pdfWidth, bodyTotalPdfHeight);
                
                // Erase top area behind header
                pdf.setFillColor(255, 255, 255);
                pdf.rect(0, 0, pdfWidth, headerPdfHeight, 'F');

                // Calculate bottom mask for this page
                let nextMaskY = pageHeight - footerPdfHeight;
                if (i + 1 < breakPoints.length) {
                // If there is another page after this one, mask down to the NEXT cut point
                nextMaskY = headerPdfHeight + (breakPoints[i+1] - currentShift);
                }
                
                pdf.rect(0, nextMaskY, pdfWidth, pageHeight - nextMaskY, 'F');
                
                pdf.addImage(headerData, 'JPEG', 0, 0, pdfWidth, headerPdfHeight);
                pdf.addImage(footerData, 'JPEG', 0, pageHeight - footerPdfHeight, pdfWidth, footerPdfHeight);
            }

            const safeFileName = client.name ? client.name.replace(/\s+/g, '_') : t('client_name').replace(/\s+/g, '_');
            switch (t("switch_lang")) {
                case "EN":
                    pdf.save(`ინვოისი_${safeFileName}.pdf`);
                    break;
                case "KA":
                    pdf.save(`Invoice_${safeFileName}.pdf`);
                    break;
                default:
                    pdf.save(`Invoice_${safeFileName}.pdf`);
            }
        } catch (error) {
            alert(t('something_went_wrong'));
            console.error('Oops, something went wrong!', error);
        } finally {
            setIsDownloading(false);
            setButtonText(t('download_pdf'));
        }
    };
    return (
        <button 
            onClick={handleDownloadPdf}
            className="mb-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition-colors cursor-pointer"
        >
            {buttonText}
        </button>
    )
}