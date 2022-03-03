
import { readFileSync } from 'fs';
// import { marked } from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

const rglr = readFileSync(`${__dirname}/../_fonts/Inter-Regular.woff2`).toString('base64');
const bold = readFileSync(`${__dirname}/../_fonts/Inter-Bold.woff2`).toString('base64');
const mono = readFileSync(`${__dirname}/../_fonts/Vera-Mono.woff2`).toString('base64');

function getCss(thumbnailURL: string, travelMapPhotoURL: string) {
    let background = 'white';
    let foreground = 'black';
    let radial = 'lightgray';

    return `
    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
    }

    @font-face {
        font-family: 'Inter';
        font-style:  normal;
        font-weight: bold;
        src: url(data:font/woff2;charset=utf-8;base64,${bold}) format('woff2');
    }

    @font-face {
        font-family: 'Vera';
        font-style: normal;
        font-weight: normal;
        src: url(data:font/woff2;charset=utf-8;base64,${mono})  format("woff2");
      }

    body {
        background: ${background};
        background-image: radial-gradient(circle at 25px 25px, ${radial} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        padding: 0;
        margin: 0;
    }

    code {
        color: #D400FF;
        font-family: 'Vera';
        white-space: pre-wrap;
        letter-spacing: -5px;
    }

    code:before, code:after {
        content: '\`';
    }

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        text-align: center;
        align-items: center;
        position: relative;
        background: url(${travelMapPhotoURL}) center no-repeat;
        background-size: cover;
    }

    .content-wrapper {
        padding: 0px 160px 100px;
        z-index: 2;
        margin-top: 320px;
    }
    
    .heading {
    }

    .info {
        display: flex;
        align-items: baseline;
    }

    .description {
        font-family: 'Inter', sans-serif;
        font-size: 60px;
        font-style: normal;
        color: ${radial};
        line-height: 1.2;
        font-weight: 500;
        text-align: left;
        margin-top: -20px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }
    
    .username {
        font-family: 'Inter', sans-serif;
        font-size: 200px;
        font-style: normal;
        color: ${foreground};
        line-height: 1.7;
        font-weight: 500;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }

    .logo-wrapper {
        border-radius: 9999px;
        margin-right: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        width: 280px;
        min-width: 280px;
        height: 280px;
    }
    
    .logo {
        border-radius: 9999px;
    }
    
    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-top: 150px;
    }
    
    .footer-item {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
    }
    
    .label {
        font-family: 'Inter', sans-serif;
        font-size: 40px;
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
        font-weight: 500;
    }
    
    .value {
        font-family: 'Inter', sans-serif;
        font-size: 50px;
        font-style: normal;
        color: ${foreground};
        line-height: 1.8;
        font-weight: 600;
    }
    
    .thumbnail {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 400px;
        background: url(${thumbnailURL}) center no-repeat;
        background-size: cover;
        z-index: 1;
    }
    
    .top-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 240px);
        background: rgba(255,255,255,0.9);
        display: flex;
        padding: 40px 120px;
        align-items: center;
        justify-content: space-between;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, userPhotoURL, country, region, checkin, story, description, thumbnailURL, travelMapPhotoURL } = parsedReq;
    if (String(travelMapPhotoURL) != 'undefined') {
        return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(thumbnailURL || '', travelMapPhotoURL || '')}
    </style>
    <body>
        <div class="container">
            <div class="top-overlay">
                <div class="footer-item">
                    <span class="label">User</span>
                    <span class="value">${text || ''}</span>
                </div>
                <div class="footer-item">
                    <span class="label">Visited countries</span>
                    <span class="value">${country || 0}</span>
                </div>
                <div class="footer-item">
                    <span class="label">Visited regions</span>
                    <span class="value">${region || 0}</span>
                </div>
                <div class="footer-item">
                    <span class="label">Checkins</span>
                    <span class="value">${checkin || 0}</span>
                </div>
                <div class="footer-item">
                    <span class="label">Stories</span>
                    <span class="value">${story || 0}</span>
                </div>
            </div>
        </div>
    </body>
</html>`;
    } else {
        return `<!DOCTYPE html>
        <html>
            <meta charset="utf-8">
            <title>Generated Image</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                ${getCss(thumbnailURL || '', travelMapPhotoURL || '')}
            </style>
            <body>
                <div class="container">
                    <div class="thumbnail" />
        
                    <div class="content-wrapper">
                        <div class="heading">
                            <div class="info">
                                <div class="logo-wrapper">
                                    <img
                                        class="logo"
                                        alt="Generated Image"
                                        src=${sanitizeHtml(userPhotoURL || '')}
                                        width="260px"
                                        height="260px"
                                    />
                                </div>
                                <span class="username">${emojify(sanitizeHtml(text))}</span>
                            </div>
                            <p class="description">
                                ${description || ''}
                            </p>
                        </div>
        
                        <div class="footer">
                            <div class="footer-item">
                                <span class="label">Visited countries</span>
                                <span class="value">${country || 0}</span>
                            </div>
                            <div class="footer-item">
                                <span class="label">Visited regions</span>
                                <span class="value">${region || 0}</span>
                            </div>
                            <div class="footer-item">
                                <span class="label">Checkins</span>
                                <span class="value">${checkin || 0}</span>
                            </div>
                            <div class="footer-item">
                                <span class="label">Stories</span>
                                <span class="value">${story || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>`;
    }
}
