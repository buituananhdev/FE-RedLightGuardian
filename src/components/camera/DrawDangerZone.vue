<template>
    <div class="draw-container">
        <div class="draw-container__button-list">
            <button-vue class="draw-container__button-list__button" :type-btn="'secondary'" @click="tryLoadCoordinates"
                >Tải Tọa độ</button-vue
            >
            <button-vue class="draw-container__button-list__button" :type-btn="'secondary'" @click="resetDrawing"
                >Xóa Hình</button-vue
            >
            <button-vue class="draw-container__button-list__button" :type-btn="'secondary'" @click="saveCoordinates"
                >Xác Nhận</button-vue
            >
        </div>
        <canvas :style="{ backgroundImage: 'url(' + imgSrc + ')', backgroundSize: 'contain'}" ref="canvas" width="1280" height="720" @mousedown="startDrawing" @mouseup="stopDrawing" > </canvas>
    </div>
</template>

<script>
import axios from 'axios'
import { updateCoordinatesCamera, getCameraById } from '@/services/camera.service'
export default {
    data() {
        return {
            canvas: null,
            ctx: null,
            isDrawing: false,
            dangerZone: [],
            isConfirmed: false,
            coordinatesData: [],
            drawDelay: 500, // Thời gian trễ (0.5 giây)
            currentCamera: {},
            imgSrc: 'https://res.cloudinary.com/ddqjbrc8q/image/upload/v1704418887/04-01-2024/ESP32CAM_68043.jpg.jpg'
        }
    },
    computed: {
        canStartDrawing() {
            return !this.isDrawing
        },
    },
    async mounted() {
        await this.getImage()
        this.canvas = this.$refs.canvas
        this.ctx = this.canvas.getContext('2d')
        this.tryLoadCoordinates() // Thử tải tọa độ khi component được mounted
    },
    methods: {
        async getImage() {
            try {
                const res = await axios.get('http://172.20.10.2/get-image');
                this.imgSrc = res.data.data.url;
                console.log('checkkkkkkkkk', res.data.data.url)
            } catch (error) {
                console.error(error);
            }
        },
        async tryLoadCoordinates() {
            try {
                await this.getSingleCamera(2)
                if (this.currentCamera.coordinates) {
                    this.dangerZone = JSON.parse(this.currentCamera.coordinates) // Chuyển chuỗi JSON thành mảng tọa độ
                    this.redrawCoordinates() // Gọi hàm vẽ lại hình sau khi tải dữ liệu
                } else {
                    alert('Camera không có thông tin tọa độ.')
                }
            } catch (error) {
                console.error(error)
            }
        },
        async getSingleCamera(id) {
            try {
                const res = await getCameraById(id)
                this.currentCamera = res.data
                console.log(res.data)
                localStorage.setItem('idCamera', this.currentCamera.id)
            } catch (error) {
                console.error(error)
            }
        },
        async updateCoordinatesCamera() {
            const id = 2
            console.log(id, JSON.stringify(this.dangerZone))
            try {
                const res = await updateCoordinatesCamera(id, JSON.stringify(this.dangerZone))
                if (res.data.status === 'success') {
                    this.$notify({
                        type: 'success',
                        title: 'Cập nhật tọa độ vi phạm',
                        text: 'Cập nhật tọa độ vi phạm thành công!',
                    })
                }
            } catch (error) {
                console.error(error)
                this.$notify({
                    type: 'error',
                    title: 'Cập nhật tọa độ vi phạm',
                    text: 'Cập nhật tọa độ vi phạm thất bại!',
                    duration: 1000,
                })
            }
        },
        startDrawing(event) {
            if (this.dangerZone.length < 4 && !this.isDrawing) {
                this.isDrawing = true
                const x =
                    (event.clientX - this.canvas.getBoundingClientRect().left) *
                    (this.canvas.width / this.canvas.clientWidth)
                const y =
                    (event.clientY - this.canvas.getBoundingClientRect().top) *
                    (this.canvas.height / this.canvas.clientHeight)
                this.dangerZone.push({ x, y })
                this.drawPoint(x, y)
                this.isConfirmed = false

                if (this.dangerZone.length === 4) {
                    this.confirmDrawing()
                }
            }
        },
        stopDrawing() {
            this.isDrawing = false
        },
        drawPoint(x, y) {
            this.ctx.strokeStyle = 'red'
            this.ctx.lineWidth = 2
            this.ctx.fillStyle = 'rgba(255, 192, 203, 0.5)' // Màu pink với độ mờ (opacity) 0.5
            this.ctx.beginPath()
            this.ctx.arc(x, y, 2, 0, Math.PI * 2)
            this.ctx.closePath()
            this.ctx.fill()
            this.ctx.stroke()
        },
        connectPoints() {
            if (this.dangerZone.length < 2) return
            // Đổi màu sơn khung hình và bên trong khung hình
            this.ctx.strokeStyle = 'red'
            this.ctx.lineWidth = 2
            this.ctx.fillStyle = 'rgba(255, 192, 203, 0.5)' // Màu hồng bên trong
            this.ctx.beginPath()
            this.ctx.moveTo(this.dangerZone[0].x, this.dangerZone[0].y)
            for (let i = 1; i < this.dangerZone.length; i++) {
                this.ctx.lineTo(this.dangerZone[i].x, this.dangerZone[i].y)
            }
            this.ctx.closePath()
            this.ctx.fill() // Sơn màu hồng bên trong
            this.ctx.stroke() // Vẽ khung hình
        },
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        },
        roundCoordinates() {
            this.dangerZone = this.dangerZone.map((point) => {
                return {
                    x: Math.round(point.x),
                    y: Math.round(point.y),
                }
            })
        },
        saveCoordinates() {
            if (!this.isConfirmed) {
                this.confirmDrawing()
            }
            this.roundCoordinates()

            this.updateCoordinatesCamera()
        },

        resetDrawing() {
            this.isDrawing = false
            this.dangerZone = []
            this.clearCanvas()
            this.isConfirmed = false
        },
        redrawCoordinates() {
            this.clearCanvas()
            for (const point of this.dangerZone) {
                this.drawPoint(point.x, point.y)
            }
            this.connectPoints()
        },
        confirmDrawing() {
            if (this.dangerZone.length >= 2 && !this.isConfirmed) {
                this.connectPoints()
                this.isConfirmed = true
            }
        },
    },
}
</script>
<style lang="scss" scoped>
.draw-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    canvas {
        justify-self: center;
        align-self: center;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        border: 1px solid black;
        width: 80%;
        height: 80%;
    }
    &__button-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 30px;
        &__button {
            margin-left: 6px;
            margin: 10px 0;
            padding: 7px 20px !important;
            background: $gradient-default;
            @include text-style(14px, 150%, 600, $slate-50, 0);
            &:hover {
                background: $gradient-hover;
            }
        }
    }
}
</style>