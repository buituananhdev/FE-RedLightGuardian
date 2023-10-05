<script>
import axios from 'axios';
export default {
    data() {
        return {
            canvas: null,
            ctx: null,
            isDrawing: false,
            dangerZone: [],
            isConfirmed: false,
            coordinatesData: [],
        };
    },
    mounted() {
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext('2d');
        // this.tryLoadCoordinates(); // Thử tải tọa độ khi component được mounted
    },
    methods: {
        //   tryLoadCoordinates() {
        //     axios
        //       .get("/api/load-coordinates")
        //       .then((response) => {
        //         this.dangerZone = response.data;
        //         this.redrawCoordinates();
        //       })
        //       .catch((error) => {
        //         console.error("Lỗi khi tải tọa độ:", error);
        //         // Không hiển thị thông báo lỗi ở đây để tránh thông báo khi trang web vừa vào
        //       });
        //   },
        tryLoadCoordinates() {
            axios
                .get('/coordinates.json') // Thay đổi đường dẫn tới tệp JSON của bạn
                .then((response) => {
                    this.dangerZone = response.data;
                    this.redrawCoordinates(); // Gọi hàm vẽ lại hình sau khi tải dữ liệu
                })
                .catch((error) => {
                    console.error('Lỗi khi tải dữ liệu từ JSON:', error);
                    alert('Có lỗi xảy ra khi tải dữ liệu từ JSON.');
                });
        },
        startDrawing(event) {
            this.isDrawing = true;
            const x = event.clientX - this.canvas.getBoundingClientRect().left;
            const y = event.clientY - this.canvas.getBoundingClientRect().top;
            this.dangerZone.push({ x, y });
            this.drawPoint(x, y);
            this.isConfirmed = false;
        },
        draw(event) {
            if (!this.isDrawing) return;
            const x = event.clientX - this.canvas.getBoundingClientRect().left;
            const y = event.clientY - this.canvas.getBoundingClientRect().top;
            this.dangerZone.push({ x, y });
            this.drawPoint(x, y);
        },
        stopDrawing() {
            this.isDrawing = false;
        },
        drawPoint(x, y) {
            this.ctx.strokeStyle = 'red';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.stroke();
            this.ctx.fillStyle = 'pink';
            this.ctx.fill();
        },
        connectPoints() {
            if (this.dangerZone.length < 2) return;
            // Đổi màu sơn khung hình và bên trong khung hình
            this.ctx.strokeStyle = 'red';
            this.ctx.lineWidth = 2;
            this.ctx.fillStyle = 'pink'; // Màu hồng bên trong
            this.ctx.beginPath();
            this.ctx.moveTo(this.dangerZone[0].x, this.dangerZone[0].y);
            for (let i = 1; i < this.dangerZone.length; i++) {
                this.ctx.lineTo(this.dangerZone[i].x, this.dangerZone[i].y);
            }
            this.ctx.closePath();
            this.ctx.fill(); // Sơn màu hồng bên trong
            this.ctx.stroke(); // Vẽ khung hình
        },
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        saveCoordinates() {
            const jsonBlob = new Blob([JSON.stringify(this.dangerZone)], {
                type: 'application/json',
            });
            const jsonUrl = URL.createObjectURL(jsonBlob);
            const a = document.createElement('a');
            a.href = jsonUrl;
            a.download = 'coordinates.json';
            a.click();
            URL.revokeObjectURL(jsonUrl);
        },
        loadCoordinates() {
            this.tryLoadCoordinates(); // Thử tải tọa độ khi nút "Tải Tọa Độ từ JSON" được nhấn
        },
        resetDrawing() {
            this.isDrawing = false;
            this.dangerZone = [];
            this.clearCanvas();
            this.isConfirmed = false;
        },
        redrawCoordinates() {
            this.clearCanvas();
            for (const point of this.dangerZone) {
                this.drawPoint(point.x, point.y);
            }
            this.connectPoints();
        },
        confirmDrawing() {
            if (this.dangerZone.length >= 2 && !this.isConfirmed) {
                this.connectPoints();
                this.isConfirmed = true;
            }
        },
    },
};
</script>


<template>
    <div class="container">
        <canvas
            ref="canvas"
            @mousedown="startDrawing"
            @mouseup="stopDrawing"
            @mousemove="draw"
            width="1600"
            height="600"
            style="border: 1px solid black"
        ></canvas>
        <br />
        <button @click="saveCoordinates">Lưu Tọa Độ vào JSON</button>
        <br />
        <button @click="tryLoadCoordinates">Tải Tọa Độ từ JSON</button>
        <br />
        <button @click="resetDrawing">Xóa Hình</button>
        <br />
        <button @click="confirmDrawing">Xác Nhận</button>
    </div>
</template>

<style lang="scss" scoped>
.container {
  button {
    color: red;
  }
}
</style>