<template>
    <div>
        <input type="file" @change="uploadImage" />
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    methods: {
        async uploadImage(event) {
            const file = event.target.files[0];
            const data = new FormData();
            data.append('image_file', file, 'image_file');

            try {
                const response = await axios.post(
                    'http://localhost:8080/detect',
                    data
                );
                const boxes = response.data;
                this.drawImageAndBoxes(file, boxes);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        },
        drawImageAndBoxes(file, boxes) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = this.$refs.canvas;
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                ctx.strokeStyle = '#00FF00';
                ctx.lineWidth = 3;
                ctx.font = '18px serif';
                boxes.forEach(([x1, y1, x2, y2, label, probability]) => {
                    ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
                    ctx.fillStyle = '#00ff00';
                    const width = ctx.measureText(
                        `${label} (${probability})`
                    ).width;
                    ctx.fillRect(x1, y1, width + 10, 25);
                    ctx.fillStyle = '#000000';
                    ctx.fillText(`${label} (${probability})`, x1, y1 + 18);
                });
            };
        },
    },
};
</script>
<style lang="scss" scoped>
canvas {
    display: block;
    border: 1px solid black;
    margin-top: 10px;
    width: 100%;
    height: 100%;
}
</style>
