import React, { useState } from 'react';
import { Wifi, Copy, Check, Info } from 'lucide-react';

const WiFiTab = () => {
    const [copied, setCopied] = useState(false);
    const wifiSSID = "HOME_5G";
    const wifiPass = "9878407934";

    const qrData = `WIFI:T:WPA;S:${wifiSSID};P:${wifiPass};;`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}&color=1a1a1a&bgcolor=ffffff&margin=12`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(wifiPass);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="tab-container fade-in">
            <h2 className="tab-title">High Speed WiFi</h2>
            <p className="tab-subtitle">Stay connected with our premium fiber network.</p>

            {/* MAIN WIFI CARD */}
            <div className="wifi-main-card">
                {/* WiFi Signal Icon */}
                <div className="wifi-icon-ring">
                    <Wifi size={36} color="#E6C27A" />
                </div>

                {/* Network Name */}
                <div className="wifi-network-label">Network Name</div>
                <div className="wifi-ssid">{wifiSSID}</div>

                {/* Password Copy Box */}
                <div className="wifi-pass-box" onClick={copyToClipboard}>
                    <span className="wifi-pass-text">{wifiPass}</span>
                    <span className="wifi-copy-icon">
                        {copied ? <Check size={18} color="#4edb8a" /> : <Copy size={18} color="#E6C27A" />}
                    </span>
                </div>
                <div className="wifi-tap-hint">
                    {copied ? '✓ Copied to clipboard!' : 'Tap password to copy'}
                </div>

                {/* QR Code Frame */}
                <div className="wifi-qr-frame">
                    <div className="wifi-qr-inner">
                        <img
                            src={qrUrl}
                            alt="WiFi QR Code"
                            className="wifi-qr-img"
                        />
                    </div>
                    <div className="wifi-qr-label">Scan with camera to connect</div>
                </div>
            </div>

            {/* TROUBLE CARD */}
            <div className="card wifi-trouble-card">
                <Info size={20} color="#E6C27A" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#E6C27A' }}>Trouble Connecting?</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#D8D2C5' }}>
                        Select the 5GHz network for fastest speeds. If issues persist, restart your device or contact us.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WiFiTab;
