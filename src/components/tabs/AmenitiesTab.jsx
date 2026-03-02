import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';

// Dynamically discover all images in /public/images/amenities/
// import.meta.glob references the file system path; Vite resolves it at build time.
// We don't import the modules (no { eager: true } with as:'url') —
// instead we just use the *keys* to derive the public-served URL.
const imageModules = import.meta.glob('/public/images/amenities/*', { eager: false });

const amenityImages = Object.keys(imageModules).map((path) => {
    // path = "/public/images/amenities/Extra Bed Sheet.jpeg"
    const filename = path.split('/').pop();             // "Extra Bed Sheet.jpeg"
    const publicUrl = `/images/amenities/${filename}`;  // served at root by Vite
    return { filename, publicUrl };
});

// Convert filename → clean readable title
const formatTitle = (filename) => {
    let name = filename.replace(/\.[^.]+$/, '');   // strip extension
    name = name.replace(/[-_]+/g, ' ');             // hyphens/underscores → space
    name = name.replace(/ and /gi, ' & ');          // "and" → "&"
    if (/^IMG_\d+/i.test(name)) return 'Room View'; // generic camera names
    return name;
};

const AmenitiesTab = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const closeModal = () => setSelectedImage(null);

    return (
        <div className="tab-container fade-in">
            <h2 className="tab-title">Room Amenities</h2>
            <p className="tab-subtitle">Everything you need for a comfortable stay.</p>

            <div className="amenities-grid-premium">
                {amenityImages.map(({ filename, publicUrl }) => (
                    <div
                        key={filename}
                        className="amenity-image-card"
                        onClick={() => setSelectedImage({ url: publicUrl, title: formatTitle(filename) })}
                    >
                        <div className="amenity-img-wrapper">
                            <img src={publicUrl} alt={formatTitle(filename)} loading="lazy" />
                        </div>
                        <div className="amenity-info">
                            <h4>{formatTitle(filename)}</h4>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card note-card" style={{ marginTop: '24px', textAlign: 'center' }}>
                <p style={{ margin: 0 }}>Need something else? Use the <strong>Request</strong> tab.</p>
            </div>

            {/* FULL-SCREEN MODAL */}
            {selectedImage && (
                <div className="image-modal-overlay" onClick={closeModal}>
                    <button className="modal-back-btn" onClick={closeModal} aria-label="Go back">
                        <ArrowLeft size={22} />
                    </button>
                    <div className="modal-content-wrapper" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeModal}>
                            <X size={32} />
                        </button>
                        <img src={selectedImage.url} alt={selectedImage.title} className="modal-image" />
                        <div className="modal-caption">{selectedImage.title}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AmenitiesTab;
