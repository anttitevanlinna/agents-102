#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class CoverGenerator {
    constructor() {
        this.width = 1920;
        this.height = 1080;

        this.colors = {
            background: '#0a0a0a',
            accent: '#ff6b35',
            text: '#ffffff',
            textSecondary: '#b3b3b3'
        };
    }

    generateHTML(title) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cover: ${title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            margin: 0;
            padding: 0;
            width: ${this.width}px;
            height: ${this.height}px;
            background: ${this.colors.background};
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden;
            position: relative;
        }

        .cover-container {
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            align-items: center;
            padding: 80px;
            box-sizing: border-box;
        }

        .content {
            max-width: 70%;
            z-index: 10;
            position: relative;
        }

        .series-label {
            color: ${this.colors.accent};
            font-size: 24px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 24px;
        }

        .title {
            color: ${this.colors.text};
            font-size: 72px;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 32px;
        }

        .byline {
            color: ${this.colors.textSecondary};
            font-size: 20px;
            font-weight: 400;
            font-style: italic;
        }

        .particle-container {
            position: absolute;
            left: 300px;
            top: 0;
            width: 800px;
            height: 100%;
            z-index: 0;
            opacity: 0.6;
        }

        .particle {
            position: absolute;
            background: ${this.colors.accent};
            border-radius: 50%;
            transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .particle.small { width: 2px; height: 2px; }
        .particle.medium { width: 4px; height: 4px; }
        .particle.large { width: 6px; height: 6px; box-shadow: 0 0 12px ${this.colors.accent}40; }
    </style>
</head>
<body>
    <div class="cover-container">
        <div class="content">
            <div class="series-label">Deploying Agents</div>
            <h1 class="title">${title}</h1>
            <div class="byline">Written by Claude Opus. Steered by Antti Tevanlinna.</div>
        </div>

        <div class="particle-container" id="particles"></div>
    </div>

    <script>
        const particleContainer = document.getElementById('particles');
        const particleCount = 300;
        const particles = [];
        const HEIGHT = ${this.height};

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle ' + ['small', 'medium', 'large'][Math.floor(Math.random() * 3)];
            particle.style.left = Math.random() * 800 + 'px';
            particle.style.top = Math.random() * HEIGHT + 'px';
            particleContainer.appendChild(particle);
            particles.push(particle);
        }

        function getCloudFormation() {
            const formations = [];
            const centerX = 500;
            const centerY = HEIGHT / 2;
            for (let i = 0; i < particleCount; i++) {
                const angle = (i / particleCount) * Math.PI * 2 * 3;
                const radius = 225 + Math.sin(angle * 2) * 75;
                formations.push({
                    x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 150,
                    y: centerY + Math.sin(angle) * radius * 0.9 + (Math.random() - 0.5) * 120
                });
            }
            return formations;
        }

        function getBrainFormation() {
            const formations = [];
            const centerX = 500;
            const centerY = HEIGHT / 2;
            for (let i = 0; i < particleCount; i++) {
                const cluster = Math.floor(i / (particleCount / 6));
                const clusterAngle = (cluster / 6) * Math.PI * 2;
                const clusterX = centerX + Math.cos(clusterAngle) * 180;
                const clusterY = centerY + Math.sin(clusterAngle) * 120;
                formations.push({
                    x: clusterX + (Math.random() - 0.5) * 120,
                    y: clusterY + (Math.random() - 0.5) * 90
                });
            }
            return formations;
        }

        function rotatePoint(x, y, centerX, centerY, angle) {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            const dx = x - centerX;
            const dy = y - centerY;
            return {
                x: centerX + dx * cos - dy * sin,
                y: centerY + dx * sin + dy * cos
            };
        }

        function getHorizontalArrowFormation() {
            const formations = [];
            const centerX = 500;
            const arrowLength = 400;
            const startX = centerX - arrowLength / 2;
            const endX = centerX + arrowLength / 2;
            const startY = HEIGHT / 2;
            const endY = HEIGHT / 2;
            for (let i = 0; i < particleCount; i++) {
                const progress = i / particleCount;
                if (progress < 0.6) {
                    const shaftX = startX + (endX - startX) * (progress / 0.6);
                    formations.push({ x: shaftX, y: startY });
                } else {
                    const headProgress = (progress - 0.6) / 0.4;
                    const headSize = 160;
                    const headHeight = 120;
                    if (headProgress < 0.5) {
                        const diagProgress = headProgress / 0.5;
                        formations.push({
                            x: endX - headSize + diagProgress * headSize,
                            y: endY - headHeight + diagProgress * headHeight
                        });
                    } else {
                        const diagProgress = (headProgress - 0.5) / 0.5;
                        formations.push({
                            x: endX - headSize + diagProgress * headSize,
                            y: endY + headHeight - diagProgress * headHeight
                        });
                    }
                }
            }
            return formations;
        }

        function getArrowFormation() {
            const horizontal = getHorizontalArrowFormation();
            const angle = -Math.PI / 4;
            const centerX = 500;
            const centerY = HEIGHT / 2;
            return horizontal.map(point => {
                const rotated = rotatePoint(point.x, point.y, centerX, centerY, angle);
                return {
                    x: rotated.x + (Math.random() - 0.5) * 8,
                    y: rotated.y + (Math.random() - 0.5) * 8
                };
            });
        }

        const formations = [getCloudFormation(), getBrainFormation(), getArrowFormation()];
        let currentFormationIndex = 0;

        function animateParticles() {
            const currentFormation = formations[currentFormationIndex];
            particles.forEach((particle, i) => {
                const target = currentFormation[i];
                particle.style.left = target.x + 'px';
                particle.style.top = target.y + 'px';
            });
            currentFormationIndex = (currentFormationIndex + 1) % formations.length;
        }

        animateParticles();
        setInterval(animateParticles, 4000);
    </script>
</body>
</html>`;
    }

    generate(title) {
        const outputDir = path.join(__dirname, '..', 'site', 'covers');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const slug = title.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[-\s]+/g, '-')
            .trim();

        const coverHTML = this.generateHTML(title);
        const outputPath = path.join(outputDir, `${slug}.html`);
        fs.writeFileSync(outputPath, coverHTML);

        console.log(`Cover generated: site/covers/${slug}.html`);
        console.log(`Open in browser, then screenshot or screen-record for LinkedIn.`);
        return outputPath;
    }
}

// CLI
if (require.main === module) {
    const title = process.argv.slice(2).join(' ');
    if (!title) {
        console.error('Usage: node scripts/generate-cover.js "Article Title Here"');
        process.exit(1);
    }
    const generator = new CoverGenerator();
    generator.generate(title);
}

module.exports = CoverGenerator;
